<template>
  <div id="exam-new">
    <el-card class="box-card">
      <div slot="header" class="header">
        <el-steps :active="active" finish-status="success" align-left>
          <el-step title="试卷信息"></el-step>
          <el-step title="添加题目"></el-step>
          <el-step title="完成制作"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </div>
      <div class="form">
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
          v-show="this.active == 0"
        >
          <el-form-item label="试卷名称" prop="tpTitle" label-width="80px">
            <el-input type="text" v-model="form.tpTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseName" label-width="80px">
            <el-select v-model="form.courseName" placeholder="请选择课程" @change="selectedCourse">
              <el-option
                v-for="(items,indexs) in courseInfo"
                :key="indexs"
                :value="items.courseName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="paperContent" v-show="active == 1">
          <div class="top" >
            <span style="padding-right:10%;">题目类型</span>
            <el-radio-group v-model="radio" @change="selectedType">
              <el-radio
                v-for="(item,index) in questionType"
                :key="index"
                :label="item.typeName"
              >{{ item.typeName}}</el-radio>
            </el-radio-group>
          </div>
          <div class="questionType">
            <div v-show="choiceQueId==1 && active == 1">
              <single-choice></single-choice>
            </div>
            <div>
              <gap-fill v-show="choiceQueId==2"></gap-fill>
            </div>
            <div>
              <essay-question v-show="choiceQueId==3"></essay-question>
            </div>
            <p @assss="getCourseInfo"></p>
          </div>
        </div>
      </div>
    </el-card>
    <div class="paperDetail" v-if="active!=0">
    <el-card class="box-card" style="text-align:left;margin-top:5%;">
      <h4>一、选择题</h4> 
    </el-card>
    <el-card class="box-card" style="text-align:left;margin-top:5%;">
      <h4>二、填空题</h4> 
    </el-card>
    <el-card class="box-card" style="text-align:left;margin-top:5%;">
      <h4>三、问答题</h4> 
    </el-card>
    </div>
  </div>
</template>
<script>
import SingleChoice from "@/components/AddSingelChoice";
import GapFill from "@/components/AddGapFill";
import EssayQuestion from "@/components/AddEssayQuestion";
import ChoiceDetail from "@/components/ChoiceDetail";
export default {
  components: {
    SingleChoice, //单选组件
    GapFill, //填空组件
    EssayQuestion //问答题组件
  },
  data() {
    return {
      testPaperId:0, //获取当前试卷ID
      choiceQueId: 1, //当前选中问题类型的ID
      active: 0,
      radio: "选择题", //单选组按钮默认选中
      courseInfo: [], //获取课程信息
      questionType: [], //问题类型
      form: {
        tpTitle: "",
        courseName: "",
        tpCourseId: ""
      },
      rules: {
        //验证规则
        testPaperName: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        courseName: [
          { required: true, message: "请选择专业", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getCourseInfo(); //获取所有课程信息
    this.getQuestioType(); //获取所有问题类型
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    /**
     * 获取单选组按钮选中问题类别的ID
     * @param {String} typeName 按钮选中问题类别的ID
     */
    selectedType(typeName) {
      let that = this;
      let index = that.questionType.find(item => {
        return item.typeName == typeName;
      });
      that.choiceQueId = index.typeId; //并赋值给表单对象
     // console.log(that.choiceQueId);
    },
    /**
     * 获取所有课程信息
     */
    getCourseInfo() {
      let that = this;
      that.axios
        .get("Class/GetAllCourse")
        .then(res => {
          //console.log(res.data);
          that.courseInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取所有问题类型
     */
    getQuestioType() {
      let that = this;
      that.axios
        .get("TestPaper/GetQuestionType")
        .then(res => {
          //console.log(res.data);
          that.questionType = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取下拉列表选中课程的ID
     * @param {String} userName 下拉框数据
     */
    selectedCourse(courseName) {
      let that = this;
      let indexs = that.courseInfo.findIndex(
        items => {
          return items.courseName == courseName;
        } //遍历数据得到当前选中课程的下标
      );
      that.form.tpCourseId = that.courseInfo[indexs].courseId; //并赋值给表单对象
      //console.log(that.form.tpCourseId);
    },
    /**
     * 表单提交
     */
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        //console.log(that.form.tpTitle)
        //console.log(that.form.tpCourseId)
        if (valid) {
          that.axios.post("TestPaper/MakeTestPaper",that.form, {
            params:{
              uid:sessionStorage.getItem("uid")
            }
          })
          .then(res =>{
            console.log(res.data)
            if(res.data.code == 1){
              localStorage.setItem('testPaperId',res.data.data.testPaperId)
              that.active=1;
            }
          })
          .catch(err =>{
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
#exam-new {
  .box-card {
    width: 99%;
    .header {
      text-align: left;
    }
    .form {
      .top {
        text-align: left;
      }
    }
  }
}
</style>