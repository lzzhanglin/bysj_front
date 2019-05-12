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
                              v-model="courseForm.dateBegin" style="width: 100%;"></el-date-picker>
                        </el-col>
                       
                    </el-form-item>
                    <el-form-item label="结课日期" prop="dateEnd">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择结课日期"  :picker-options="dateEndOptions"
                             v-model="courseForm.dateEnd" style="width: 100%;"></el-date-picker>
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

         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item> 创建章节</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="chapterForm" :model="chapterForm"  :rules="rules" label-width="80px">
                    <el-form-item label="章节名称" prop="chapterName">
                        <el-input v-model="chapterForm.chapterName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属课程" prop="courseId">
                        <el-select v-model="chapterForm.courseId" placeholder="请选择">
                           <el-option
                                v-for="item in options"
                                :key="item.courseId"
                                :label="item.courseName"
                                :value="item.courseId">
                                </el-option>
                            </el-select>
                    </el-form-item>
              
                   
                    <el-form-item label="章节序号" prop="chapterOrder">
                        <el-input v-model="chapterForm.chapterOrder" placeholder="请输入数字来标识章节顺序"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitChapter('chapterForm')">保 存</el-button>
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
                        return time.getTime() < Date.now() - 8.64e7 || time.getTime() >  new Date(this.courseForm.dateEnd).getTime() - 8.64e7;
 
                }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间 包括今天
                        return time.getTime() < Date.now() - 8.64e7;
                    } 
            }
                 },
            dateEndOptions: {
                disabledDate: (time) => {
                    if(this.courseForm.dateBegin){
                    //结课日期必须大于开课日期
                    return time.getTime() < new Date(this.courseForm.dateBegin).getTime() + 8.64e7;
                    }else{
                     return time.getTime() < Date.now() ;
                    }
                    
                }
            },

            
                options:null,
                
                chapterForm: {
                    chapterName: '',
                    chapterOrder: '',
                    courseId: '',
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
                    ],
                     chapterName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    courseId: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                     chapterOrder: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                }
            }
            },
              created() {
            this.getCourseList();
        },
        
        methods: {
              getCourseList() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/course/getCourseList', {
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.courseId = res.data.data[i].courseId
                obj.createTime = res.data.data[i].createTime
                obj.courseName = res.data.data[i].courseName
                obj.courseKind = res.data.data[i].courseKind
                obj.courseIntro = res.data.data[i].courseIntro
                obj.dateBegin = dt[i].timeBegin
                obj.dateEnd = dt[i].timeEnd
                obj.teacherName = dt[i].teacherName
                obj.electorNum = dt[i].electorNum

                dataFromDb[i] = obj
            }
                    _this.options = dataFromDb;

                })
            },
           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/course/create', {
                            courseName: this.courseForm.name,
                            courseKind: this.courseForm.kind,
                            timeBegin: this.$moment(this.courseForm.dateBegin).format('YYYY-MM-DD HH:mm:ss'),
                            timeEnd: this.$moment(this.courseForm.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
                            courseIntro: this.courseForm.intro
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      if(resp.data.status === 200){
                          this.getCourseList();
                this.$message.success('提交成功！');

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            },
             onSubmitChapter(formName) {
                 var chooseCourseName;
                 for(let i = 0;i<options.length;i++){
                     if(options[i].courseId == this.chapterForm.courseId){
                         chooseCourseName = options[i].courseName;
                     }
                 }
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/chapter/create', {
                            chapterName: this.chapterForm.chapterName,
                            chapterOrder: this.chapterForm.chapterOrder,
                            courseId: this.chapterForm.courseId,
                            creatorJobNo: window.localStorage["jobNo"],
                            courseName:chooseCourseName
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