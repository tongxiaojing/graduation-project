<template>
  <el-main>
    <el-form :label-width="labelWidth" class="demo-dynamic input" :model="form" ref="form">
      <el-form-item
        label="题干"
        prop="questionTitle"
        :rules="{
          required: true, message: '题干不能为空', trigger: 'blur'
    }"
      >
        <el-input type="textarea" v-model="form.questionTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="参考答案"
        prop="aqAnswer"
        :rules="{
          required: true, message: '参考答案不能为空', trigger: 'blur'
      }"
      >
        <el-input type="textarea" v-model="form.answerQuestion.aqAnswer" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="tpqScore" :min="5" :max="15" style="margin-right:10px;"></el-input-number>
        <el-button type="primary" @click="submitForm('form')" icon="el-icon-document-checked">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      labelWidth: "120px",
      tpqPaperId: localStorage.getItem("testPaperId"), //试卷主键编号
      tpqScore: 5, //分值
      form: {
        questionTitle: "", //题目的标题
        questionTypeId: 3, //题目的类型 1=选择题 2=填空题 3=问答题
        answerQuestion: {
          aqAnswer: "" //问答题的答案
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
      console.log("1111");
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