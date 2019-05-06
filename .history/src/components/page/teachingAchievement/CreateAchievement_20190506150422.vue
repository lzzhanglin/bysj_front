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
                            :data=paramsData
                            action="/api/teacher/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary">选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:red;">注意：请先保存成果再上传课件 当前成果所有资料上传完毕后清空表单 </div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
        
        methods: {
          
           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/course/create', {
                            courseName: this.achievementForm.name,
                            courseKind: this.achievementForm.kind,
                            timeBegin: this.$moment(this.achievementForm.dateBegin).format('YYYY-MM-DD HH:mm:ss'),
                            timeEnd: this.$moment(this.achievementForm.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
                            courseIntro: this.achievementForm.intro
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      if(resp.data.status === 200){
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