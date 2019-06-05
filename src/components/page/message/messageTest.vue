<template>

<div>
<div class="container" style="width:800px;height:300px;">
  <el-scrollbar wrap-class="list" wrap-style="color: black;"  view-class="view-box" :native="false">
    <span style="color:red" v-if="isShowNotice">NOTICE!    {{noticeMessage.username}} : {{noticeMessage.content}} at {{noticeMessage.sendTime}}</span>
    <el-button  size="small" v-if="isShowCancelTop &&( role==='ROLE_TEACHER' ||role ==='ROLE_ADMIN')" type="info" @click="cancelTopMessage" >取消置顶</el-button>
<div  v-for="msg in dataList" :key="msg.id" style="margin-top:10px;margin-bottom:10px;">
   <span style="color:#1f98ad">{{msg.username}}</span>
   <span> : </span>
   <span>{{msg.content}}</span>
   <span style="color:#9eb4b8"> at{{msg.sendTime}}</span>
  </div>
  </el-scrollbar>
   </div>
  <div>
  <el-button style="margin-top:10px;" size="small" type="danger" @click="clearContent" >清 空</el-button>      
  </div>
  <div class="form-box" style="margin-top:10px;">
      <el-form :model="msgForm" :rules="rules" ref="msgForm" label-width="0px" class="ms-content">
              <el-form-item  prop="content">
                              <el-input type="textarea" rows="5" v-model="msgForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" v-if="role==='ROLE_TEACHER' ||role ==='ROLE_ADMIN'" @click="topMessage" >置 顶</el-button>                
              <el-button size="small" type="success" @click="sendMessage" >发 送</el-button>

              </el-form-item>
  </el-form>
  </div>

  </div>

</template>
<script>
import * as Stomp from 'stompjs';
import SockJS from "sockjs-client/dist/sockjs.js";

    export default {

    data() {
      return {
        isShowNotice:false,
        isShowCancelTop:false,
        dataList: [],
        noticeMessage:{
          username:'',
          content:'',
          sendTime:'',
          jobNo:''
        },
        msgForm:{
          content: ''
        },
         rules: {
                    content: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                   
                },
        role:window.localStorage['role'],
      };
    },

    created:function(){
      this.initWebSocket();
    },
    beforeDestroy: function () {
      // 页面离开时断开连接,清除定时器
      this.disconnect();
      clearInterval(this.timer);
    },
 
    methods: {
      cancelTopMessage(){
        // this.noticeMessage = null;
        this.isShowCancelTop = false;
        this.isShowNotice = false;
        this.stompClient.send("/app/notice", {priority: 9}, JSON.stringify({'username':localStorage.username,'jobNo':localStorage.jobNo,'content': '','extra':'cancelTop'}));
  
      },
      clearContent(){
          this.dataList = [];
      },

      initWebSocket() {
        this.connection();
        let self = this;
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            self.stompClient.send("test");
          } catch (err) {
            console.log("断线了: " + err);
            self.connection();
          }
        }, 5000);
      },
      removeTab(targetName) {
        console.log(targetName)
      },
      connection() {
        let _this = this
      // 建立连接对象 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
        this.socket = new SockJS('http://localhost:8081/websocket/');
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(this.socket);
        // 定义客户端的认证信息,按需求配置
        var headers = {
          token: localStorage.token,
         
        };
        console.log("成功连接");
        // 向服务器发起websocket连接
        // 订阅服务端提供的某个topic
        // data.body存放的是服务端发送给我们的信息
        this.stompClient.connect(headers,(frame) => {
          console.log("frame is: "+frame);
          this.stompClient.subscribe('/topic/ip', (data) => { 
           var len = _this.dataList.length;
           var dataFromWS = JSON.parse(data.body);
           const msg={
             username: dataFromWS.username,
             jobNo: dataFromWS.jobNo,
             content: dataFromWS.content,
             sendTime: dataFromWS.sendTime,
             extra: dataFromWS.extra,
             id: len,
           }
           console.log("收到服务器响应一次");
           if(msg.extra == 'notice'){
             console.log("更新置顶一次");
             _this.isShowNotice = true;
             _this.isShowCancelTop = true;
             _this.noticeMessage = msg
           }else if(msg.extra == 'canceled'){
             _this.isShowNotice = false;
             _this.isShowCancelTop = false;
           }
           else{
           _this.$set(_this.dataList,len,msg);
           }
          });
        }, (err) => {
            // 连接发生错误时的处理函数
            console.log("连接失败");
            console.log(err);
        });

      },
      sendMessage(){
         this.$refs['msgForm'].validate((valid) => {
           if(valid){
        this.stompClient.send("/app/send", {priority: 9}, JSON.stringify({'username':localStorage.username,'jobNo':localStorage.jobNo,'content': this.msgForm.content,'extra':''}));
           }
         else{
            return false
         }
      });
      },
       topMessage(){
         this.$refs['msgForm'].validate((valid) => {
           if(valid){
             this.isShowNotice = true;
             this.isShowCancelTop = true;
        this.stompClient.send("/app/notice", {priority: 9}, JSON.stringify({'username':localStorage.username,'jobNo':localStorage.jobNo,'content': this.msgForm.content,'extra':'notice'}));
           }
         else{
            return false
         }
      });
      },
      // 断开连接
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
          console.log("Disconnected");
        }
      }
    }
};
</script>
<style>
.list {
  max-height: 300px;
}
</style>
