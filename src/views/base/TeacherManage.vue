<template>
  <div id="user-teacher">
    <!-- 新增教师按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small" @click="handleAdd">
        新增教师
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <span style=" margin-left: 15px;">
        <template>
        <el-radio-group v-model="radio" @change="tableData = roleFilter">
          <el-radio
            v-for="(item,index) in radioRole"
            :key="index"
            :label="item.userTypeTypeName"
          >{{ item.userTypeTypeName}}</el-radio>
        </el-radio-group>
      </template>
      </span>
    </div>
    <!-- 班级信息表格 -->
    <el-table
      :data="tableData"
      height="70vh"
      style="width: 100%;"
      :default-sort="{prop: 'userUid', order: 'ascending'}"
    >
      <el-table-column type="index" label="编号" width="80" sortable></el-table-column>
      <el-table-column prop="userName" label="老师名称" sortable></el-table-column>
      <el-table-column prop="userSex" label="性别" sortable></el-table-column>
      <el-table-column prop="userPassword" label="用户密码" sortable></el-table-column>
      <el-table-column prop="userTypeTypeName" label="职称" sortable></el-table-column>
      <el-table-column prop="userMobile" label="手机号" sortable></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope" fixed="right">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="scope.row.disableDelete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击新增/编辑的dialog -->
    <el-dialog :title="dailogTitleType" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" v-if="dialogFormVisible" :rules="rules">
        <el-form-item label="用户名称：" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="userMobile">
          <el-input v-model="form.userMobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="userPassword">
          <el-input v-model="form.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户性别："
          prop="userSex"
          :label-width="formLabelWidth"
          style="text-align:left;"
        >
          <el-radio v-model="form.userSex" label="男">男</el-radio>
          <el-radio v-model="form.userSex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="用户角色：" prop="userTypeTypeName" :label-width="formLabelWidth">
          <el-select v-model="form.userTypeTypeName" placeholder="请选择" @change="selectedUser">
            <el-option v-for="(item,index) in allRole" :key="index" :value="item.userTypeTypeName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm?updateUser('form'):addUser('form'),dialogVisibles = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      dailogTitleType: "", //dialog的title
      dialogFormVisible: false, //控制dialog是显示还是隐藏状态，默认隐藏
      submitForm: false, //如果是false，就是修改，true就是新增
      allRole: [], //获取所有角色
      filterRole: [], //用于存储过滤转换出来的数据
      radioRole:[//单选组所有角色数据
        {
          userTypeId: 0,
          userTypeTypeName: "全部"
        }
      ],
       radio:"全部" ,//默认选中
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
        userId: "", //用户ID
        userUid: "", //用户类别ID
        userName: "", //老师名称
        userMobile: "", //手机号
        userSex: "", //性别
        userPassword: "", //密码
        userUserTypeId: "", //角色编号
        userTypeTypeName: "", //角色名称
        index: 0 //当前点击的下标
      },
      rules: {
        //验证规则
        userName: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        userMobile: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: ["blur", "change"]
          }
        ],
        userTypeTypeName: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getTeachersInfo(); //获取用户操作
    this.getAllRole(); //获取所有角色信息
  },
  methods: {
    /**
     * 获取下拉列表选中用户类别的ID
     * @param {String} userRole下拉框数据
     */
    selectedUser(userTypeTypeName) {
      let that = this;
      let index = that.allRole.find(item => {
        return item.userTypeTypeName == userTypeTypeName;
      });
      that.form.userUserTypeId = index.userTypeId; //并赋值给表单对象
    },
    /**
     * 获取所有角色信息
     */
    getAllRole() {
      let that = this;
      that.axios
        .get("UserType/GetUserRoles")
        .then(res => {
          that.allRole = res.data;//下拉框所有角色
          that.radioRole.push(...res.data);//单选组所有角色
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取所有教师信息
     */
    getTeachersInfo() {
      let that = this;
      that.axios
        .get("User/GetTeachers")
        .then(res => {
          that.tableData = res.data;//保存所有教师信息
          that.filterRole = res.data;//保存过滤出来的数据
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 点击编辑
     */
    handleEdit(index, row) {
      let that = this;
      that.submitForm = true; //控制调用哪个方法
      (that.dailogTitleType = "编辑用户"), (that.dialogFormVisible = true);
      that.form.userUid = row.userUid;
      that.form.userName = row.userName;
      that.form.userMobile = row.userMobile;
      that.form.userSex = row.userSex;
      that.form.userUserTypeId = row.userUserTypeId;
      that.form.userPassword = row.userPassword;
      that.form.userTypeTypeName = row.userTypeTypeName;
    },
    /**
     * 点击编辑用户
     */
    updateUser(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .post("User/ModifyTeacher", {
              userUid: that.form.userUid, //要修改的用户标识符
              userName: that.form.userName, //修改名称
              userMobile: that.form.userMobile, //要修改的手机号，11位手机号
              userSex: that.form.userSex, //要修改的性别，男|女
              userUserTypeId: that.form.userUserTypeId, //角色
              userPassword: that.form.userPassword //密码
            })
            .then(res => {
              let code = res.data.code; //获取后台返回的状态码
              switch (code) {
                case -1: //code=-1 系统异常
                  that.$message({
                    type: "warning",
                    message: res.data.message
                  });
                  break;
                case -2: // code=-2 参数错误
                  that.$message({
                    type: "warning",
                    message: res.data.message
                  });
                  break;
                case 1: //code=1 成功
                  let index = that.form.index;
                  that.tableData[index].userName = that.form.userName;
                  that.tableData[index].userMobile = that.form.userMobile;
                  that.tableData[index].userSex = that.form.userSex;
                  that.tableData[index].userPassword = that.form.userPassword;
                  that.tableData[index].userTypeTypeName = that.form.userTypeTypeName;
                  that.$message({
                    message: "修改成功!",
                    type: "success"
                  });
                  that.dialogFormVisible = false; //成功之后把弹框和隐藏
                  break;
                default:
                  message = res.data.message;
                  break;
              }
            });
        } else {
          that.$message({
            message: "请输入有效信息!",
            type: "warning"
          });
        }
      });
    },
    /**
     * 点击新增
     */
    handleAdd() {
      let that = this;
      that.submitForm = false; //控制调用哪个方法
      (that.dailogTitleType = "新增用户"), (that.dialogFormVisible = true);
      that.form.userUid = 0;
      that.form.userName = "";
      that.form.userMobile = "";
      that.form.userUserTypeId = "";
      that.form.userTypeTypeName = "";
      that.form.userPassword = "";
      that.form.index = 0;
    },
    /**
     * 点击新增用户
     */
    addUser(formName) {
      let that = this;
      console.log("新增用户");
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .post("User/AddTeacher", {
              userName: that.form.userName, //用户名，不能为空
              userMobile: that.form.userMobile, //手机号，长度11位
              userSex: that.form.userSex, //性别，男|女
              userPassword: that.form.userPassword, //密码，长度6~18
              userUserTypeId: that.form.userUserTypeId //用户角色编号
            })
            .then(res => {
              let data = res.data.data; //保存后台返回的数据
              let code = res.data.code; //获取后台返回的状态码
              switch (code) {
                case -1: //code=-1 系统异常
                  that.$message({
                    type: "warning",
                    message: res.data.message
                  });
                  break;
                case -2: // code=-2 参数错误
                  that.$message({
                    type: "warning",
                    message: res.data.message
                  });
                  break;
                case 1: //code=1 成功
                  (data.userName = that.form.userName), //新增用户名
                  (data.userMobile = that.form.userMobile), //新增用户电话号码
                  (data.userPassword = that.form.userPassword), //新增用户密码
                  (data.userSex = that.form.userSex); //新增用户性别
                  data.userTypeTypeName = that.form.userTypeTypeName; //新增用户职称
                  that.tableData.unshift(data);
                  that.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  that.dialogFormVisible = false;
                  break;
                  default:
                    message = res.data.message;
                    break;
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
        }
      });
    },
    /**
     * 点击删除
     *@param {Number} index 当前单元格的索引
     *@param {Object} row 表格当前对象
     */
    handleDelete(index, row) {
      let that = this;
      //删除成员提交的请求
      that
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .post("User/RemoveTeacher", null, {
              params: {
                uid: row.userUid
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
    }
  },
  computed: {
    // 过滤计算
    roleFilter() {
      let that = this;
      let role = that.filterRole;
      let typeName = that.radioRole[0].userTypeTypeName;
      if (that.radio == typeName) {
        return that.filterRole;
      }
      return role.filter(value => value.userTypeTypeName == that.radio);
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


