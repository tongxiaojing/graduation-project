import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Base from './router/base.js'
import Exam from './router/exam.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        ...Base,
        ...Exam
      ]
    },
    {
      path:'/',
      name:'Login',
      component: Login
    }

  ]
})
