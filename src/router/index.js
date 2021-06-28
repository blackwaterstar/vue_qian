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
import UserManage from "../views/UserManage";
import Warehouse from "../views/Warehouse";
import ProductManage from "../views/ProductManage";
import adminHome from "../views/AdminHome";
import TypeManage from "../views/TypeManage";
import AdminLogin from "../views/AdminLogin";
import Yorders from "../components/Yorders";
import Wallet from "../components/Wallet";
// 安装路由
Vue.use(Router);

// 配置路由
export default new Router({
  mode: "history",
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/wallet',
      name:'Wallet',
      component:Wallet,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/yorders',
      name:'Yorders',
      component:Yorders,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/adminLogin',
      name:'AdminLogin',
      component:AdminLogin,
      meta: {
        keepAlive: true
      }

    },
    {
      path:'/userManage',
      name:'UserManage',
      component:UserManage,
      meta: {
        keepAlive: true
      }

    },

    {
      path:'/typeManage',
      name:'TypeManage',
      component:TypeManage,
      meta: {
        keepAlive: true
      }

    },

    {
      path:'/adminHome',
      name:'adminHome',
      component:adminHome,
      meta: {
        keepAlive: true
      }

    },
    {
      path:'/productManage',
      name:'ProductManage',
      component:ProductManage,
      meta: {
        keepAlive: true
      }

    },

    {
      path:'/warehouseManage',
      name:'Warehouse',
      component:Warehouse,
      meta: {
        keepAlive: true
      }

    },

    {
      path:'/productinfo',
      name:'ProductInfo',
      component:ProductInfo,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/orders',
      name:'Orders',
      component:Orders,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta: {
        keepAlive: false
      }

    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay,
      meta: {
        keepAlive: false
      }

    }

  ]
});
