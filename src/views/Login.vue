<template>
  <div id="user-login">
    <div id="login">
      <el-form status-icon class="login-ruleForm" :rules="rules" ref="loginForm" :model="loginForm">
        <el-form-item>
          <h1>教学管理系统</h1>
        </el-form-item>
        <el-form-item prop="userMobile">
          账号:
          <el-input type="text" autocomplete="off" v-model="loginForm.userMobile" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          密码:
          <el-input
            type="password"
            autocomplete="off"
            v-model="loginForm.userPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" size="medium" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookie from "@/util/Cookie.js";
import Base64 from "@/util/Base64.js";
export default {
  data() {
    return {
      loading:false,//记住图标状态
      checked: false,//记住登录状态
      userToken: "",//存储令牌
      uid:'',//存储用户Id
      loginForm: {//存储表单提交数据
        userMobile: "",//用户账号
        userPassword: ""//用户密码
      },
      rules: {
        userMobile: [{ required: true, message: '请输入电话号码', trigger: 'blur'}],//离开时验证输入框是否为空
        userPassword: [{ required: true, message: '请输入密码', trigger: 'blur'}]
      }
    };
  },
  methods: {
    /**
     * 登录表单的验证
     * @param {Object} formName 表单对象
     */
    submitForm(formName) {
      let that = this;//保存当前this的指向
      that.loading=true;//改变当前按钮状态
      that.axios
        .get("OAuth/authenticate", {
          params: {//把用户信息传向后台
            userMobile: that.loginForm.userMobile,
            userPassword: that.loginForm.userPassword
          }
        })
        .then(res => {
          console.log(res.data)
          that.loading=false;//登录按钮状态应改为可用
          that.$router.push("/home");//登陆成功之后跳转至主页面
          that.userToken = res.data.token_type +' '+ res.data.access_token;//将后台返回的令牌存储起来
          that.uid = res.data.profile.userUid //后台返回用户Id
          sessionStorage.setItem('token',that.userToken)//存储操作
          sessionStorage.setItem('uid',that.uid)
          sessionStorage.setItem('user',res.data.profile.userName)
          this.$message({
            message: "登录成功",
            type: "success"
          });
          if (that.checked) {//如果用户勾选记住密码时，将用户名还有密码进行加密并存储在cookie中
            Cookie.setCookie(
              "mobile",
              Base64.encode(that.loginForm.userMobile),//加密操作
              { maxAge: 60*60*60*24 }//设置存储时长
            );
            Cookie.setCookie(
              "pass",
              Base64.encode(that.loginForm.userPassword),
              { maxAge: 60*60*60*24 }//设置存储时长
            );
          }else{
            //当用户勾选不记住密码时，清除cookie里面的值
            Cookie.removeCookie('mobile')
            Cookie.removeCookie('pass')
          }
        })
        .catch(error => {
          console.log(error);
          that.loading=false;//登录按钮状态应改为可用
          that.$message({
            message: "账户名或者密码错误，登录失败",
            type: "warning"
          });
        });
    }
  },
  created() {
    //当用户记住密码时，将cookie里面的值赋值给表单，不需用户再次操作
    if(Cookie.getCookie("mobile") && Cookie.getCookie("pass")){
      this.checked=true;//按钮应为选中状态
      let mobile = Base64.decode(Cookie.getCookie("mobile"));//获取存储的cookie并进行解密
      let pass = Base64.decode(Cookie.getCookie("pass"));
      this.loginForm.userMobile = mobile;//将解密后的的值赋给表单
      this.loginForm.userPassword = pass;
    }
   
  }
};
</script>
<style scoped lang="less">
#user-login {
  position: absolute;
  background-image: url("../assets/hua.jpg");
  width: 100%;
  height: 100%;
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
  // 当使用element-ui时无法覆盖样式，就使用/deep/进行深度覆盖
  /deep/.el-form {
    padding-left: 20px;
    width: 320px;
  }
}
//使用媒体查询实现调整
@media screen and(max-width:560px) {
  #login {
    width: 280px;
    /deep/.el-form {
      width: 230px;
    }
  }
}
</style>
