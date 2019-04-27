<template>
<div>
    <div class="container">
<div class="plugins-tips">
     <p align="center">{{chapterName}}</p>
</div>
    </div>
   <div class="container">
     <p v-html="chapterContent"></p>

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
