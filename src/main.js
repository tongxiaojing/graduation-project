import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Vueaxios from 'vue-axios';
axios.defaults.baseURL = "http://192.168.1.188:12/api";
Vue.use(Vueaxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//携带token访问接口
axios.interceptors.request.use(
  function (config) {
    // 拦截每次请求,携带token
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)