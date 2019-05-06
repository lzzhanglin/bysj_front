<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学成果</el-breadcrumb-item>
                <el-breadcrumb-item> 创建成果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="achievementForm" :model="achievementForm"  :rules="rules" label-width="80px">
                    <el-form-item label="成果名称" prop="achievementName">
                        <el-input v-model="achievementForm.achievementName"></el-input>
                    </el-form-item>
                    <el-form-item label="成果类型" prop="achievementKind">
                        <el-select v-model="achievementForm.achievementKind" placeholder="请选择">
                            <el-option key="xiangmu" label="科研项目" value="科研项目"></el-option>
                            <el-option key="lunwen" label="论文发表" value="论文发表"></el-option>
                            <el-option key="jiangxiang" label="获得奖项" value="获得奖项"></el-option>
                            <el-option key="zhuanli" label="授权专利" value="授权专利"></el-option>
                        </el-select>
                    </el-form-item>
                   
                   
                    <el-form-item label="详情" prop="detail">
                        <el-input type="textarea" rows="5" v-model="achievementForm.intro"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('achievementForm')">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    <el-form-item label="资料上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :disabled= this.disableUpload
                            :data=paramsData
                            action="/api/teacher/upload"
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
        name: 'achievementForm',
        data: function(){
           
            return {

                fileList: [],
                disableUpload:true,
                achievementForm: {
                    achievementName: '',
                    achievementKind: '',
                    detail: '',
                },
                rules: {
                    achievementName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    achievementKind: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    detail: [
                        { required: true, message: '不能为空11', trigger: 'blur' }
                    ]
                }
            }
            },
            computed:{
                
            paramsData: function () {
                if(this.chapterId != ""){
                    let params = {
                    courseId: this.courseId,
                    chapterId: this.chapterId,
                    creatorJobNo:window.localStorage["jobNo"]
                }
                return params
           }else{
               let params = {
           }
               return params
         }
     
     
    }
            },
        
        methods: {
          
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
                            achievementName: this.achievementForm.achievementName,
                            achievementKind: this.achievementForm.achievementKind,
                            detail: this.achievementForm.detail
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      if(resp.data.status === 200){
                          this.disableUpload = false;
                          
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