<template>
<div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 章节目录</el-breadcrumb-item>
            </el-breadcrumb>
           </div>
             <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="chapterName" label="章节名称" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="chapterOrder" label="章节序号" align="center" sortable width="200">
                </el-table-column>
                 <el-table-column prop="courseName" label="所属课程" align="center" sortable width="200">
                </el-table-column>
                <!-- <el-table-column prop="chapterContent" label="章节内容" align="center" sortable width="300">
                </el-table-column> -->
                <el-table-column prop="createTime" label="创建时间" align="center" sortable width="200">
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                    <!-- <el-button type="text" icon="el-icon-lx-forward" class="green" @click="handleView(scope.$index, scope.row)">查看</el-button> -->
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
             <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        
         <!-- 编辑弹出框  -->
         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                 <el-form-item label="章节名称">
                    <el-input v-model="form.chapterName"></el-input>
                </el-form-item>
                <el-form-item label="章节序号">
                    <el-input v-model="form.chapterOrder"></el-input>
                </el-form-item>

                 <el-form-item label="所属课程" prop="courseId">
                        <el-select v-model="form.courseId" placeholder="请选择">
                           <el-option
                                v-for="item in options"
                                :key="item.courseId"
                                :label="item.courseName"
                                :value="item.courseId">
                                </el-option>
                            </el-select>
                    </el-form-item>
                
               

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

            <!-- <div class="table">
                <div class="container"></div>
            </div> -->
            </div>
</template>

<script>
   
    

    export default {
        name: 'baseForm',


        data: function(){
           
            return {
                options:null,
                delVisible: false,
                tableData: [],
                fileList: [],
                courseId:'',
                chapterId:'',
                editVisible: false,
               form : {
                    courseId: '',
                    chapterName: '',
                    chapterOrder: '',
                },
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
                },
            }
            },
            computed:{

          
            paramsData: function () {
                if(this.chapterId != ""){
                    let params = {
                    courseId: this.courseId,
                    chapterId: this.chapterId,
                    creatorJobNo:window.localStorage["jobNo"]
                }
                return params
           }else{
               let params = {
           }
               return params
         }
     
     
    }

            },


            created(){
               this.getParams();
               this.getData();
               this.getCourseList();
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
           saveEdit(index,row){
               var chooseCourseName;
                 for(let i = 0;i<this.options.length;i++){
                     if(this.options[i].courseId == this.form.courseId){
                         chooseCourseName = this.options[i].courseName;
                     }
                 }
                 this.postRequest('/api/chapter/update', {
                 
                        courseId: this.form.courseId,
                        courseName: chooseCourseName,
                        chapterId: this.form.chapterId,
                        chapterOrder: this.form.chapterOrder,
                        chapterName: this.form.chapterName,
                
                }).then((res) => {
                 
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
           },

            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    chapterId: item.chapterId,
                    courseId: item.courseId,
                    chapterName: item.chapterName,
                    chapterOrder: item.chapterOrder,
                }
                this.editVisible = true;
                console.log("所属课程id为："+this.form.courseId);
            },

            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
             // 确定删除
            deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/chapter/delete', {
                    params: {
                        chapterId: item.chapterId
                        
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                this.delVisible = false;
                  

                })
               
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
                          //取消上传文件的禁用
                          this.disableUpload = false
                          this.chapterId = resp.data.data
                          
                           var obj = {}
                           //将新增的数据追加到table 返回只有chapterId createTime用js取现在的时间 可能刷新后会与数据库不一致 不过影响不大
                           //将时间拼接成数据库存储的形式
                           var date = new Date();
                           var year = date.getFullYear();
                           var month = date.getMonth()+1;
                           if(month < 10){
                               month = '0'+month;
                           }
                           var day = date.getDate();
                           if(day < 10){
                               day = '0' + day;
                           }
                           var hour = date.getHours();
                           var minute = date.getMinutes();
                           var second = date.getSeconds();
                           var createTime = year + "-" + month + "-" + day +" "+ hour+":"+minute+":"+second;
                           obj.chapterId = this.chapterId
                           obj.chapterName = this.detailForm.chapterName
                           obj.chapterOrder = this.detailForm.chapterOrder
                           obj.chapterContent = this.detailForm.chapterContent
                           obj.createTime = createTime
                          this.tableData.push(obj);
                          this.onSubmit;
                          this.$message.success('提交成功！');
                        //    this.$refs[formName].resetFields();

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            },
            reSetContent(formName){
                this.disableUpload = true
                this.$refs[formName].resetFields();
                fileList = [];
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
                obj.courseId = dt[i].courseId
                obj.courseName = dt[i].courseName
                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
    
        }
    }
</script>
<style>


    .editor-btn{
        margin-top: 20px;
    }
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
    

