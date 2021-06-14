<template>
  <el-container>



    <el-header height="60px">
      <el-col :span="12"><div class="grid-content bg-purple" align="left">
        <img src="../assets/logo.png" width="150px" height="50px">
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-button plain>登录</el-button>
        <el-button plain>注册</el-button>
      </div></el-col>
    </el-header>
    <el-main>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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

      <div align="left" style="margin:10px">
        <span>订单金额：</span>
        <span>{{totalMoney}}</span>
      </div>

      <div>
        <h3>收货信息</h3>
        <el-form ref="form" label-width="80px">
          <el-form-item label="收件人">
            <el-input v-model="orderUser"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="orderTel"></el-input>
          </el-form-item>
          <el-form-item label="收件地址">
            <el-input v-model="orderAddr"></el-input>
          </el-form-item>

        </el-form>
      </div>



      <div style="margin-top: 20px">
        <el-button class="el-button--danger" @click="createOrder">提交订单</el-button>
        <el-button class="el-button--success" @click="">返回</el-button>
      </div>



    </el-main>
  </el-container>

</template>

<script>

import Qs from 'qs'

export default {
    name: "Cart",
  data() {
    return {
      tableData: [{
        pname: 'HUAWEI P30',
        price: '6778',
        pcount: 2
      }, {
        pname: 'IPHONE X',
        price: '5778',
        pcount: 3
      },{
        pname: 'NOTE3',
        price: '3778',
        pcount: 1
      }],
      userId: this.$route.params.userId,
      pid: this.$route.params.pid,
      pcount: this.$route.params.pcount,
      multipleSelection: [],
      totalMoney:0,
      orderUser:'',
      orderTel:'',
      orderAddr:''

    }
  },
  created(){
    this.getTableDate();

  },
  methods: {

    createOrder(){
        var orderData = {
          userId:this.userId,
          orderPrice:this.totalMoney,
          orderUser:this.orderUser,
          orderTel:this.orderTel,
          orderAddr:this.orderAddr,
          pids:[]
        }
        //获取选中的每一行的商品的id
      var i=0;
      this.multipleSelection.forEach(row => {

        orderData.pids[i] =  row.pid;
        i++;
      })
      // console.log(orderData);
      //发送请求
      var vm = this;
      this.axios({
        method: 'POST',
        url: 'http://localhost/order/addOrder',
        transformRequest: [function (data) {
          return Qs.stringify(data)
        }],
        data:orderData

      }).then(function(resp){

        if(resp.data.result){
          vm.$message({
            message: resp.data.message,
            type: 'success'
          });
          setTimeout(function(){

            vm.$router.push("/orders");

          },2000)
        }else{
          vm.$message.error(resp.data.message);
        }


      })

    },
    handleSelectionChange(val){
      //当多选框变化是调用的函数
      this.totalMoney = 0;
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
      this.multipleSelection.forEach(row => {
        //获取选中的每一行的数据
        // console.log(row);

         this.totalMoney += row.price*row.pcount;


      })
    },

    getTableDate(){

      var vm = this;

      this.axios({

        method:'GET',
        url: '/cart/addCart?userId='+vm.userId+'&pid='+vm.pid+'&pcount='+vm.pcount

      }).then(function(resp){
        vm.tableData = resp.data
      })

    }


  }
}
</script>

<style scoped>

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
    background-color: #fff;
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
