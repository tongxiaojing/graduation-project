<template>
  <el-main>
    <el-form
      :label-width="labelWidth"
      class="demo-dynamic input"
      :rules="rules"
      :model="form"
      ref="form"
    >
      <el-form-item label="题干" prop="questionTitle">
        <el-input type="textarea" v-model="form.questionTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        class="textData"
        v-for="(items,indexs) in form.chooseQuestion"
        :key="indexs"
        :prop="'chooseQuestion.' + indexs + '.cqOption'"
        :rules="{
          required: true, message: '选项不能为空', trigger: 'blur'
        }"
      >
        <el-checkbox v-model="items.cqIsRight">{{ options[indexs] }}</el-checkbox>
        <el-input v-model="items.cqOption" style="width:80%;"></el-input>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="Delete(items.indexs)"
          style="margin-left:10px;"
          :disabled="form.chooseQuestion.length<3"
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="form.tpqScore" :min="2" :max="10" style="margin-right:10px;"></el-input-number>
        <el-button type="info" @click="AddForm" :disabled="form.chooseQuestion.length >5">增加更多</el-button>
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
      labelWidth: "100px",
      options: ["A", "B", "C", "D", "E", "F"], //选项
      form: {
        tpqScore: 5, //分值
        questionTitle: "", //题目的标题
        questionTypeId: 1, //题目的类型 1=选择题 2=填空题 3=问答题
        chooseQuestion: [
          {
            cqOption: "", //选项内容
            cqIsRight: false //是否为正确答案 true:正确答案 false：不是
          },
          {
            cqOption: "",
            cqIsRight: false
          },
          {
            cqOption: "",
            cqIsRight: false
          },
          {
            cqOption: "",
            cqIsRight: false
          }
        ]
      },
      reForm: {
        //添加成功之后重置表单
        tpqPaperId: localStorage.getItem("testPaperId"), //试卷主键编号
        tpqScore: 5, //分值
        questionTitle: "", //题目的标题
        questionTypeId: 1, //题目的类型 1=选择题 2=填空题 3=问答题
        chooseQuestion: [
          {
            cqOption: "", //选项内容
            cqIsRight: false //是否为正确答案 true:正确答案 false：不是
          },
          {
            cqOption: "",
            cqIsRight: false
          },
          {
            cqOption: "",
            cqIsRight: false
          },
          {
            cqOption: "",
            cqIsRight: false
          }
        ]
      },
      //验证规则
      rules: {
        questionTitle: [
          { required: true, message: "请输入题干信息", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /**
     * 提交题目信息
     * @param {Object} formName 表单对象
     */
    submitForm(formName) {
      //console.log(typeof formName);
      let that = this;
      let right = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.form.chooseQuestion.forEach(item => {
            if (item.cqIsRight) {
              right = true;
            }
          });
          if (right) {
            that.axios
              .post("TestPaper/AddQuestionToTestPaper", {
                tpqPaperId: localStorage.getItem("testPaperId"),
                tpqQuestion: that.form,
                tpqScore: 5 //分值
              })
              .then(res => {
                //console.log(res.data.data);
                //console.log(res.data.code);
                if (res.data.code == 1) {
                  that.$emit('saved',res.data.data)
                  let reChoice = JSON.parse(JSON.stringify(that.reForm));
                  that.form = reChoice; //提交成功之后重置表单
                  that.$message.success("新增成功");
                
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            that.$message.warning("至少勾选一个答案！");
          }
        } else {
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
    },
    /**
     * 点击添加一个输入框
     */
    AddForm() {
      this.form.chooseQuestion.push({
        index: this.form.chooseQuestion.length,
        cqOption: ""
      });
      console.log(this.form.chooseQuestion);
    },
    /**
     * 点击删除
     * @param {Number} indexs 索引
     */
    Delete(indexs) {
      this.form.chooseQuestion.splice(indexs, 1);
      for (let i in this.chooseQuestion) {
        this.chooseQuestion[i].indexs = i;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.input {
  width: 90%;
  margin: 0 auto;
  .textData {
    /deep/ .el-form-item__content {
      display: flex !important;
      justify-content: space-around;
      margin-left: 43px !important;
    }
  }
}
</style>