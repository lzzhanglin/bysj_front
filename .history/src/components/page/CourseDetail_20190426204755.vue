<template>
<div>


    <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
          <span >courseId: {{ courseId }}</span>
          <span >chapterId: {{ chapterId }}</span>
       <div class="form-box">
                <el-form ref="detailForm" :model="detailForm"  :rules="rules" label-width="80px">
                    <el-form-item label="章节名称" prop="chapterName" >
                        <el-input v-model="detailForm.chapterName" placeholder="请填入章节名称"></el-input>
                    </el-form-item>
                    <el-form-item label="章节序号" prop="chapterOrder" placeholder="请填入数字来标识章节顺序">
                        <el-input v-model="detailForm.chapterOrder" placeholder="请填入数字来标识章节顺序"></el-input>
                    </el-form-item>
                  
                   
                    <el-form-item label="章节内容" prop="chapterContent">
                        <el-input type="textarea" rows="5" v-model="detailForm.chapterContent" placeholder="请填入章节内容"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('detailForm')">保存章节</el-button>
                    </el-form-item>

                     <el-form-item label="课件上传">
                  <el-upload
                        class="upload-demo"
                        drag
                        action="/api/courseWare/upload"
                        multiple
                        :data=paramsData
                        :on-preview="handlePreview"
                        :before-upload="handleBeforeUpload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请先保存章节再上传课件</div>
            </el-upload>
                    </el-form-item>
                </el-form>
                   
            </div>
           
            </div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 章节目录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

            <div class="table">
                <div class="container"></div>
            </div>
             </div>
</template>

<script>
    export default {
        name: 'baseForm',
        data: function(){
           
            return {

                fileList: [],
                courseId:'',
                chapterId:'',
                
                detailForm: {
                    chapterName: '',
                    chapterOrder: '',
                    chapterContent: '',
                },
                rules: {
                    chapterName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    chapterOrder: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                   
                    chapterContent: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
            computed:{
     paramsData: function () {
         if(this.chapterId != undefined){
            let params = {
            courseId: this.courseId,
            chapterId: this.chapterId,
            creatorJobNo:window.localStorage["jobNo"]
      }
       return params
         }else{
              let params = {
            courseId: this.courseId,
            chapterId: 666,
            creatorJobNo:window.localStorage["jobNo"]
         }
          return params
         }
     
     
    }

            },

            created(){
               this.getParams()
            },
        
        methods: {
            //上传文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
             handlePreview(file) {
                 console.log("章节id为："+this.chapterId);
               if(this.chapterId == undefined){
                   return false;
               }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
                    
            getParams () {
        // 取到路由带过来的参数 
        var routerParams = this.$route.query
        .id
        // 将数据放在当前组件的数据内
        this.courseId = routerParams
      },


           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/chapter/create', {
                            chapterName: this.detailForm.chapterName,
                            chapterOrder: this.detailForm.chapterOrder,
                            chapterContent: this.detailForm.chapterContent,
                            courseId: this.courseId,
                            creatorJobNo: window.localStorage["jobNo"]
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      if(resp.data.status === 200){
                          this.chapterId = resp.data.data
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
    

