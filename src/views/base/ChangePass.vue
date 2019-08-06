<template>
  <div id="user-pass">
    <h1>修改密码</h1>
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
        oldPass: "",
        newPass: "",
        checkPass: ""
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
       // checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
        let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
        that.$confirm('是否确认修改密码？', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            that.axios
            .get("/User/ModifyPassword",{
                params:{
                    uid:sessionStorage.getItem('uid'),
                    oldPassword:that.ruleForm.oldPass,
                    newPassword:that.ruleForm.newPass
                }
            })
            .then(res =>{
                console.log(res)
                // that.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            })
            .catch(error =>{
                console.log(error)
            })
         
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      that.$refs[formName].resetFields();
    }
  }
};
</script>
