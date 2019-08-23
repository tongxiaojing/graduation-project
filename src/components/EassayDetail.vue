<template>
  <div id="eassay-info">
    <div slot="header">
      <h3>
        三、问答题（本题共{{ eassayInfo.length}}道小题，共
        <a>5</a>分）
      </h3>
    </div>
    <div v-for="(item,index) in eassayInfo" :key="index">
      <template v-if="item.editShow">
        <el-form label-width="100px" class="demo-dynamic">
          <el-form-item class="title">
            <span>{{index+1}}、{{item.tpqQuestion.questionTitle}}</span>
            <el-input-number :min="2" :max="10" v-model="item.tpqScore" size="mini" style="margin-left:3%;"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="info" size="mini" plain disabled style="margin-right:3%;">参考答案</el-button><span>{{item.tpqQuestion.answerQuestion.aqAnswer}}</span>
          </el-form-item>
          <el-form-item>
            <el-button @click="editQuestion(item,index,3)" size="mini" round>编辑</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="!item.editShow">
          <el-form ref="editEassay" label-width="100px" class="demo-dynamic input">
            <el-form-item class="title">
              <span>{{index+1}}、</span>
              <el-input v-model="item.tpqQuestion.questionTitle" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="item.tpqQuestion.answerQuestion.aqAnswer" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelChange(item,index,1)" round>取消</el-button>
              <el-button @click="saveChange(item,index)" round>保存修改</el-button>
              <el-button @click="delectOptions(item,index)" round type="danger">删除题目</el-button>
            </el-form-item>
          </el-form>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: ["eassayData"],
  data() {
    return {
      eassayInfo: [], //接收父组件传来的值
      editEassay: [] //保存初始值
    };
  },
  created() {
    console.log(this.eassayData);
    if (this.eassayData) {
      this.eassayInfo = JSON.parse(JSON.stringify(this.eassayData)); //初始状态的数组
      this.editEassay = JSON.parse(JSON.stringify(this.eassayData)); //编辑状态的数组，用于保存最初值
    }
  },
  methods:{
      /**
     * 控制编辑或者是预览状态
     * @param {Object} data 题目对象
     * @param {Number} index 数据下标
     */
    editQuestion(data,index){
      let that=this;
      that.editEassay = JSON.parse(JSON.stringify(that.editEassay));
      console.log(that.editEassay)
      // 强制Vue 实例重新渲染
      console.log(data)
      data.editShow=false;
      that.$forceUpdate();
    },
  },
  watch: {
    //监听从父组件传过来的值得变化
    eassayData(val) {
      console.log(val);
      let that = this;
      //深度拷贝对象
      that.eassayInfo = JSON.parse(JSON.stringify(val));
      that.editEassay = JSON.parse(JSON.stringify(val));
    }
  }
};
</script>