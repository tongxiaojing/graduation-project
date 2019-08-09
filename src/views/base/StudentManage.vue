<template>
  <div id="user-student">
    <!-- 新增学生按钮 -->
    <div style="padding: 5px 0;margin-bottom: 5px; text-align:left;">
      <el-button type="primary" size="small">
        新增学生
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>
    <!-- 学生信息表格 -->
    <el-table
      :data="tableData"
      height="70vh"
      style="width: 100%;"
      :default-sort="{prop: 'stuUid', order: 'ascending'}"
    >
      <el-table-column type="index" label="学号" width="100" sortable></el-table-column>
      <el-table-column prop="stuName" label="学生姓名" sortable></el-table-column>
      <el-table-column prop="className" label="班级名称" sortable></el-table-column>
      <el-table-column prop="stuAge" label="年龄" sortable></el-table-column>
      <el-table-column prop="stuMobile" label="学生手机号" sortable></el-table-column>
      <el-table-column prop="stuSex" label="性别" sortable></el-table-column>
      <el-table-column prop="stuPassword" label="密码" sortable></el-table-column>

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
    </el-table>>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          stuUid:'', //学生唯一标识符
          className:'', //所在班级名称
          classId:'', //班级编号
          stuName:'', //学生姓名
          stuAge:'', //学生年龄
          stuBirthDay:'', //生日
          stuMobile:'', //手机号
          stuSex:'', //性别
          stuPassword:'' //密码
        }
      ]
    };
  }
};
</script>
