<template>
  <div id="background">
<!--    <div>-->
      <el-form ref="form"  :rules="rules" :model="form" label-width="80px" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="userTel" >
          <el-input v-model="form.userTel" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="userPwd">
<!--          <el-input v-model="form.userPwd" placeholder="请输入密码"></el-input>-->
          <el-input placeholder="请输入密码" v-model="form.userPwd" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
          <el-button type="primary" @click="Register()">注册</el-button>
<!--          <router-link to="/register">注册</router-link>-->
        </el-form-item>

      </el-form>
<!--    </div>-->

    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
          return {
            form: {
              userTel: '',
              userPwd: ''
            },
            rules:{
              userTel: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 11, max: 11, message: '长度必须是11个数字', trigger: 'blur' }
              ],
              userPwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
              ]
            }
          }
        },
        methods:{
          Register()
          {

            this.$router.push("/register")
          },
          onSubmit(formName){
            var vm = this;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                //表单验证成功，要发送登录请求
                this.axios({
                  method: 'GET',
                  url: '/user/login?userTel='+vm.form.userTel+'&userPwd='+vm.form.userPwd
                }).then(function(resp){



                  if(resp.data.result){


                    var user = resp.data.data;
                    sessionStorage.setItem("isLogin","true")
                    //往vuex里存放一个user对象
                    //先要有user对象
                    //再存到vuex里
                    vm.$store.dispatch('asyncUpdateUser', user);



                    //再在home.vue里获取vuex对象里的user对象的内容。

                    vm.$message({
                      message: resp.data.message,
                      type: 'success'
                    });
                    setTimeout(function(){

                      vm.$router.push("/home");

                    },2000)
                  }else{
                    vm.$message.error(resp.data.message);
                  }

                })

              } else {
                this.$message({
                  message: '电话号码或密码不能为空！',
                  type: 'warning'
                });
                return false;
              }
            });


          }

        }
    }
</script>

<style scoped>
  #background{
    width: 100%;
    height: 100%;
    background: url("../assets/bg4.jpg");
    background-size:100% 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .login-box{
    width: 400px;
    margin: 150px auto;
    border: #DCDFE6 solid 1px;
    padding:30px 40px 20px 20px;
    border-radius:20px;
    box-shadow: 0px 0px 20px #DCDFE6;
  }
  .login-title{
    text-align: center;
    margin-bottom:20px;
    color: papayawhip;
    font-size: 30px;
  }
</style>
