<template>

  <div>
    <el-button  @click="backhome">返回主页</el-button>
    <h3>您的当前余额：</h3>
    <h4>{{userAmount}}</h4>

    <el-button type="text" @click="dialogFormVisible = true">充值</el-button>

    <el-dialog title="充值" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emptyUserData()">取 消</el-button>
        <el-button type="primary" @click="topUp()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Pay",
    data(){
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          money: '',
        },
        formLabelWidth: '120px',
        userId:this.$store.getters.getUser.userId,
        user:{},
        userAmount:'',
        dialogAdd: false
      }
    },
    created(){
      this.user = this.$store.getters.getUser;
      this.getData();

    },
    mounted(){
    },
    methods:{
      backhome(){
        this.$router.push("/home");
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
      /**
       * 清空绑定数据
       */
      emptyUserData() {
        this.dialogAdd = false;
        this.form = {
          money: null
        };
      },
      topUp() {
        if (this.form.money== null) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          userId :this.user.userId,
          userAmount:this.form.money
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/userwallet/topUp',
          data: postData
        }).then(response => {
          this.$message({
            type: 'success',
            message: '充值成功!'
          });
          this.emptyUserData();
          this.dialogFormVisible = false;
          this.$router.go(0);
        }).catch(error => {
          console.log(error);
        });
      },


      getData(){

        var vm = this;
        this.axios({
          method : 'GET',
          url: '/userwallet/wallet?userId='+vm.user.userId
        }).then(function(resp){
          vm.userAmount = resp.data.userAmount;
        })
      }

    }

  }
</script>

<style scoped>

</style>
