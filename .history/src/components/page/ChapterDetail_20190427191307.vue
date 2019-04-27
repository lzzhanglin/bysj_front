<template>
<div>
<p>hello</p>

    <p >{{chapterName}}</p>
     <p v-html="chapterContent">{{chapterName}}</p>
     
     
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
    methods:{
        handleView(index, row){
                const item = this.tableData[index];
                 this.$router.push({
                   path: '/course/detail/chapter', query:{id: item.courseId}
        });
            },
    }
}
</script>
