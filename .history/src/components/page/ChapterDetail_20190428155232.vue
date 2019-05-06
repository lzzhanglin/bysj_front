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
    }
}
</script>
