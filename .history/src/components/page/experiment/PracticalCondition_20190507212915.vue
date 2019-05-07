<template>
    <div>
        <div class="crumbs" v-if="role==='ROLE_TEACHER'">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实践教学</el-breadcrumb-item>
                <el-breadcrumb-item> 实践条件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-if="role==='ROLE_TEACHER'">
            <div class="form-box">
                <el-form ref="conditionForm" :model="conditionForm"  :rules="rules" label-width="120px">
                    <el-form-item label="图片描述" prop="describe">
                        <el-input v-model="conditionForm.describe"></el-input>
                    </el-form-item>
                  
                   
                  
                    <el-form-item label="实践图片上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :limit="1"
                            :data=paramsData
                            :headers=token
                            action="/api/practicalCondition/upload"
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
                   <div class="plugins-tips"  style="width:983px;margin-top:10px;">
                        <p align="center">{{condition.describe}}</p>
                    </div>  
                            
                     <!-- <div class="plugins-tips"  style="width:400px;">
                        <p align="left">{{condition.practicalConditionName}}</p>
                    </div>   -->
               <div class="img_wrap">
                   <img :src="'http://127.0.0.1:8080/api/practicalCondition/show?imgName=' +condition.practicalConditionName" style="width:1000px; text-align:center"><img>
               </div>
               <el-button style="margin-top:10px;" size="small" type="danger" @click="handleDelete(condition.practicalConditionId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>

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
                 token:{
                    token:window.localStorage["token"]
                },
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
                    describe: this.conditionForm.describe,
                    creatorJobNo:window.localStorage["jobNo"]
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
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isIMG = isJPG || isPNG
                const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isIMG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
       
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isIMG && isLt2M;
             
        },
         onSuccess(file) {
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
                this.$axios.get('/api/practicalCondition/getAllImg', {
                  
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.practicalConditionId = dt[i].practicalConditionId
                obj.practicalConditionName = dt[i].practicalConditionName
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

                })
            }

           
        }
    }
</script>
<style  scoped>


 .img_wrap{
     width:1000px;
     margin-top: 15px;
    border: 2px solid #ccc;
}
</style>
