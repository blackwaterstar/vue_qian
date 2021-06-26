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
import Register from "../components/Register";
import UserManage from "../components/UserManage";
import Warehouse from "../components/Warehouse";
import ProductManage from "../components/ProductManage";
import adminHome from "../views/AdminHome";
import TypeManage from "../components/TypeManage";
import AdminLogin from "../components/AdminLogin";
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
    {
      path:'/adminLogin',
      name:'AdminLogin',
      component:AdminLogin
    },
    {
      path:'/typeManage',
      name:'TypeManage',
      component:TypeManage
    },
    {
      path:'/adminHome',
      name:'adminHome',
      component:adminHome,
    },
    {
      path:'/productManage',
      name:'ProductManage',
      component:ProductManage
    },
    {
      path:'/warehouseManage',
      name:'Warehouse',
      component:Warehouse
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
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/orders',
      name:'Orders',
      component:Orders
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay
    },
    {
      path:'/userManage',
      name:'UserManage',
      component:UserManage
    }
  ]
});
