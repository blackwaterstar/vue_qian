<template>
  <el-container>



    <el-header height="60px">
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
    <el-main>

      <div class="block" >

        <el-carousel indicator-position="none" height="350px">
          <el-carousel-item v-for="item in imgs" >

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
    <el-footer height="260px">Footer</el-footer>
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
      username:this.$store.getters.getUser.userNickname,
      islogin: this.$store.getters.getUser==null?false:true

    }
  },
  created(){
    this.getList();
  },
  methods:{
    getList:function(){
      var vm = this;
      this.axios({
        method:'GET',
        url: '/product/list'
      }).then(function(resp){
        vm.pros = resp.data;

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
