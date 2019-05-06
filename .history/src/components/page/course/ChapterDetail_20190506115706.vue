<template>
<div>
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 章节详情</el-breadcrumb-item>
            </el-breadcrumb>
           </div>
<div class="plugins-tips">
     <p align="center">{{chapterName}}</p>
</div>
   <div class="container">
     <p v-html="chapterContent"></p>

   </div>
     
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 课件列表</el-breadcrumb-item>
            </el-breadcrumb>
       </div>
        <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="域名"
        min-width="250">
        <template slot-scope="scope">
          <a :href="'http://127.0.0.1:8081/courseWare/download?courseWareName='+scope.row.courseWareName"
            target="_blank"
            class="buttonText">{{scope.row.courseWareName}}</a>
        </template>
      </el-table-column>

                <el-table-column prop="courseWareName" label="课件名称" align="center" sortable width="250">
                    

                </el-table-column>
                <el-table-column prop="createTime" label="上传时间" align="center" sortable width="200">
                </el-table-column>
               
                
                <el-table-column label="操作" width="180" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                    <el-button type="text" icon="el-icon-lx-down" class="green" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
              <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
     
</div>
</template>
<script>
export default {
    name: '',
    data: function(){
        return {
             delVisible: false,
            tableData: [],
            chapterId:'',
        chapterName: '',
        chapterContent: ''
        }


    },
      created(){
               this.getParams();
               this.getData();
            },
    methods:{
        handleDownload(index, row){
            console.log("进入下载");
             const item = this.tableData[index];
      
               
              let _this = this
                this.$axios.get('/api/courseWare/download', {
                       params:{
                           courseWareName: item.courseWareName
                       }
                }).then((res) => {
                    // debugger;
                    this.$message.success('正在下载');
                   

                })
            },
             getParams () {
        // 取到路由带过来的参数 
        var routerParams = {};
        routerParams.chapterId = this.$route.query.id
        routerParams.chapterName = this.$route.query.name
        routerParams.chapterContent = this.$route.query.content
        // var routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.chapterName = routerParams.chapterName
        this.chapterContent = routerParams.chapterContent
        this.chapterId =routerParams.chapterId
        console.log("更新courseId成功");
      },
        handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
       deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/courseWare/delete', {
                    params: {
                        courseWareId: item.courseWareId,
                        courseWareName: item.courseWareName
                        
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                this.delVisible = false;
                  

                })
               
            },
      // 从后台获取数据
            getData() {
                var dataFromDb = [];
                console.log("axios参数为："+this.chapterId);
              let _this = this
                this.$axios.get('/api/courseWare/getCourseWareList', {
                    params: {
                       chapterId: this.chapterId
                    }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.courseWareId = res.data.data[i].courseWareId
                obj.courseWareName = res.data.data[i].courseWareName
                obj.createTime = res.data.data[i].createTime
                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
    }
}
</script>
