<template>
  <div id="user-class">
    <!-- 新增班级按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small" @click="handleAdd">
        新增班级
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>
    <!-- 班级信息表格 -->
    <el-table :data="tableData" height="90vh" style="width: 100%;">
      <el-table-column prop="classCourseId" label="专业编号" sortable width="100"></el-table-column>
      <el-table-column prop="courseName" label="专业名称" sortable width="130"></el-table-column>
      <el-table-column prop="userName" label="任课老师" sortable width="130"></el-table-column>
      <el-table-column prop="className" label="班级" sortable width="130"></el-table-column>
      <el-table-column prop="classCreateTime" label="日期" sortable width="120"></el-table-column>
      <el-table-column prop="classStudents" label="班级人数" sortable width="100"></el-table-column>
      <el-table-column label="操作" width="180">
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
      <el-form :model="form" ref="form" :rule="checkRules">
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="任课教师" prop="userName" :label-width="formLabelWidth">
          <el-select v-model="form.userName" placeholder="请选择任课教师" @change="selectedTeacher">
            <el-option v-for="(item,index) in teachersInfo" :key="index" :value="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName" :label-width="formLabelWidth">
          <el-select v-model="form.courseName" placeholder="请选择课程">
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
      teachersInfo: [], //获取全部教师信息
      courseInfo: [], //获取课程信息
      submitForm: false, //如果是false，就是修改，true就是新增
      tableData: [
        //全部班级信息
        {
          classId: "", //班级主键编号
          className: "", //班级名称
          classTeacherId: "", //老师编号
          userName: "", //老师名称
          classCourseId: "", //专业编号
          courseName: "", //专业名称
          classStudents: "", //班级人数
          classCreateTime: "" //班级创建日期
        }
      ], //编辑班级信息
      form: {
        //下拉菜单初始内容
        classId: 0, //要修改的班级主键
        className: "", //要修改的班级名称
        classCourseId: "", //课程编号
        classTeacherId: "", //老师编号
        courseName: "", //课程名称
        userName: "", //老师名称
        index: 0 //当前点击的下标
      },
      formLabelWidth: "120px", //表单大小
      checkRules: {
        //验证规则
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        courseName: [
          { required: true, message: "请选择专业", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请选择任课教师", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getClassInfo(); //获取所有班级信息
    this.getTeachersInfo(); //获取所有教师信息
    this.getCourseInfo(); //获取所有课程信息
  },
  methods: {
    /**
     * 获取默认选中教师选项
     * @param {String} userName 下拉框数据
     */
    selectedTeacher(userName) {
      let that = this;
      let index = that.teachersInfo.findIndex(
        item => item.userName == userName //遍历数据得到当前选中的下标
      );
      that.form.classTeacherId = that.teachersInfo[index].userId; //并赋值给表单对象
    },
    /**
     *获取班级数据
     */
    getClassInfo() {
      let that = this;
      that.axios
        .get("Class/GetAllClass")
        .then(res => {
          that.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 编辑班级信息
     *@param {Number} index 当前单元格的索引
     *@param {Object} row 表单对象
     */
    handleEdit(index, row) {
      let that = this;
      that.submitForm = true; //控制调用哪个方法
      that.dailogTitleType = "编辑班级信息"; //弹框标题
      that.dialogFormVisible = true; //弹框显示隐藏
      that.form.classId = row.classId; //班级编号
      that.form.className = row.className; //班级名称
      that.form.classCourseId = row.classCourseId; //课程ID
      that.form.classTeacherId = row.classTeacherId; //教师编号
      that.form.courseName = row.courseName; //课程名称
      that.form.userName = row.userName; //教师名称
      that.form.index = index; //索引
    },
    /**
     * 编辑班级信息显示
     */
    updateClass(formName) {
      let that = this;
      that.dialogFormVisible = false;
      console.log("编辑班级信息");
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .post("Class/ModifyClass", {
              classId: that.form.classId, //要修改的班级主键
              className: that.form.className, //要修改的班级名称
              classCourseId: that.form.classCourseId, //课程编号
              classTeacherId: that.form.classTeacherId //老师编号
            })
            .then(res => {
              console.log(res.data.code);
              var type = "warning"; //判断状态类型
              var message = "其它错误"; //接收错误信息
              //根据返回的code值判断当前请求状态
              switch (res.data.code) {
                case -1: //code=-1 系统异常
                  message = res.data.message;
                  that.$message({
                    type: "warning",
                    message: message
                  });
                  break;
                case -2: // code=-2 参数错误
                  message = res.data.message;
                  message = res.data.message;
                  that.$message({
                    type: "warning",
                    message: message
                  });
                  break;
                case 0: //code=0 数据没有任何变化
                  message = res.data.message;
                  type = "info";
                  that.$message({
                    type: type,
                    message: message
                  });
                  break;
                case 1: //code=1 成功
                  message = res.data.message;
                  type = "success";
                  break;
                default:
                  message = res.data.message;
                  break;
              }
              if (res.data.code == 1) {
                let index = that.form.index;
                that.tableData[index].className = that.form.className;
                that.tableData[index].courseName = that.form.courseName;
                that.tableData[index].userName = that.form.userName;
                that.$message({
                  message: "修改成功!",
                  type: "success"
                });
              }
            });
        } else {
          that.$message({
            message: "请输入班级名称",
            type: "warning"
          });
          return false;
        }
      });
    },
    /**
     * 新增班级显示
     */
    handleAdd() {
      let that = this;
      that.dailogTitleType = "新增班级信息";
      that.dialogFormVisible = true;
    },
    /**
     * 新增班级信息
     */
    addClass() {
      let that = this;
      that.dialogFormVisible = false;
      console.log("新增班级信息");
    },
    /**
     * 删除班级信息
     *@param {Number} index 当前单元格的索引
     *@param {Object} row 表格当前对象
     */
    handleDelete(index, row) {
      let that = this;
      //删除成员提交的请求
      that
        .$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .get("Class/RemoveClass", {
              params: {
                classId: that.tableData[index].classId
              }
            })
            .then(res => {
              console.log(res.data.code);
              if (res.data.code == 1) {
                that.tableData.splice(index, 1); //更新页面
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                that.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getTeachersInfo() {
      let that = this;
      that.axios
        .get("User/GetTeachers")
        .then(res => {
          console.log(res.data);
          that.teachersInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourseInfo() {
      let that = this;
      that.axios
        .get("Class/GetAllCourse")
        .then(res => {
          console.log(res.data);
          that.courseInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
//面包屑导航样式
#user-class {
  .el-breadcrumb {
    font-size: 16px !important;
    line-height: 2;
    text-indent: 1em;
  }
}
//卡片式编辑区样式
.box-card {
  width: 480px; //表格数据样式
  #user-class {
    /deep/.el-table .cell {
      text-align: center;
    }
  }
}
</style>

