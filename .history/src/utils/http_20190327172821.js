import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '../store'
import router from '../router'
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'http://127.0.0.1:8081';

// // 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 7000 // 请求超时时间
// })

// request拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res);
debugger;
    if(res.data.status === "401"){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    
    }
   
    
      return response;
  },
  error => {
 
    return Promise.reject(error);
  }
)

export default axios;