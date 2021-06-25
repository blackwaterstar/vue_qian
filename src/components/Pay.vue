<template>
    <div>
      <h3>您的当前余额：</h3>
      <h4>{{userAmount}}</h4>
      <h4>是否使用余额支付</h4>
      <div v-if="isAmountEnough">

        <el-radio  v-model="isUseAmount" label="1">使用余额支付</el-radio>
        <el-radio v-model="isUseAmount" label="2">不使用余额支付</el-radio>
        <el-button class="el-button--danger" type="primary" @click="paymoney">支付</el-button>
      </div>
      <div v-else>
        <h5>余额不足，请使用微信支付</h5>
        <el-button class="el-button--danger" @click="isUseAmount=2">微信支付</el-button>
      </div>

      <div v-if="isUseAmount==2">

        <img :src="wxpayimgurl">

      </div>
      {{isUseAmount}}
      {{orderId}}
      {{orderPrice}}
    </div>
</template>

<script>
export default {
    name: "Pay",
  data(){
      return {
        userAmount: 0,
        isUseAmount:'0',
        userId:this.$store.getters.getUser.userId,
        user:{},
        orderId:this.$route.params.orderId,
        orderPrice:this.$route.params.orderPrice,
        isAmountEnough:true,
        wxpayimgurl:''


    }
  },
  created(){
      this.user = this.$store.getters.getUser;
      this.getData();

  },
  mounted(){
    var mychannel = this.orderId+"";
    this.wxpayimgurl = '/wxpay/doPay?orderId='+this.orderId+'&orderPrice='+this.orderPrice;
    console.log(this.wxpayimgurl);
    var goEasy = new GoEasy({
      appkey: 'BC-13372467cbde47cb8fa70538dbab4755'
    });
    goEasy.subscribe({
      channel:mychannel,
      onMessage: function(message){
        alert('收到：'+message.content);
      }
    });
  },
  methods:{

    /**
     * 根据 userId 批量删除用户
     */
    paymoney() {
      // let tuIds = "";
      // this.multipleSelection.forEach(item => {
      //   tuIds += item.tpId + ',';
      //
      // })
      // console.log(tuIds);
      // let userIds= this.multipleSelection.map(item => item.userId).join()

      this.$confirm('支付操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = this.qs.stringify({
          userId:this.userId,
          orderId:this.orderId,
          orderPrice:(this.userAmount-this.orderPrice),
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/userwallet/paymoney',
          data: postData
        }).then(response => {
          // this.getRowCount();
          // if (this.total % 10 == 1 && this.currentPage >= 1) {
          //   if (this.total / 10 < this.currentPage) {
          //     this.currentPage = this.currentPage - 1;
          //   }
          // }
          // this.handlePageChange();
          this.$message({
            type: 'success',
            message: '支付成功!'
          });
        this.$router.push("/home");
          //console.log(response);
        }).catch(error => {
          console.log(error);
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消支付'
        });
      });
    },




    getData(){

        var vm = this;
        this.axios({
          method : 'GET',
          url: '/userwallet/wallet?userId='+vm.user.userId


        }).then(function(resp){
          vm.userAmount = resp.data.userAmount;
          if(vm.userAmount<vm.orderPrice){
            vm.isAmountEnough = false;
          }
        })
      }

  }

}
</script>

<style scoped>

</style>
