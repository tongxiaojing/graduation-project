<template>
  <div id="user-pass">
    <div slot="header" class="clearfix">
      <h1>修改密码</h1>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="text" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="text" v-model="ruleForm.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    //验证两次输入密码是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "", //旧密码
        newPass: "", //新密码
        checkPass: "" //确认密码
      },
      rules: {
        oldPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 8,
            message: "长度在 6 到 8 个字符",
            trigger: ["blur", "change"]
          }
        ],
        newPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 8,
            message: "长度在 6 到 8 个字符",
            trigger: ["blur", "change"]
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /**
     *修改密码提交表单
     *@param {Object} formName 表单对象
     **/
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that
            .$confirm("是否确认修改密码？", "是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              that.axios
                .get("User/ModifyPassword", {
                  params: {
                    uid: sessionStorage.getItem("uid"), //携带用户ID
                    oldPassword: that.ruleForm.oldPass, //旧密码
                    newPassword: that.ruleForm.newPass //新密码
                  }
                })
                .then(res => {
                  //根据返回的code值判断当前请求状态
                  console.log(res.data)
                  switch (res.data.code) {
                    case -1: //code=-1 系统异常
                      that.$message({
                        type: "warning",
                        message: "系统异常"
                      });
                      break;
                    case -2: // code=-2 参数错误
                      that.$message({
                        type: "warning",
                        message: "参数错误"
                      });
                      break;
                      case -3: //code=0 数据没有任何变化
                      that.$message({
                        type: "warning",
                        message: "旧密码错误"
                      });
                      break;
                    case 0: //code=0 数据没有任何变化
                      that.$message({
                        type: "info",
                        message: "数据没有任何变化"
                      });
                      break;
                    case 1: //code=1 成功
                      that.$message({
                        type: "success",
                        message: "修改成功,请重新登陆!"
                      });
                      that.$router.push("/");
                      break;
                    default:
                      break;
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(err => {
              that.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      that.$refs[formName].resetFields();
    }
  }
};
</script>
