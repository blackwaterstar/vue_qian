import Vue from 'vue'
// 导入路由插件
import Router from 'vue-router'
// 导入上面定义的组件
import ProductInfo from '../components/ProductInfo'
import Home from '../components/Home'
import Cart from '../components/Cart'
import Login from '../components/Login'
import Orders from '../components/Orders'
import Pay from '../components/Pay'


// 安装路由
Vue.use(Router);

// 配置路由
export default new Router({
  mode: "history",
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    // {
    //   path:'/productinfo/:pid',
    //   name:'ProductInfo',
    //   component:ProductInfo
    // },
    {
      path:'/productinfo',
      name:'ProductInfo',
      component:ProductInfo
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/orders',
      name:'Orders',
      component:Orders
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay
    }
  ]
});
