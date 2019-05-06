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
                     <el-form-item label="出生日期" prop="birthDay">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择出生日期"  
                              v-model="teacherForm.birthDay" style="width: 100%;"></el-date-picker>
                        </el-col>
                       
                    </el-form-item>
                    <el-form-item label="学历" prop="education">
                        <el-select v-model="teacherForm.education" placeholder="请选择">
                            <el-option key="bachelor" label="本科" value="本科"></el-option>
                            <el-option key="master" label="硕士" value="硕士"></el-option>
                            <el-option key="doctor" label="博士" value="博士"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职称" prop="jobTitle">
                        <el-select v-model="teacherForm.jobTitle" placeholder="请选择">
                            <el-option key="professor" label="教授" value="教授"></el-option>
                            <el-option key="associateProfessor" label="副教授" value="副教授"></el-option>
                            <el-option key="lecturer" label="讲师" value="讲师"></el-option>
                            <el-option key="Assistant" label="助教" value="助教"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="担任职务" prop="position">
                        <el-input v-model="teacherForm.position"></el-input>
                    </el-form-item>
                     <el-form-item label="所属学院" prop="affiliatedCollege">
                        <el-select v-model="teacherForm.affiliatedCollege" placeholder="请选择">
                            <el-option key="xinxi" label="信息科学与工程学院" value="信息科学与工程学院"></el-option>
                            <el-option key="tumu" label="土木工程学院" value="土木工程学院"></el-option>
                            <el-option key="hehai" label="河海学院" value="河海学院"></el-option>
                            <el-option key="hangyun" label="航运与船舶工程学院" value="航运与船舶工程学院"></el-option>
                            <el-option key="jidian" label="机电与车辆工程学院" value="机电与车辆工程学院"></el-option>
                            <el-option key="jiaotong" label="交通运输学院" value="交通运输学院"></el-option>
                            <el-option key="jianzhu" label="建筑与城市规划学院" value="建筑与城市规划学院"></el-option>
                            <el-option key="cailiao" label="材料科学与工程学院" value="材料科学与工程学院"></el-option>
                            <el-option key="hangkong" label="航空学院" value="航空学院"></el-option>
                            <el-option key="jingji" label="经济与管理学院" value="经济与管理学院"></el-option>
                            <el-option key="shuxue" label="数学与统计学院" value="数学与统计学院"></el-option>
                            <el-option key="waiguoyu" label="外国语学院" value="外国语学院"></el-option>
                            <el-option key="renwen" label="人文学院" value="人文学院"></el-option>
                            <el-option key="makesi" label="马克思主义学院" value="马克思主义学院"></el-option>
                            <el-option key="guoji" label="国际学院" value="国际学院"></el-option>
                            <el-option key="yishu" label="艺术设计学院" value="艺术设计学院"></el-option>
                            <el-option key="jixu" label="继续教育学院" value="继续教育学院"></el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="详细介绍" prop="introduction">
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
                    birthDay: '',
                    education: '',
                    jobTitle: '',
                    postion: '',
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
                    birthDay: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    education: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    jobTitle: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    postion: [
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
                            birthDay: this.$moment(this.teacherForm.birthDay).format('YYYY-MM-DD HH:mm:ss'),
                            education: this.teacherForm.education,
                            jobTitle: this.teacherForm.jobTitle,
                            postion: this.teacherForm.postion,
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