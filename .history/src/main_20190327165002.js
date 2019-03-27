// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import http from './utils/http.js';
import axios from 'axios'
import md5 from 'js-md5';
import ElementUI from 'element-ui';
import { Message } from 'element-ui'
// import axiosConfig from './util/axiosConfig.js'
import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
Vue.config.productionTip = false

Message.install = function (Vue, options) {
    Vue.prototype.$message = Message
  }
  
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(Message)
// Vue.use(axiosConfig);
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.token) {  // 获取当前的token是否存在
          console.log("token存在");
          next();
        } else {
          console.log("token不存在");
          next({
            path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
            query: {redirect: to.fullPath}
          })
        }
      }else{
      if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
            confirmButtonText: '确定'
        });
    }
      else { // 如果不需要权限校验，直接进入路由界面
        next();
      }
    }
    

  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
