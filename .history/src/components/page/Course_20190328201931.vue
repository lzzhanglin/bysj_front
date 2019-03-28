<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item> 创建课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="courseForm" :model="courseForm"  :rules="rules" label-width="80px">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="courseForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="课程性质" prop="kind">
                        <el-select v-model="courseForm.kind" placeholder="请选择">
                            <el-option key="bixiu" label="必修" value="bixiu"></el-option>
                            <el-option key="xianxuan" label="限选" value="xianxuan"></el-option>
                            <el-option key="renxuan" label="任选" value="renxuan"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开课日期" prop="dateBegin">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择开课日期"  :picker-options="dateBeginOptions"
                             format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="courseForm.dateBegin" style="width: 100%;"></el-date-picker>
                        </el-col>
                       
                    </el-form-item>
                    <el-form-item label="结课日期" prop="dateEnd">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择结课日期"  :picker-options="dateEndOptions"
                             format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="courseForm.dateEnd" style="width: 100%;"></el-date-picker>
                        </el-col>
                        
                    </el-form-item>
                   
                    <el-form-item label="课程介绍" prop="intro">
                        <el-input type="textarea" rows="5" v-model="courseForm.intro"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('courseForm')">表单提交</el-button>
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
                    if (this.courseForm.dateEnd) {
                        //如果选择了结课日期，只能选则今天之后的日期 且 结课日期之前的日期
                        return time.getTime() < Date.now() || time.getTime() >  new Date(this.courseForm.dateEnd).getTime();
 
                }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间 包括今天
                        return time.getTime() < Date.now() - 8.64e7;
                    } 
            }
                 },
            dateEndOptions: {
                disabledDate: (time) => {
                    if(this.courseForm.dateBegin){
                    //结课日期必须大于开课日期
                    return time.getTime() < new Date(this.courseForm.dateBegin).getTime();
                    }else{
                     return time.getTime() < Date.now() ;
                    }
                    
                }
            },
                
                courseForm: {
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
                            courseName: this.courseForm.name,
                            courseKind: this.courseForm.kind,
                            timeBegin: this.courseForm.dateBegin,
                            timeEnd: this.courseForm.dateEnd,
                            courseIntro: this.courseForm.intro
                  }).then(resp=> {
                      
                this.$message.success('提交成功！');

                    })
                    }else{
                        return false;
                    }
                
            });
            }
        }
    }
</script>