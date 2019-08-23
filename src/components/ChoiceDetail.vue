<template>
  <div id="choiceForm">
    <div class="onlyRead">
      <div slot="header">
        <h3>
          一、选择题（本题共{{ choiceInfo.length }}道小题，共
          <a>5</a>分）
        </h3>
      </div>
      <!-- 非编辑状态 -->
      <div v-for="(item,index) in choiceInfo" :key="index">
        <template v-if="item.editShow">
          <el-form label-width="100px" class="demo-dynamic ">
            <el-form-item class="title">
              <span>{{index+1}}、</span>
              {{item.tpqQuestion.questionTitle}}
              <el-input-number :min="2" :max="10" v-model="item.tpqScore"></el-input-number>
            </el-form-item>
            <el-form-item v-for="(option,indexs) in item.tpqQuestion.chooseQuestion" :key="indexs">
              <el-checkbox disabled :checked="option.cqIsRight">{{liList[indexs]}}、</el-checkbox>
              <span>{{option.cqOption}}</span>
            </el-form-item>
            <el-form-item>
              <el-button @click="editQuestion(item,index,1)" round v-show="item.editShow">编辑</el-button>
            </el-form-item>
          </el-form>
        </template>
        <!-- 编辑状态 -->
        <template v-if="!item.editShow">
          <el-form ref="editInfo" label-width="100px" class="demo-dynamic input">
            <el-form-item class="title">
              <span>{{index+1}}、</span>
              <el-input v-model="item.tpqQuestion.questionTitle" type="textarea"></el-input>
            </el-form-item>
            <el-form-item v-for="(option,indexs) in item.tpqQuestion.chooseQuestion" :key="indexs">
              <el-checkbox 
              v-model="option.cqIsRight"
              >
              {{liList[indexs]}}、
              </el-checkbox>
              <el-input v-model="option.cqOption"></el-input>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.prevent="removeOption(index,indexs)"
                v-show="item.tpqQuestion.chooseQuestion.length>2"
              ></el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelChange(item,index,1)" round>取消</el-button>
              <el-button
                @click="addOptions(item,index)"
                round
                type="primary"
                :disabled="item.tpqQuestion.chooseQuestion.length>=liList.length"
              >新增选项</el-button>
              <el-button @click="saveChange(item,index)" round>保存修改</el-button>
              <el-button @click="delectOptions(item,index)" round type="danger">删除题目</el-button>
            </el-form-item>
          </el-form>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["choiceData"],
  data() {
    return {
      liList: ["A", "B", "C", "D", "E", "F"],
      choiceInfo: [], //接收父组件传过来的单选题数据
      editInfo: [] //编辑时的数据
    };
  },
  created() {
    console.log(this.choiceData);
    if(this.choiceData){
      this.choiceInfo = JSON.parse(JSON.stringify(this.choiceData));//初始状态的数组
      this.editInfo = JSON.parse(JSON.stringify(this.choiceData));//编辑状态的数组，用于保存最初值
    }
  },
  methods: {
    /**
     * 控制编辑或者是预览状态
     * @param {Object} data 题目对象
     * @param {Number} index 数据下标
     */
    editQuestion(data,index){
      let that=this;
      that.editInfo = JSON.parse(JSON.stringify(that.editInfo));
      console.log(that.editInfo)
      // 强制Vue 实例重新渲染
      console.log(data)
      data.editShow=false;
      that.$forceUpdate();
    },
    /**
     * 取消编辑
     * @param {Number} index 索引
     * @param {Number} data 当前选中编辑题对象
     */
    cancelChange(data,index){
      let that=this;
      data.editShow=true;
      that.choiceInfo[index]=that.editInfo[index];
      //强制vue实例重新渲染
      that.$forceUpdate();
    },
      /**
     * 新增选项
     * @param {Object} data 题目对象
     * @param {Number} index 数据下标
     */
    addOptions(data, index) {
      let that = this;
      data.tpqQuestion.chooseQuestion.push({
        cqOption: "",
        cqIsRight: false
      });
    },
    /**
     * 删除选项
     * @param {Number} index 下标索引
     */
    removeOption(index,indexs){
      let that=this;
      that.choiceInfo[index].tpqQuestion.chooseQuestion.splice(indexs, 1);
    },
    /**
     * 删除题目
     * @param {Object} data 题目对象
     * @param {Number} index 数据下标
     */
    delectOptions(data, index, id) {
      let that = this;
      console.log(data.tpqQuestionId);
      that
        .$confirm("此操作将删除题目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .post("TestPaper/RemoveQuestionFromTestPaper", null, {
              params: {
                paperQuestionId: data.tpqId
              }
            })
            .then(res => {
              let code = res.data.code;
              console.log(code)
              if (code == 1) {
                    that.choiceInfo.splice(index, 1);
                    that.editInfo.splice(index, 1);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     /**
     * 保存修改
     * @param {Object} data 当前选项数据对象
     * @param {Number} index 数据下标
     */
    saveChange(data, index) {
      let that = this;
      let right = false;
        data.tpqQuestion.chooseQuestion.forEach(item => {
          if (item.cqIsRight) {
            right = true;
          }
        });
        if (!right) {
          that.$message.warning( "最少勾选一个答案")
          return;
        }
      that.axios
        .post("TestPaper/ModifyQuestion", data.tpqQuestion)
        .then(res => {
          console.log(res.data.data);
          let code = res.data.code;
          let returnData = res.data.data;//接收后台返回值
          if (code == 1) {
            //方法一
            that.editInfo[index].tpqQuestion.chooseQuestion = returnData.chooseQuestion;
            that.editInfo[index].tpqQuestion.questionTitle = returnData.questionTitle;
            // 方法二 that.editInfo[index]=that.choiceInfo[index];也可以直接将改变后的choiceInfo赋值给editInfo
            data.editShow = true;
            that.$message.success( "修改成功！")
            that.$forceUpdate();//强制重新渲染
          }
          if(code==0){
            that.$message.info( "数据没有变化")
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    //监听从父组件传过来的值得变化
    choiceData(val) {
      console.log(val);
      let that = this;
      //深度拷贝对象
      that.choiceInfo = val;
      that.editInfo = JSON.parse(JSON.stringify(val));
    }
  }
};
</script>
<style lang="less" scoped>
#choiceForm {
  .olForm li {
    margin: 3% 0;
    font-size: 16px;
    .ulForm li {
      line-height: 5%;
    }
  }
.input {
  width: 90%;
  margin: 0 auto;
    /deep/ .el-form-item__content {
      display: flex !important;
      justify-content: space-around;
      margin-left: 43px !important;
    }
    .el-button.is-circle{
      margin-left:3%;
    }
  
}
}
</style>