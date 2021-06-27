<template>
  <el-container>
    <el-header>
      <el-col :span="12"><div class="grid-content bg-purple" align="left">
        <img src="../assets/logo.png" width="150px" height="50px">
      </div></el-col>
      <el-col v-if="!islogin" :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-button  @click="backhome">返回主页</el-button>
        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
        <el-button plain @click="$router.push('/Login')">登录</el-button>
        <el-button plain>注册</el-button>
      </div></el-col>
      <el-col v-if="islogin" :span="12">
        <div class="grid-content bg-purple-light" align="right">
          <el-button  @click="backhome">返回主页</el-button>
          &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
          <span>欢迎你，{{username}}</span>
          <el-button plain @click="$router.push('/logout')">注销</el-button>
        </div>
        <div class="grid-content bg-purple-light" align="left">
          <el-button  @click="orders1">查看未支付订单</el-button>
        </div>
      </el-col>
    </el-header>
    <el-main>
      <div>
        <div v-for="order in orders">
          <span>订单创建时间：{{order.createdTime}}</span>  <span>订单编号：{{order.orderId}}</span>
          <el-table
            ref="multipleTable"
            :data="order.products"
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
              prop="pname"
              label="商品名称"
              width="420">

            </el-table-column>
            <el-table-column
              prop="price"
              label="商品价格"
              width="120">
            </el-table-column>
            <el-table-column
              prop="pcount"
              label="商品数量"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>

          <h3>订单金额：{{order.orderPrice}}</h3>
          <h2 >已支付</h2>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Orders",
    data(){
      return {
        user:this.$store.getters.getUser,
        orders:[],
        username:this.$store.getters.getUser.userNickname,
        islogin: this.$store.getters.getUser==null?false:true,
      }
    },
    created() {
      this.getData1();
    },
    methods:{
      backhome(){
        this.$router.push("/home");
      },

      orders1(){
        this.$router.push("/orders");
      },
      getData1(){
        var vm = this;
        this.axios({
          method: 'GET',
          url: '/order/list1?userId='+vm.user.userId
        }).then(function(resp){
          vm.orders = resp.data;
          console.log(vm.orders);
        })
      },

      // pay(order){
      //   var d = {
      //     orderId:order.orderId,
      //     orderPrice:order.orderPrice
      //   }
      //   this.$router.push({name:'Pay',params:d})
      // }
    }
  }
</script>

<style scoped>

</style>
