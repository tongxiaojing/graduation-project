<template>
  <el-main>
    <el-form :label-width="labelWidth" class="demo-dynamic input" :model="eassyForm" ref="eassyForm" :rules='rules'>
      <el-form-item
        label="题干"
        prop="questionTitle"
      >
        <el-input type="textarea" v-model="eassyForm.questionTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="参考答案"
        prop="answerQuestion.aqAnswer"
      >
        <el-input type="textarea" v-model="eassyForm.answerQuestion.aqAnswer" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="eassyForm.tpqScore" :min="5" :max="15" style="margin-right:10px;"></el-input-number>
        <el-button type="primary" @click="submitForm('eassyForm')" icon="el-icon-document-checked">保存</el-button>
        <el-button @click="resetForm('eassyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      labelWidth: "120px",
      //验证规则
      rules: {
        questionTitle: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        answerQuestion: {
          aqAnswer: [
            { required: true, message: "请输入参考答案", trigger: "blur" }
          ]
        }
      },
      tpqPaperId: localStorage.getItem("testPaperId"), //试卷主键编号
      eassyForm: {
        tpqScore: 5, //分值
        questionTitle: "", //题目的标题
        questionTypeId: 3, //题目的类型 1=选择题 2=填空题 3=问答题
        answerQuestion: {
          aqAnswer: "" //问答题的答案
        }
      },
       resetEassy: { //用于重置
        tpqScore: 5,
        questionTitle: "",
        questionTypeId: 3,
        answerQuestion: {
          aqAnswer: ""
        }
      }
    };
  },
  methods: {
    /**
     * 提交题目信息
     * @param {Object} formName 表单对象
     */
    submitForm(formName) {
      let that=this
      this.$refs[formName].validate(valid => {
        if (valid) {
            that.axios
              .post("TestPaper/AddQuestionToTestPaper", {
                tpqPaperId: localStorage.getItem("testPaperId"),
                tpqQuestion: that.eassyForm,
                tpqScore: 5 //分值
              })
              .then(res => {
                console.log(res.data.data)
                if (res.data.code == 1) {
                  that.$emit('savedEassy',res.data.data)
                  let resetEassy = JSON.parse(JSON.stringify(that.resetEassy));
                  that.eassyForm = resetEassy; //提交成功之后重置表单
                  that.$message.success("新增成功");
                }
              })
              .catch(err => {
                console.log(err);
              });
        } else {
          that.$message.warning("请输入有效的题目信息！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 重置表单
     * @param {Object} formName 表单对象
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>