<template>
  <div id="user-teacher">
    <!-- 新增教师按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small">
        新增教师
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>
    <!-- 班级信息表格 -->
    <el-table
      :data="tableData"
      height="70vh"
      style="width: 100%;"
      :default-sort="{prop: 'userId', order: 'ascending'}"
    >
      <el-table-column type="index" label="编号" width="100" sortable></el-table-column>
      <el-table-column prop="userName" label="老师名称" sortable></el-table-column>
      <el-table-column prop="userPassword" label="用户密码" sortable></el-table-column>
      <el-table-column prop="userTypeTypeName" label="职称" sortable></el-table-column>
      <el-table-column prop="userMobile" label="手机号" sortable></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="scope.row.classStudents>0"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击新增/编辑的dialog -->
    <el-dialog :title="dailogTitleType" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="教师名称" :label-width="formLabelWidth" prop="className">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任课教师" prop="userName" :label-width="formLabelWidth">
          <el-select v-model="form.userName" placeholder="请选择任课教师" @change="selectedTeacher">
            <el-option v-for="(item,index) in teachersInfo" :key="index" :value="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName" :label-width="formLabelWidth">
          <el-select v-model="form.courseName" placeholder="请选择课程" @change="selectedCourse">
            <el-option v-for="(items,indexs) in courseInfo" :key="indexs" :value="items.courseName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm?updateClass('form'):addClass('form'),dialogVisibles = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dailogTitleType: "", //dialog的title
      dialogFormVisible: false, //控制dialog是显示还是隐藏状态，默认隐藏
      submitForm: false, //如果是false，就是修改，true就是新增
      //表格数据
      tableData: [
        {
          userId: 925, //主键编号
          userUid: "ECEBA6FCAED245539C03C235DE1595F8", //标识符
          userMobile: "10472569654", //手机号
          userName: "李四", //老师名称
          userSex: "男", //性别
          userPassword: "123123", //密码
          userUserTypeId: 2, //角色编号
          userTypeTypeName: "教员", //角色
          disableDelete: true //禁用删除 true：禁用 false：可用
        }
      ],
      form: {
        userId:'',
        userUid:'',
        userName:'',
        userMobile:'',
        userSex:'',
        userPassword:'',
        userUserTypeId:''
      }
    };
  },
  mounted() {
    this.getTeachersInfo(); //获取用户操作
  },
  methods: {
    /**
     * 获取所有教师信息
     */
    getTeachersInfo() {
      let that = this;
      that.axios
        .get("User/GetTeachers")
        .then(res => {
          that.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 点击编辑
     */
    handleEdit(index, row) {
      console.log(index, row);
    },
    /**
     * 点击删除
     */
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style lang="less" scoped>
#user-teacher {
  /deep/.el-table .cell {
    text-align: center;
  }
}
</style>


