<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学团队</el-breadcrumb-item>
                <el-breadcrumb-item> 创建介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="teacherForm" :model="teacherForm"  :rules="rules" label-width="80px">
                    <el-form-item label="教师姓名" prop="teacherName">
                        <el-input v-model="teacherForm.teacherName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="teacherForm.sex" placeholder="请选择">
                            <el-option key="male" label="男" value="男"></el-option>
                            <el-option key="female" label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历" prop="education">
                        <el-input v-model="teacherForm.education"></el-input>
                    </el-form-item>
                     <el-form-item label="职称" prop="jobTitle">
                        <el-input v-model="teacherForm.jobTitle"></el-input>
                    </el-form-item>
                     <el-form-item label="所属学院" prop="affiliatedCollege">
                        <el-input v-model="teacherForm.affiliatedCollege"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="教师介绍" prop="introduction">
                        <el-input type="textarea" rows="5" v-model="teacherForm.introduction"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('teacherForm')">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseForm',
        data: function(){
           
            return {

          
           
           
                
                teacherForm: {
                    teacherName: '',
                    sex: '',
                    education: '',
                    jobTitle: '',
                    affiliatedCollege: '',
                    introduction: ''
                },
                rules: {
                    teacherName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    education: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    jobTitle: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    affiliatedCollege: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    introduction: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
        
        methods: {
            
           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/teacher/create', {
                            teacherName: this.teacherForm.teacherName,
                            sex: this.teacherForm.sex,
                            education: this.teacherForm.education,
                            jobTitle: this.teacherForm.jobTitle,
                            affiliatedCollege: this.teacherForm.affiliatedCollege,
                            introduction: this.teacherForm.introduction
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