<template>
    <div>
        <div class="crumbs" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item> 批量注册</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="form-box">
                <el-form ref="batchImportForm" :model="batchImportForm"  label-width="140px" >
                    <el-form-item label="注册信息模板下载">
                        <el-button  size="small" type="primary"  @click="submitDownload">下载模板文件
                            </el-button>
                            
                    </el-form-item>
                    <el-form-item label="用户信息上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :limit="1"
                            :headers=token
                            action="/api/user/batchImport"
                            :before-upload="handleBeforeUpload"
                            :on-preview="handlePreview"
                            :on-change="onChange"
                            :on-remove="handleRemove"
                            :on-success="onSuccess"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :auto-upload="false">
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary" @click="clearTip">选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:#3a8ee6;">只能上传 Excel 文档</div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
            </div>
        </div>
        <div class="crumbs" v-if="isShow">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item> 批量注册</el-breadcrumb-item>
                <el-breadcrumb-item> 错误提示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"  v-if="isShow">
             <div v-for="msg in msgList" :key='msg.courseWareId' >
                  
                   <div style="color:red;margin-left:50px;">
                        <p style="line-height:200%;">{{msg}}</p>
                    </div>
         </div>
        </div>
        
    </div>
</template>

<script>
    export default{ 
        name: 'batchImportForm',
        data: function(){
           
            return {
                isShow:false,
                msgList: [],
                fileList: [],
                token:{
                    token:window.localStorage["token"]
                },
              
                role:window.localStorage['role'],
                batchImportForm: {
                   
                },
              
            }
            },
            computed:{
           
            },
            created() {
           
        },

        
        methods: {
            submitDownload(){
                window.open("/api/user/download")
            },
            clearTip(){
                this.msgList = [];
                this.isShow = false;
            },

             handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
               
                //判断文件类型 不是word不许上传
                if(file.name.endsWith(".xls")||file.name.endsWith(".xlsx")){
                    return true
                }else{
                     this.$message.error('上传文档只能是 Excel 文档!');
                     const isPdf = false;
                    return isPdf
                }
               


        },
         onSuccess(response,file) {
                this.fileList = []
                if(response.status == 200){
                this.$message.success('上传成功！');
                }else{
                    for(var i = 0; i< response.data.length;i++)
                    this.msgList[i] = response.data[i]
                    this.isShow = true;
                    this.$message.error("上传失败！请根据错误提示修改文件后上传")
                }
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
                 this.$refs['batchImportForm'].validate((valid) => {
                  if(valid){
                       this.$refs.upload.submit();
                  }else{
                       return false;
                      
                  }
              });
            
        },
        }
    }
</script>
<style  scoped>
.iframe {
  width: 983px;
  height: 600px;
}


</style>
