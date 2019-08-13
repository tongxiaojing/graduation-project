<template>
  <div id="user-student">
    <!-- 新增学生按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small" @click="resetStudent">
        新增学生
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-select v-model="selectInfo.className" filterable placeholder="请选择" @change="selectedClass">
        <el-option v-for="item in classInfo" :key="item.classId" :value="item.className"></el-option>
      </el-select>
    </div>
    <!-- 学生信息表格 -->
    <el-table
      :data="tableData"
      height="70vh"
      style="width: 100%;"
      :default-sort="{prop: 'stuUid', order: 'ascending'}"
    >
      <el-table-column type="index" label="学号" width="80" sortable></el-table-column>
      <el-table-column prop="stuName" label="姓名" sortable width="100"></el-table-column>
      <el-table-column prop="className" label="班级" sortable width="100"></el-table-column>
      <el-table-column prop="stuAge" label="年龄" sortable width="100"></el-table-column>
      <!-- 格式化时间 -->
      <el-table-column label="生日" sortable width="150">
        <template slot-scope="scope">
          <span>{{scope.row.stuBirthDay | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stuMobile" label="手机号" sortable width="150"></el-table-column>
      <el-table-column prop="stuSex" label="性别" sortable width="80"></el-table-column>
      <el-table-column prop="stuPassword" label="密码" sortable width="150"></el-table-column>

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
      <el-form :model="form" status-icon :rules="rules" ref="form" v-if="dialogFormVisible">
        <el-form-item label="学生名称" prop="stuName" :label-width="formLabelWidth">
          <el-input v-model="form.stuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="className" :label-width="formLabelWidth">
          <el-select v-model="form.className" placeholder="请选择" @change="inputClass">
            <el-option v-for="(item,index) in classInfo" :key="index" :value="item.className"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="stuBirthDay" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            v-model="form.stuBirthDay"
            placeholder="选择日期"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="stuMobile" :label-width="formLabelWidth">
          <el-input v-model="form.stuMobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="stuPassword" :label-width="formLabelWidth">
          <el-input v-model="form.stuPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户性别：" prop="stuSex" style="text-align:left;">
          <el-radio v-model="form.stuSex" label="男">男</el-radio>
          <el-radio v-model="form.stuSex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm?updateStudent('form'):addStudent('form'),dialogVisibles = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/util/formatDate";
export default {
  data() {
    //验证电话号码
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false, //控制弹框
      dailogTitleType: "", //控制弹框标题
      submitForm: false, //控制提交方法
      classInfo: [], //保存所有班级信息
      tableData: [
        {
          stuUid: "", //学生唯一标识符
          className: "", //所在班级名称
          classId: "", //班级编号
          stuName: "", //学生姓名
          stuAge: "", //学生年龄
          stuBirthDay: "", //生日
          stuMobile: "", //手机号
          stuSex: "", //性别
          stuPassword: "" //密码
        }
      ],
      form: {
        stuUid: 0, //学生唯一标识符
        stuName: "", //学生姓名
        stuClassId: "", //班级编号
        stuBirthDay: "", //生日
        stuMobile: "", //手机号
        stuPassword: "", //登录密码,
        stuSex: "男", //性别
        className: "", //班级名称
        index: 0 //当前点击的下标
      },
      selectInfo: [
        {
          className: "web-15班", //选中的班级名称
          classId: 756 //选中的班级编号
        }
      ],
      rules: {
        //验证规则
        stuName: [
          { required: true, message: "请输入学生姓名", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请选择班级", trigger: "change" }
        ],
        stuBirthDay: [
          { required: true, message: "请选择生日", trigger: "blur" }
        ],
        stuMobile: [{ required: true, validator: checkPhone, trigger: "blur" }],
        stuSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        stuPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  /*格式化时间*/
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  mounted() {
    this.getClassInfo(); //获取所有班级信息
    this.allStudent(); //获取所有学生信息
  },
  methods: {
    /**
     * 获取所有班级信息
     */
    getClassInfo() {
      let that = this;
      that.axios
        .get("Class/GetAllClass")
        .then(res => {
          that.classInfo = res.data;
          let classNames = that.classInfo[0].className; //默认数据为查询到的班级位置1
          that.form.className = classNames;
          that.selectedClass(classNames);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取所有学生信息
     */
    allStudent() {
      let that = this;
      let classId = that.selectInfo.classId;
      if (classId) {
        that.axios
          .get("Student/GetClassStudent", {
            params: {
              classId: classId
            }
          })
          .then(res => {
            that.tableData = res.data;
            console.log(that.tableData);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    /**
     * 获取下拉列表选中用户类别的ID
     * @param {String} className 下拉框数据
     */
    selectedClass(className) {
      let that = this;
      let index = that.classInfo.findIndex(item => item.className == className);
      that.selectInfo.classId = that.classInfo[index].classId; //并赋值给当前选项
      this.allStudent(); //获取所有学生信息
    },
    /**
     * 获取下拉列表选中用户类别的ID
     * @param {String} className 下拉框数据
     */
    inputClass(className) {
      let that = this;
      let index = that.classInfo.findIndex(item => item.className == className);
      that.form.stuClassId = that.classInfo[index].classId; //并赋值给当前选项
      console.log(that.form.stuClassId);
    },
    /**
     * 编辑角色
     * @param {String} index 下标
     * @param {Object} row 表格对象
     */
    handleEdit(index, row) {
      let that = this;
      that.dialogFormVisible = true;
      that.submitForm = true;
      that.dailogTitleType = "编辑学生信息";
      that.form.stuUid = row.stuUid;
      that.form.stuName = row.stuName;
      that.form.stuClassId = row.stuClassId;
      that.form.stuBirthDay = row.stuBirthDay;
      that.form.stuMobile = row.stuMobile;
      that.form.stuPassword = row.stuPassword;
      that.form.className = row.className;
      that.form.stuSex = row.stuSex;
      that.form.index = index;
    },
    /**
     * 编辑学生信息
     * @param {Object} formName 表单对象
     */
    updateStudent(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .post("Student/ModifyStudent", that.form)
            .then(res => {
              console.log(res.data.code);
              if (res.data.code == 1) {
                let index = that.form.index;
                that.tableData[index].stuName = that.form.stuName;
                that.tableData[index].stuBirthDay = that.form.stuBirthDay;
                that.tableData[index].stuMobile = that.form.stuMobile;
                that.tableData[index].stuPassword = that.form.stuPassword;
                that.tableData[index].stuSex = that.form.stuSex;
                that.tableData[index].className = that.form.className;
                that.tableData[index].stuAge = res.data.data; //后台会返回年龄
                that.$message({
                  message: "修改成功!",
                  type: "success"
                });
                that.dialogFormVisible = false; //成功之后把弹框和隐藏
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          that.$message({
            message: "请输入有效信息!",
            type: "warning"
          });
          return false;
        }
      });
    },
    /*
     *增加学生数据初始化
     */
    resetStudent() {
      let that = this;
      that.submitValue = true;
      that.dialogFormVisible = true;
      that.dailogTitleType = "新增学生";
      that.form.stuUid = 0;
      that.form.stuName = "";
      that.form.stuClassId = "";
      that.form.stuBirthDay = "";
      that.form.stuMobile = "";
      that.form.stuPassword = "";
      that.form.className = "";
      that.form.index = 0;
    },
    /**
     *@param {Object} formName 表单对象
     */
    addStudent(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .post("Student/AddStudent", that.form)
            .then(res => {
              console.log(res.data.code);
              let data = res.data.data;
              if (res.data.code == 1) {
                that.$message({
                  message: "新增成功!",
                  type: "success"
                });
                // 如果当前用户查询的班级与用户添加的班级是相同，才可以添加到数组中
                if (that.selectInfo.classId == that.form.stuClassId) {
                  that.tableData.unshift(data);
                }
                that.dialogFormVisible = false;
              }
            })
            .catch(err => {
              that.$message({
                message: "新增失败!",
                type: "warning"
              });
            });
        } else {
          that.$message({
            message: "请输入有效信息!",
            type: "warning"
          });
          return false;
        }
      });
    },
    /**
     * 删除学生
     * @param {Number} index 下标
     * @param {Object} row 表格当前对象
     */
    handleDelete(index, row) {
      let that = this;
      that
        .$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .get("Student/RemoveStudent", {
              params: {
                uid: row.stuUid
              }
            })
            .then(res => {
              console.log(res.data.code); //返回代码
              if (res.data.code == 1) {
                that.tableData.splice(index, 1);
                that.$message({
                  type: "success",
                  message: "删除成功！"
                });
                that.dialogFormVisible = false; //成功之后把弹框和隐藏
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
    }
  }
};
</script>
