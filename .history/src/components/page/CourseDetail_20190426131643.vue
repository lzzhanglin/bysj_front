<template>

<el-container>
    <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
  <el-header>Header</el-header>
  <el-main>
       <div class="form-box">
                <el-form ref="courseForm" :model="detailForm"  :rules="rules" label-width="80px">
                    <el-form-item label="章节名称" prop="name">
                        <el-input v-model="detailForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="章节序号" prop="name" placeholder="请填入数字来标识章节顺序">
                        <el-input v-model="detailForm.order"></el-input>
                    </el-form-item>
                  
                   
                    <el-form-item label="章节内容" prop="intro">
                        <el-input type="textarea" rows="5" v-model="detailForm.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('detailForm')">保存章节</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
     </el-main>
  <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
    export default {
        name: 'baseForm',
        data: function(){
           
            return {

          
          
                
                detailForm: {
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
                   
                    content: [
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
                            timeBegin: this.$moment(this.courseForm.dateBegin).format('YYYY-MM-DD HH:mm:ss'),
                            timeEnd: this.$moment(this.courseForm.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
                            courseIntro: this.courseForm.intro
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
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
    

