<template>
  <el-container>
    <el-header>
      <el-col :span="12"><div class="grid-content bg-purple" align="left">
        <img src="../assets/logo.png" width="150px" height="50px">
      </div></el-col>
      <el-col v-if="!islogin" :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-button plain @click="$router.push('/Login')">登录</el-button>
        <el-button plain>注册</el-button>
      </div></el-col>
      <el-col v-if="islogin" :span="12"><div class="grid-content bg-purple-light" align="right">
        <span>欢迎你，{{username}}</span>
        <el-button plain @click="$router.push('/logout')">注销</el-button>
      </div></el-col>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-col :span="12">
<!--          <h5>默认颜色</h5>-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人中心</span>
              </template>
              <el-submenu index="1-1">
                <template slot="title">我的信息</template>
                <el-menu-item index="1-1-1">个人信息</el-menu-item>
                <el-menu-item index="1-1-2">修改信息</el-menu-item>
              </el-submenu>
              <el-menu-item-group>
                <template slot="title">我的信息</template>
                <el-menu-item index="1-2">个人信息</el-menu-item>
                <el-menu-item index="1-3">修改信息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="钱包">
                <el-menu-item index="1-4">我的钱包</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <router-link to="/orders">查看订单</router-link>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
             <router-link to="/cart">查看购物车</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <div class="block" >

          <el-carousel indicator-position="none" height="350px">
            <el-carousel-item v-for="item in imgs"  v-bind:key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </div>


        <div class="products">
          <div v-for="pro in pros" class="product">
            <img :src="pro.pimg" />
            <br/>
            <h4>{{pro.pname}}</h4>
            <h4>{{pro.price}}</h4>
            <el-button type="primary" round @click="gtproinfo(pro.pid,pro.pimg)">立即购买</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
<!--  <el-container>-->
<!--&lt;!&ndash;    <el-header height="60px">&ndash;&gt;-->
<!--&lt;!&ndash;      <div>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="1">处理中心</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-submenu index="2">&ndash;&gt;-->
<!--&lt;!&ndash;          <template slot="title">我的工作台</template>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-1">选项1</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-2">选项2</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-menu-item index="2-3">选项3</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-submenu index="2-4">&ndash;&gt;-->
<!--&lt;!&ndash;            <template slot="title">选项4</template>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-menu-item index="2-4-1">选项1</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-menu-item index="2-4-2">选项2</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-menu-item index="2-4-3">选项3</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-submenu>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-submenu>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="3" disabled>消息中心</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-menu-item index="4"><a href="http://localhost:8091/cart" target="_blank">订单管理</a></el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-menu>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--&lt;!&ndash;    </el-header>&ndash;&gt;-->
<!--    <el-main>-->

<!--      <div class="block" >-->

<!--        <el-carousel indicator-position="none" height="350px">-->
<!--          <el-carousel-item v-for="item in imgs"  v-bind:key="item">-->
<!--            <img :src="item">-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--      </div>-->


<!--      <div class="products">-->
<!--        <div v-for="pro in pros" class="product">-->
<!--          <img :src="pro.pimg" />-->
<!--          <br/>-->
<!--          <h4>{{pro.pname}}</h4>-->
<!--          <h4>{{pro.price}}</h4>-->
<!--          <el-button type="primary" round @click="gtproinfo(pro.pid,pro.pimg)">立即购买</el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-main>-->
<!--    <el-footer height="260px">Footer</el-footer>-->
<!--  </el-container>-->

</template>


<script>


export default {
  name: 'App',

  data(){
    return {
      imgs:[
        "/static/b1.jpg",
        "/static/b2.jpg",
        "/static/b3.jpg",
        "/static/b4.jpg"
      ],
      pros:null,
      username:this.$store.getters.getUser.userNickname,
      islogin: this.$store.getters.getUser==null?false:true

    }
  },
  created(){
    this.getList();
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getList:function(){
      var vm = this;
      this.axios({
        method:'GET',
        url: '/product/list'
      }).then(function(resp){
        vm.pros = resp.data;
        console.log(resp.data);

      })
    },
    gtproinfo(pid,pimg){
      // this.$router.push("/productinfo/"+pid)
      this.$router.push({
        path: '/productinfo',
        query: {
          pid: pid,
          pimg:pimg
        }
      })
    }



  }
}
</script>

<style scoped>

  .product{
    margin-top: 30px;
    display: inline-block;
    width: 30%;
  }

  .product img{
    width: 200px;
    height: 250px;
  }



  .el-header, .el-footer {
    margin-top: 10px;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-carousel__item h3{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }



  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    /*line-height: 560px;*/
    /*height: 800px;*/
    padding:10px 0px 50px 0px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }




</style>
