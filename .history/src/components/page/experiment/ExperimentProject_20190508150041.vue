<template>
    <div>
        <div class="crumbs" v-if="role==='ROLE_TEACHER'">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实践教学</el-breadcrumb-item>
                <el-breadcrumb-item> 实验项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-if="role==='ROLE_TEACHER'">
            <div class="form-box">
                <el-form ref="conditionForm" :model="conditionForm"  :rules="rules" label-width="180px">
                    <el-form-item label="实验项目名称" prop="describe">
                        <el-input v-model="conditionForm.describe"></el-input>
                    </el-form-item>
                  
                   
                  
                    <el-form-item label="实验项目指导书上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :limit="1"
                            :data=paramsData
                            :headers=token
                            action="http://upload.qiniup.com"
                            :before-upload="handleBeforeUpload"
                            :on-preview="handlePreview"
                            :on-change="onChange"
                            :on-remove="handleRemove"
                            :on-success="onSuccess"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :auto-upload="false">
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary" >选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:red;">只能上传jpg/png文件，且不超过1024kb </div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
            </div>
        </div>
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实践教学</el-breadcrumb-item>
                <el-breadcrumb-item> 条件展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
                <div v-for="condition in conditions" :key='condition.practicalConditionId'>
                   <div class="plugins-tips"  style="width:983px;margin-top:60px;">
                        <p align="center">{{condition.describe}}</p>
                    </div>  
                    <span style="margin-left:770px;">上传时间：{{condition.uploadTime}}</span>
                     <!-- <div class="plugins-tips"  style="width:400px;">
                        <p align="left">{{condition.practicalConditionName}}https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc</p>
                    </div>   -->
<iframe :src='condition.practicalConditionName' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
            
               <el-button style="margin-top:10px; margin-left:943px;" size="small" type="danger" @click="handleDelete(condition.practicalConditionId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>

                </div>
        </div>
         <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteImg">确 定</el-button>
            </span>
        </el-dialog>
         

    </div>
</template>

<script>
    export default {
        name: 'conditionForm',
        data: function(){
           
            return {
                uploadForm:null,
                img: null,
                 token:{
                    token:window.localStorage["token"]
                },
                src:"",
                deleteConditionId:"",
                conditions:[],
                fileList: [],
                role:window.localStorage['role'],
                disableUpload:true,
                delVisible: false,
                conditionForm: {
                    describe: '',
                },
                rules: {
                    describe: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { max:250,message: '长度不能超过250字符'}
                    ],
                   
                }
            }
            },
            computed:{
                
            paramsData: function () {
                    let params = {
                    key: this.uploadForm.key,
                    token:window.localStorage["jobNo"]
                }
                    return params
          }
            },
            created() {
            this.getImgData();
        },
        
        methods: {
          
          
           handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
                
                if(file.name.endsWith(".doc")||file.name.endsWith(".docx")||file.name.endsWith(".docm")||file.name.endsWith(".dotm")||file.name.endsWith(".dotx")||file.name.endsWith(".dot")){
                }else{
                     this.$message.error('上传文档只能是 word 文档!');
                     const isWord = false;
                    return isWord
                }
                    this.$axios.get('/api/practicalCondition/getToken', {
                  params:{
                      fileName:file.name
                  }
                }).then((res) => {

                    
                   this.uploadForm = {
              key: res.data.data[1],
              token: res.data.data[0]
            }
            console.log(this.uploadForm.token);
            console.log("************");
            console.log(this.uploadForm.key);

                })

        },
         onSuccess(file) {
             this.img = `http://pqnfa0l6o.bkt.clouddn.com/${response.key}`
             console.log("七牛云："+this.img);
                this.$refs['conditionForm'].resetFields();
                this.fileList = []
                //刷新当前页面 将刚刚上传的图片显示出来
                 this.getImgData();
                this.$message.success('上传成功！');
            },
            onChange(file,fileList) {
             
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {
                 this.$refs['conditionForm'].validate((valid) => {
                  if(valid){
                       this.$refs.upload.submit();
                  }else{
                       return false;
                      
                  }
              });
            
        },
           
            getImgData() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/practicalCondition/getAllFileByType', {
                  params:{
                      fileType:2
                  }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.practicalConditionId = dt[i].practicalConditionId
                obj.practicalConditionName ="https://view.officeapps.live.com/op/embed.aspx?src=http:127.0.0.1:8080/api/practicalCondition/showWord/wordName="+ dt[i].practicalConditionName
                obj.uploadTime = dt[i].uploadTime
                obj.describe = dt[i].describe
                obj.creatorJobNo = dt[i].creatorJobNo
                dataFromDb[i] = obj
            }
                    _this.conditions = dataFromDb;

                })
            },
             handleDelete(conditionId) {
                this.delVisible = true;
                this.deleteConditionId = conditionId;
            },
            deleteImg(conditionId){
                console.log("进入删除函数");
                  this.$axios.delete('/api/practicalCondition/delete', {
                    params: {
                        conditionId: this.deleteConditionId
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                    this.getImgData();
                    this.delVisible=false;
                    this.deleteConditionId="";

                })
            }

           
        }
    }
</script>
<style  scoped>
.iframe {
  width: 983px;
  height: 600px;
}


</style>
