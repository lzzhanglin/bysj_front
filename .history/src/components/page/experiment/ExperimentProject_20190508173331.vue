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
                <el-breadcrumb-item> 实验项目预览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
 
   

        <div class="container">
   
                <div v-for="condition in conditions" :key='condition.practicalConditionId'>
                   <div class="plugins-tips"  style="width:100%;margin-top:0px;">
                        <p align="center">{{condition.describe}}</p>
                    </div>
                    <!-- <span style="margin-left:770px;">上传时间：{{condition.uploadTime}}</span> -->
                    <el-row>
                        <el-button style="margin-top:10px; float:right;" size="small" type="primary" @click="handleDelete(condition.practicalConditionId)" >下 载</el-button>
                        <el-button style="margin-top:10px;margin-left:800px;" size="small" type="danger" @click="handleDelete(condition.practicalConditionId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>
                    </el-row>

                       <iframe :src="condition.previewLink"  width='100%' height='1000px' frameborder='0' margin-top='10px'>
        This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> 
        document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>

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
    export default{ 
        name: 'conditionForm',
        data: function(){
           
            return {
                paramsData:null,
                externalLink: null,
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
           
            },
            created() {
            this.getWordData();
        },
        
        methods: {
          
          
           handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
                //判断文件类型 不是word不许上传
                if(file.name.endsWith(".doc")||file.name.endsWith(".docx")||file.name.endsWith(".docm")||file.name.endsWith(".dotm")||file.name.endsWith(".dotx")||file.name.endsWith(".dot")){
                }else{
                     this.$message.error('上传文档只能是 word 文档!');
                     const isWord = false;
                    return isWord
                }
                //获取token 
                   return this.$axios.get('/api/practicalCondition/getToken', {
                  params:{
                      fileName:file.name,
                      bucketName:"word"
                
                  }
                }).then((res) => {

                    this.paramsData = {
              key:res.data.data[1],
              token:  res.data.data[0]
            }
                   

                })

        },
         onSuccess(response,file) {
             //外链 一个月变一次 应绑定自己的域名 各个bucket外链不一样 外链需要转码
             var url = encodeURIComponent(response.key)
             this.externalLink = `http://pr6coguqz.bkt.clouddn.com/${url}`
            //在线预览的链接 加上微软的链接
             var previewLink = "https://view.officeapps.live.com/op/embed.aspx?src="+this.externalLink;
                this.fileList = []
         
                //上传七牛云成功之后 将上传文档的信息写入数据库
                this.postRequest('/api/practicalCondition/writeFileInfo', {
                            fileName: response.key,
                            externalLink: this.externalLink,
                            previewLink: previewLink,
                            creatorJobNo: window.localStorage["jobNo"],
                            fileType: 2,
                            describe: this.conditionForm.describe
                  }).then(resp=> {
                      
                      if(resp.data.status === 200){
                this.$message.success('上传成功！');
                this.$refs['conditionForm'].resetFields();
                this.getWordData();

                      }

                    })
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
           
            getWordData() {
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
                obj.practicalConditionName = dt[i].practicalConditionName
                obj.uploadTime = dt[i].uploadTime
                obj.describe = dt[i].describe
                obj.creatorJobNo = dt[i].creatorJobNo
                obj.externalLink = dt[i].externalLink
                obj.previewLink = dt[i].previewLink
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
                    // this.getImgData();
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
