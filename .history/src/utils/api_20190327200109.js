import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Message({
      message:"找不到该页面",
      type: 'error',
      showClose: true,
      duration:2000
  } else if (err.response.status == 403) {
    Message({
      message:"权限不足，访问受限",
      type: 'error',
      showClose: true,
      duration:2000
  }else if(err.response.status == 401){
    Message({
      message:"用户名不存在或密码错误",
      type: 'error',
      showClose: true,
      duration:2000
  }
  else{
    Message({
      message:"未知错误",
      type: 'error',
      showClose: true,
      duration:2000
  }
  return Promise.resolve(err);
})

let base = '';

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}