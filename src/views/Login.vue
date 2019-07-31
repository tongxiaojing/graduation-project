<template>
<div id="bg">
  <div id="login">
    <el-form status-icon  class="demo-ruleForm" >
      <el-form-item>
        <h1>教学管理系统</h1>
      </el-form-item>
      <el-form-item prop="UserInfo" :rules="[
      { required: true, message: '账号不能为空！'}]">
        账号:
        <el-input type="text" autocomplete="off" v-model="loginForm.userMobile" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="Userpassword" :rules="[
      { required: true, message: '密码不能为空！'}]">
        密码:
        <el-input type="password" autocomplete="off" v-model="loginForm.userPassword" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="medium">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
import Cookie from '../util/Cookie.js'
import Base64 from '../util/Base64.js'
export default {
  data() {
    return {
      checked: false,
      userToken: '',
      loginForm: {
      userMobile: "",
      userPassword: ""
      }
    };
  },
  created(){
    let mobile = Base64.decode(Cookie.getCookie('mobile'))
    let pass = Base64.decode(Cookie.getCookie('pass'))
    console.log(mobile)
    console.log(pass)
      this.loginForm.userMobile = mobile;
      this.loginForm.userPassword = pass;
  },
  methods: {
    submitForm: function() {
      let that= this;
      that.axios.get("/OAuth/authenticate",
      {
        params:{
          userMobile:that.loginForm.userMobile,
          userPassword:that.loginForm.userPassword
        }
      })
      .then(res => {
        console.log(res)
        that.$router.push('/home');
        that.userToken = 'Bearer ' + res.data.access_token;
          this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        });
        if(this.checked){
        Cookie.setCookie('mobile',Base64.encode(this.loginForm.userMobile),{maxAge:60*60})
        Cookie.setCookie('pass',Base64.encode(this.loginForm.userPassword),{maxAge:60*60})
      }
      })
      .catch(error =>{
        console.log(error)
        this.$message({
          message: '账户名或者密码错误，登录失败',
          type: 'warning'
        });
      })
    }
  }
};
</script>
<style scoped lang="less">
#bg{
  position:absolute;
  background-image:url('../assets/bg.jpg');
  width:100%;
  height:100%;
  background-size: cover;
  background-repeat: no-repeat;
}
#login {
  border-radius: 5px;
  width: 360px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(116, 198, 236, 0.5);
  /deep/.el-form {
    padding-left: 20px;
    width: 320px;
  }
}
@media screen and(max-width:560px) {
  #login {
    width: 280px;
    /deep/.el-form {
      width: 230px;
    }
  }
}
</style>
