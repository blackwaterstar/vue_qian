<template>
  <div id="background">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
  <h3 class="register-title">注册界面</h3>
  <el-form-item label="账号" prop="userTel" >
    <el-input v-model="ruleForm.userTel" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确定密码"></el-input>
  </el-form-item>
<!--  <el-form-item label="年龄" prop="age">-->
<!--    <el-input v-model.number="ruleForm.age"></el-input>-->
<!--  </el-form-item>-->
  <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="returnLogin()">返回登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userTel:'',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules: {
          userTel: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度必须是11个数字', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
              method: 'POST',
              url: '/user/register',
              date:{
                username:this.ruleForm.userTel,
                password:this.ruleForm.pass,
                email:this.ruleForm.email
              }
            }).then(function(resp){
              var result = resp.data;
              if(result==true){
                console.log('注册成功');
                this.$router.push("/login");
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returnLogin(){
        this.$router.push('/login')
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
  .demo-ruleForm{
    width: 400px;
    margin: 150px auto;
    border: #DCDFE6 solid 1px;
    padding:30px 40px 20px 20px;
    border-radius:20px;
    box-shadow: 0px 0px 20px #DCDFE6;
  }
  .register-title{
    text-align: center;
    margin-bottom:20px;
    color: papayawhip;
    font-size: 30px;
  }
</style>

