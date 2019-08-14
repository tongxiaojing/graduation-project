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
axios.interceptors.response.use((res) => {
  // 对响应正确做处理
  return res
}, function(error) {
  // 对响应错误做点什么 token 已过期
  //获取状态码
  const {status} = error.response;
  console.log(status)
  if(status === 401) {
   // userName用户存在
  if(sessionStorage.getItem('mobile')){
    Message.error("身份过期,请重新登录");
      router.push('/')
    return
  }else{
    router.push('/')
  }
  }
  return Promise.reject(error) 
})

//vue实例，需要放在拦截器之后
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')