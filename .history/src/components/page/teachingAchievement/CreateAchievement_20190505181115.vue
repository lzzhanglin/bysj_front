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
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="achievementForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="教学成果类型" prop="kind">
                        <el-select v-model="achievementForm.kind" placeholder="请选择">
                            <el-option key="xiangmu" label="科研项目" value="科研项目"></el-option>
                            <el-option key="lunwen" label="论文发表" value="论文发表"></el-option>
                            <el-option key="jiangxiang" label="获得奖项" value="获得奖项"></el-option>
                            <el-option key="zhuanli" label="授权专利" value="授权专利"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开课日期" prop="dateBegin">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择开课日期"  :picker-options="dateBeginOptions"
                              v-model="achievementForm.dateBegin" style="width: 100%;"></el-date-picker>
                        </el-col>
                       
                    </el-form-item>
                    <el-form-item label="结课日期" prop="dateEnd">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择结课日期"  :picker-options="dateEndOptions"
                             v-model="achievementForm.dateEnd" style="width: 100%;"></el-date-picker>
                        </el-col>
                        
                        
                    </el-form-item>
                   
                    <el-form-item label="课程介绍" prop="intro">
                        <el-input type="textarea" rows="5" v-model="achievementForm.intro"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('achievementForm')">表单提交</el-button>
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
                    if (this.achievementForm.dateEnd) {
                        //如果选择了结课日期，只能选则今天之后的日期 且 结课日期之前的日期
                        return time.getTime() < Date.now() - 8.64e7 || time.getTime() >  new Date(this.achievementForm.dateEnd).getTime() - 8.64e7;
 
                }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间 包括今天
                        return time.getTime() < Date.now() - 8.64e7;
                    } 
            }
                 },
            dateEndOptions: {
                disabledDate: (time) => {
                    if(this.achievementForm.dateBegin){
                    //结课日期必须大于开课日期
                    return time.getTime() < new Date(this.achievementForm.dateBegin).getTime() + 8.64e7;
                    }else{
                     return time.getTime() < Date.now() ;
                    }
                    
                }
            },
                
                achievementForm: {
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