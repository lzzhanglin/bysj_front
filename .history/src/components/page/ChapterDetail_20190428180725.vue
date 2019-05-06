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
                <el-table-column prop="courseWareName" label="课件名称" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="createTime" label="上传时间" align="center" sortable width="200">
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
</template>
<script>
export default {
    name: '',
    data: function(){
        return {
        chapterName: '',
        chapterContent: ''
        }


    },
      created(){
               this.getParams();
               this.getData();
            },
    methods:{
        handleView(index, row){
                const item = this.tableData[index];
                 this.$router.push({
                   path: '/course/detail/chapter', query:{id: item.courseId}
        });
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
        console.log("更新courseId成功");
      },
      // 从后台获取数据
            getData() {
                var dataFromDb = [];
              let _this = this
              console.log("获取chapterList 参数为："+ this.courseId);
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
