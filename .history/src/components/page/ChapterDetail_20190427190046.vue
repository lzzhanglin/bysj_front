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


    }
}
</script>
