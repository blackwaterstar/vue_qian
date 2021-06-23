<template>
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
        <el-button class="el-button--danger" @click="pay(order)">支付</el-button>

      </div>
    </div>
</template>

<script>
export default {
    name: "Orders",
  data(){
      return {
        user:this.$store.getters.getUser,
        orders:[]
      }
  },
  created() {
      this.getData();
  },
  methods:{
      getData(){
        var vm = this;
        this.axios({
          method: 'GET',
          url: '/order/list?userId='+vm.user.userId
        }).then(function(resp){
          vm.orders = resp.data;
        })
      },
    pay(order){
        var d = {
          orderId:order.orderId,
          orderPrice:order.orderPrice
        }
        this.$router.push({name:'Pay',params:d})
    }
  }
}
</script>

<style scoped>

</style>
