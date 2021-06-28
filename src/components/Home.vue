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
                <el-menu-item index="1-4"> <router-link to="/wallet">我的钱包</router-link></el-menu-item>
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
<el-form :inline="true" :model="formInline" class="demo-form-inline"><el-form-item> <el-input
  v-model="search1"
  size="max"
  placeholder="输入商品名查询" v-on:input="handleSearch()">
</el-input></el-form-item>
<el-form-item>
  <el-select size="big" v-model="search2" clearable placeholder="按类别查找书籍" filterable v-on:input="handleSearch()">
    <el-option
      v-for="type in types"
      :key="type.tid"
      :label="type.tname"
      :value="type.tid">
    </el-option>
  </el-select>
</el-form-item></el-form>

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
      types:null,
      search1:null,
      search2:null,
      username:this.$store.getters.getUser.userNickname,
      islogin: this.$store.getters.getUser==null?false:true

    }
  },
  created(){
    this.getList();
    this.getDep();
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getDep:function(){
      var vm = this;
      this.axios({
        method:'post',
        url: '/type/getAllTid'
      }).then(function(resp){
        vm.types = resp.data;
        console.log(resp.data);

      })
    },

    // handleSearch() {
    //   this.axios({
    //     method: 'get',
    //     url: '/product/list1?tid='+this.search2,
    //   }).then(response => {
    //     this.pros = response.data;
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // },
    handleSearch() {
      let postData = this.qs.stringify({
        pname: this.search1,
        tid: this.search2
      });
      console.log(postData);
      this.axios({
        method: 'post',
        url: '/product/list1',
        data: postData
      }).then(response => {
        this.pros = response.data;
      }).catch(error => {
        console.log(error);
      });
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
