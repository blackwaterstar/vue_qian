<template>
  <el-container>
<!--    <el-header height="60px">-->
<!--      <el-col :span="12">-->
<!--        <div class="grid-content bg-purple" align="left">-->
<!--          <img src="../assets/logo.png" width="150px" height="50px">-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <div class="grid-content bg-purple-light" align="right">-->
<!--          <el-button plain @click="this.$router.push('/login')">登录</el-button>-->
<!--          <el-button plain>注册</el-button>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-header>-->
    <el-header height="60px">
      <el-col :span="12"><div class="grid-content bg-purple" align="left">
        <img src="../assets/logo.png" width="150px" height="50px">
      </div></el-col>
      <el-col v-if="!islogin" :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-button  @click="backhome">返回主页</el-button>
        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
        <el-button plain @click="$router.push('/Login')">登录</el-button>
        <el-button plain>注册</el-button>
      </div></el-col>
      <el-col v-if="islogin" :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-button  @click="backhome">返回主页</el-button>
        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
        <span>欢迎你，{{username}}</span>
        <el-button plain @click="$router.push('/logout')">注销</el-button>
      </div></el-col>

    </el-header>
    <el-main>

      <!--商品图片及名字、价格-->

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple proimg">

            <img class="proimg" :src="pro.pimg"/>

          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">

            <el-row class="sc">
              <el-col :span="6">
                <div align="right" class="grid-content bg-purple">
                  <span class="sc_txt">商品名称</span>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <span class="sc_txt">{{pro.pname}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="sc">
              <el-col :span="6">
                <div align="right" class="grid-content bg-purple">
                  <span class="sc_txt">商品价格</span>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <span class="sc_txt">{{pro.price}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="sc">
              <el-col :span="6">
                <div align="right" class="grid-content bg-purple">
                  <span class="sc_txt">商品数量</span>
                </div>
              </el-col>
              <el-col :span="18">
                <div align="center" style="margin-left:20px;margin-bottom: 250px" class="grid-content bg-purple-light">
                  <el-input style="width:100px;" v-model="count"></el-input>
                </div>


              </el-col>
            </el-row>
            <el-row  style="margin-top: 220px"  class="sc">
              <el-col :span="24">
                <div>
                  <el-button type="danger" @click="gtCart()">加入购物车</el-button>
                </div>
              </el-col>

            </el-row>

          </div>
        </el-col>

      </el-row>


      <!--商品详情-->

      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">


          </div>
        </el-col>
      </el-row>


    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ProductInfo",
  data() {
    return {
      // pid: this.$route.params.pid,
      pid: this.$route.query.pid,
      pro: {
       // pimg:''
        pimg:this.$route.query.pimg
      },
      count: 1,
      username:this.$store.getters.getUser.userNickname,
      islogin: this.$store.getters.getUser==null?false:true
    }

  },
  created() {
    this.getProduct();
  },
  methods: {

    backhome(){
      this.$router.push("/home");
    },


    getProduct() {
      var vm = this;
      let postData1 = vm.qs.stringify({
        pid:vm.pid
      });
      this.axios({
        method: 'POST',
        url: '/product/getProductById',
        data: postData1
      }).then(function (resp) {
        vm.pro = resp.data;
      })
    },


    gtCart() {
      this.$confirm('加入购物车, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = this.qs.stringify({
          userId: this.$store.getters.getUser.userId,
          pid: this.pro.pid,
          pcount: this.count
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/cart/addCart1',
          data: postData
        }).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.push("/cart")
          //console.log(response);
        }).catch(error => {
          console.log(error);
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        });
      });
    }
    //
    // gtCart: function () {
    //   var p = {
    //     userId: this.$store.getters.getUser.userId,
    //     pid: this.pro.pid,
    //     pcount: this.count
    //   };
    //   this.$router.push({name: 'Cart', params: p});
    //
    //
    //
    // }
  }
}
</script>

<style scoped>
  .sc_txt {
    font-family: "微软雅黑";

  }

  .sc .el-col {
    padding: 0px;
    height: 50px;
  }

  .sc .el-col h3 {
    padding: 0px;
    height: 40px;
  }

  .sc .el-col div {
    padding: 0px;
    height: 40px;
  }

  .proimg {
    width: 400px;
    height: 500px;
  }

  .el-header, .el-footer {
    margin-top: 10px;
    background-color: #ffffff;
    color: #333;
    text-align: center;

  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }


</style>
