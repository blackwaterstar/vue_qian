<template>

      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline"><el-form-item> <el-input
          v-model="search1"
          size="max"
          placeholder="输入订单号查询" v-on:input="handleSearch()">
        </el-input></el-form-item>
          <el-form-item>
            <el-input
              v-model="search2"
              size="max"
              placeholder="输入用户id查询" v-on:input="handleSearch()">
            </el-input>

          </el-form-item></el-form>
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
          <el-button class="el-button--danger"   @click="handleEdit(order.orderId)">发货</el-button>
        </div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
          <el-dialog
            title="发货"
            :append-to-body='true'
            :visible.sync="dialogFahuo"
            :before-close="handleClose">
            <el-form-item label="收货人姓名">
              <el-input v-model="ruleForm.orderUser" disabled></el-input>
            </el-form-item>
            <el-form-item label="收货人电话">
              <el-input v-model="ruleForm.orderTel" disabled></el-input>
            </el-form-item>
            <el-form-item label="收货人地址">
              <el-input v-model="ruleForm.orderAddr" disabled></el-input>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="fahuo" type="primary" size="medium">确 定</el-button>
          </span>
          </el-dialog>
        </el-form>
      </div>
</template>

<script>
  export default {
    name: "Orders",
    data(){
      return {
        user:this.$store.getters.getUser,
        orders:[],
        userId:'',
        search1:'',
        search2:'',
        dialogFahuo:false,
        order1:'',
        formInline:{

        },
        ruleForm: {
          orderUser:'',
          orderTel:'',
          orderAddr:''
        },
        orderId:''
      }
    },
    created() {
      this. handleSearch();
    },

    methods: {
      fahuo(){
        let postData = this.qs.stringify({
          orderId: this.orderId,
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/order/updatestatme',
          data: postData
        }).then(response => {
          this.emptyUserData();
        }).catch(error => {
          console.log(error);
        });

      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.emptyUserData();
          })
          .catch(_ => {
          });
      },
      emptyUserData() {
        this.dialogFahuo = false;
        this.ruleForm = {
          orderUser:null,
          orderTel:null,
          orderAddr:null
        };
        this.handleSearch();
      },
      handleEdit(onrderId) {
        this.dialogFahuo = true;
        this.orderId = onrderId;
        let postData = this.qs.stringify({
          orderId: onrderId
        });
        this.axios({
          method: 'post',
          url: '/order/getOrder',
          data: postData
        }).then(response => {
          this.order1 = response.data;
          this.ruleForm.orderUser = this.order1.orderUser,
            this.ruleForm.orderTel = this.order1.orderTel,
            this.ruleForm.orderAddr = this.order1.orderAddr
          console.log(this.order1);

        }).catch(error => {
          console.log(error);
        });

      },
      handleSearch() {
        let postData = this.qs.stringify({
          orderId: this.search1,
          userId: this.search2
        });
        this.axios({
          method: 'post',
          url: '/order/list2',
          data: postData
        }).then(response => {
          this.orders = response.data;
        }).catch(error => {
          console.log(error);
        });

      },
      getData1() {
        var vm = this;
        this.axios({
          method: 'GET',
          url: '/order/list2?userId=' + vm.user.userId
        }).then(function (resp) {
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
    } // }
  }
</script>

<style scoped>

</style>
