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
                     <el-form-item label="教师姓名" prop="affiliatedCollege">
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

          
            dateBeginOptions: {
                disabledDate: (time) => {
                    if (this.teacherForm.dateEnd) {
                        //如果选择了结课日期，只能选则今天之后的日期 且 结课日期之前的日期
                        return time.getTime() < Date.now() - 8.64e7 || time.getTime() >  new Date(this.teacherForm.dateEnd).getTime() - 8.64e7;
 
                }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间 包括今天
                        return time.getTime() < Date.now() - 8.64e7;
                    } 
            }
                 },
            dateEndOptions: {
                disabledDate: (time) => {
                    if(this.teacherForm.dateBegin){
                    //结课日期必须大于开课日期
                    return time.getTime() < new Date(this.teacherForm.dateBegin).getTime() + 8.64e7;
                    }else{
                     return time.getTime() < Date.now() ;
                    }
                    
                }
            },
                
                teacherForm: {
                    name: '',
                    kind: '',
                    dateBegin: '',
                    dateEnd: '',
                    intro: '',
                },
                rules: {
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    kind: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    dateBegin: [
                        { type: 'date', required: true, message: '不能为空', trigger: 'change' }
                    ],
                    dateEnd: [
                        { type: 'date', required: true, message: '不能为空', trigger: 'change' }
                    ],
                    intro: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
        
        methods: {
            formatTime1(val) {
                this.dateBegin=val;
            },
             formatTime2(val) {
                this.dateEnd=val;
            },

           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/course/create', {
                            courseName: this.teacherForm.name,
                            courseKind: this.teacherForm.kind,
                            timeBegin: this.$moment(this.teacherForm.dateBegin).format('YYYY-MM-DD HH:mm:ss'),
                            timeEnd: this.$moment(this.teacherForm.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
                            courseIntro: this.teacherForm.intro
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