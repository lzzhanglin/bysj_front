<template>
<div>
<router-view :key="key"></router-view>

    <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
          <span >courseId: {{ courseId }}</span>
          <span >chapterId: {{ chapterId }}</span>
          <span >disableUpload: {{ disableUpload }}</span>
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
                        :disabled= this.disableUpload
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
             <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="chapterName" label="章节名称" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="chapterOrder" label="章节序号" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="chapterContent" label="章节内容" align="center" sortable width="300">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" sortable width="200">
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                    <el-button type="text" icon="el-icon-lx-forward" class="green" @click="handleView(scope.$index, scope.row)">查看</el-button>
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
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
                tableData: [],
                fileList: [],
                courseId:'',
                chapterId:'',
                disableUpload: true,
                
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
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                   
                    chapterContent: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
            computed:{

            key() {
                return this.$route.query.id !== undefined? this.$route.query.id + +new Date(): this.$route + +new Date()
            },
            paramsData: function () {
                if(this.chapterId != ""){
             this.disableUpload = false
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
               this.getParams();
               this.getData();
            },
           //监听路由的变化，查看课程的页面可以同时打开多个课程的详情页，但是每个页面共用一个组件，需要使用各自的courseId加载章节列表
            watch: {
                '$route' (to, from) {
                    var toPath = to.fullPath.substr(0,14);
                    var fromPath = from.fullPath.substr(0,14);
                    // debugger;
                        //主url相同 id不同的时候才进行操作
                        if(toPath == "/course/detail"){
                            this.getParams();
                            this.getData();
                        }
                        
              
                    
                   
                }
            },
        
        methods: {
            //上传文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
             handleBeforeUpload(file) {
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
        var routerParams = this.$route.query.id
        // var routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.courseId = routerParams
        console.log("更新courseId成功");
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
                     
                      if(resp.data.status === 200){
                          this.chapterId = resp.data.data
                           var obj = {}
                           obj.chapterId = this.chapterId
                           obj.chapterName = this.detailForm.chapterName
                           obj.chapterOrder = this.detailForm.chapterOrder
                           obj.chapterContent = this.detailForm.chapterContent
                           debugger;
                          this.tableData.push(obj);
                          this.onSubmit;
                          this.$message.success('提交成功！');
                           this.$refs[formName].resetFields();

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            },
              // 从后台获取数据
            getData() {
                var dataFromDb = [];
              let _this = this
              console.log("获取chapterList 参数为："+ this.courseId);
                this.$axios.get('/api/chapter/getChapterList', {
                    params: {
                       courseId: this.courseId
                    }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.chapterId = res.data.data[i].chapterId
                obj.createTime = res.data.data[i].createTime
                obj.chapterName = res.data.data[i].chapterName
                obj.chapterOrder = res.data.data[i].chapterOrder
                obj.chapterContent = res.data.data[i].chapterContent
                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
    
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
    

