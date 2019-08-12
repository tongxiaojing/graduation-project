import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Vueaxios from 'vue-axios';
axios.defaults.baseURL = "http://192.168.1.188:12/api/";
Vue.use(Vueaxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false //阻止启动生产消息，常用作指令

//请求拦截，携带token访问接口
axios.interceptors.request.use(config => {
  //设置请求头
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = sessionStorage.getItem('token')
  }
  return config
}, error => {
  return Promise.reject(error)
})
/* 响应拦截器 */
// axios.interceptors.response.use(function (response) { //token过期（20分钟） 
//    const { status } = error.response;
//   if (status === 401) {
//     Message.error("token失效,请重新登录");
//     //清除token
//     sessionStorage.clear('token');// 删除已经失效或过期的token
//     //重新登录
//     router.push('/login')
//   } else if (sessionStorage.getItem('mobile')) { // 判断token是否存在，如果存在说明需要更新token
//     sessionStorage.setItem('token', response.data.token) // 如果存在token，覆盖原来的token
//   }
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

//vue实例，需要放在拦截器之后
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')