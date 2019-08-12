<template>
  <div id="role-manage">
    <!-- 新增角色按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small" @click="handleAdd">
        新增角色
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>
    <!-- 班级信息表格 -->
    <el-table
      :data="tableData"
      height="70vh"
      style="width: 100%;text-align:center;"
      :default-sort="{prop: 'userTypeId', order: 'ascending'}"
    >
      <el-table-column type="index" label="编号" width="120" sortable></el-table-column>
      <el-table-column prop="userTypeTypeName" label="角色名称" sortable></el-table-column>
      <el-table-column prop="userTypeId" label="角色ID" sortable></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击新增/编辑的dialog -->
    <el-dialog :title="dailogTitleType" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" v-if="dialogFormVisible" :rules="rules">
        <el-form-item label="角色名称：" label-width="120px" prop="userRoleName">
          <el-input v-model="form.userRoleName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm?updateRole('form'):addRole('form'),dialogVisibles = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false, //控制弹框
      dailogTitleType: "", //控制弹框标题
      submitForm: false, //控制提交方法
      tableData: [
        {
          userTypeTypeName: "", //角色名称
          disable: true, //是否禁用删除按钮
          userTypeId: 1 //编号
        }
      ],
      form: {
        id: 0, //要修改的角色ID
        userRoleName: "", //要修改的角色名称
        index: 0 //当前点击的下标
      },
      rules: {
        //验证规则
        userRoleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getRoleInfo(); //获取所有角色信息
  },
  methods: {
    getRoleInfo() {
      let that = this;
      that.axios
        .get("UserType/GetUserRoles")
        .then(res => {
          that.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 编辑角色
     */
    handleEdit(index, row) {
      console.log("点击显示编辑");
      let that = this;
      that.dialogFormVisible = true;
      that.submitForm = true;
      that.dailogTitleType = "编辑角色";
      that.form.userTypeId = row.userTypeId;
      that.form.userRoleName = row.userTypeTypeName;
      that.form.index = row.index;
    },
    /**
     * 新增角色
     */
    handleAdd(index, row) {
      console.log("点击显示新增");
      let that = this;
      that.dialogFormVisible = true;
      that.dailogTitleType = "新增角色";
      that.form.id = 0;
      that.form.userRoleName = "";
      that.form.index = 0;
    },
    /**
     * 实现编辑功能
     */
    updateRole(formName) {
      let that = this;
      console.log("点击显示编辑");
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.axios
            .get("UserType/ModifyUserRole", null, {
              params: {
                userRoleName: that.form.userRoleName
              }
            })
            .then(res => {
              console.log(res.data.code);
              if (res.data.code == 1) {
                let index = that.form.index;
                that.tableData[index].userTypeTypeName = that.form.userRoleName;
                that.dialogFormVisible = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 删除角色
     */
    handleDelete(index, row) {
      console.log("点击删除");
    }
  }
};
</script>script