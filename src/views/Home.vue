<template>
  <div class="home">
    <div>
      <router-link to="/TeacherManage">教师管理</router-link>|
      <router-link to="/ClassManage">班级管理</router-link>|
      <router-link to="/StudentManage">学生管理</router-link>|
      <router-link to="/ChangePass">更改密码</router-link>|
      <router-link to="/NewExam">试卷录入</router-link>|
      <router-link to="/MarkPaper">批阅试卷</router-link>|
      <router-link to="/ExamManage">试卷管理</router-link>|
      <router-link to="/Score">查看成绩</router-link>|
      <router-link to="/ExamArrange">考试安排</router-link>
    </div>
    <div>
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Cookie from "@/util/Cookie.js";
import Base64 from "@/util/Base64.js";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
