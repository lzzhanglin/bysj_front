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
                        <el-input v-model="conditionForm.achievementName"></el-input>
                    </el-form-item>
                  
                   
                   
                    <!-- <el-form-item>
                        <el-button type="success" @click="onSubmit('conditionForm')" :disabled="disableSave">保存</el-button>
                        <el-button type="danger" @click="reSetContent('conditionForm')">清空表单</el-button>
                    </el-form-item> -->
                    <el-form-item label="实践图片上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :disabled= this.disableUpload
                            :data=paramsData
                            action="/api/practicalCondition/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary" :disabled="disableUpload">选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:red;">注意：请先保存成果再上传课件 当前成果所有资料上传完毕后清空表单 </div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" :disabled="disableUpload">上传到服务器</el-button>
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
                fileList: [],
                disableUpload:true,
                disableSave:false,
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
             reSetContent(formName){
                this.disableUpload = true
                this.disableSave = false
                this.$refs[formName].resetFields();
                this.fileList = [];
            },
          
           handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            onSuccess(file) {
                this.disableUpload=true;
                console.log("上传成功");
            },
             handleBeforeUpload(file) {
              
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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