// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import qs from 'qs'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

Vue.prototype.qs = qs;
Vue.prototype.axios = axios;
axios.defaults.baseURL = "http://localhost:8080/ssm/"
Vue.use(Vuex)

Vue.use(VueRouter);


Vue.use(ElementUI);




// 在跳转前执行
router.beforeEach((to, form, next) => {
  // 获取用户登录状态
  let isLogin = sessionStorage.getItem('isLogin');
  let adminLogin = sessionStorage.getItem('adminLogin');
  // 注销
  if (to.path == '/logout') {
    // 清空
    sessionStorage.clear();
    // 跳转到登录
    next({path: '/Login'});
  }
  // 如果请求的是登录页
  else if (to.path == '/login') {
    if (isLogin != null) {
      // 跳转到首页
      next({path: '/home'});
    }
  }
  else if (to.path == '/adminLogin') {
    if (adminLogin != null) {
      // 跳转到首页
      next({path: '/adminHome'});
    }
  }
  else if (to.path == '/userManage'||to.path == '/warehouseManage'||to.path == '/productManage'||to.path == '/typeManage') {
    if (adminLogin == null) {
      // 跳转到首页
      next({path: '/adminLogin'});
    }
  }
  // 如果为非登录状态
  else if (isLogin == null && adminLogin == null) {
    if(to.path!='/register'){
      // 跳转到登录页
      next({path: '/login'});
    }
  }
  // 下一个路由
  next();
});







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


