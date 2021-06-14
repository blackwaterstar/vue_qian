<template>
    <div>
      <h3>您的当前余额：</h3>
      <h4>{{userAmount}}</h4>
      <h4>是否使用余额支付</h4>
      <div v-if="isAmountEnough">

        <el-radio  v-model="isUseAmount" label="1">使用余额支付</el-radio>
        <el-radio v-model="isUseAmount" label="2">不使用余额支付</el-radio>
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
