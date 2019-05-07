<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实践教学</el-breadcrumb-item>
                <el-breadcrumb-item> 实践条件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
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
                            
                            <div slot="tip" class="el-upload__tip" style="color:red;">只能上传jpg/png文件，且不超过500kb </div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
            </div>
        </div>

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
                fileList: [],
                disableUpload:true,
                conditionForm: {
                    describe: '',
                },
                rules: {
                    describe: [
                        { required: true, message: '不能为空', trigger: 'blur' }
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
        
        methods: {
          
          
           handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
              this.$refs['conditionForm'].validate((valid) => {
                  if(!valid){
                       console.log('验证失败');
                       return false;
                  }else{
                       console.log('验证成功');
                      
                  }
              });
        },
         onSuccess(file) {
                this.$refs['conditionForm'].resetFields();
                this.fileList = []
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
            this.$refs.upload.submit();
        },
           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/achievement/create', {
                            achievementName: this.conditionForm.achievementName,
                            achievementKind: this.conditionForm.achievementKind,
                            detail: this.conditionForm.detail
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      this.fileList = []
                      if(resp.data.status === 200){
                          this.disableSave = true
                          this.disableUpload = false;
                          this.achievementId = resp.data.data
                          this.$message.success('提交成功！');

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            }
        }
    }
</script>