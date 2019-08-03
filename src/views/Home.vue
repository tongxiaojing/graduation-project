<template>
  <div id="home">
    <el-container>
      <el-aside width="auto">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="!isCollapse"
          :default-openeds="['1','2']"
          background-color="#3A3D4C"
          text-color="#ffff"
          active-text-color="#fff"
        >
          <el-menu-item style="text-align:left;">
            <img src="../assets/logo.png" alt width="auto" height="40px" />
            <span>教学管理系统</span>
          </el-menu-item>
          <!-- 基础数据 -->
          <el-submenu v-for="(item,index) in listData" :key="index" :index="index+1 +''">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(items,indexs) in item.titles" :key="indexs">
              <el-menu-item :index="items.route">
                <router-link :to="items.route">{{items.listName}}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-container>
          <el-header>
            <!-- 折叠按钮 -->
            <div class="left">
            <el-button @click="control" size="mini" class="switch">
              <i class="el-icon-s-fold" v-show="isCollapse"></i>
              <i class="el-icon-s-unfold" v-show="!isCollapse"></i>
            </el-button>
            </div>
            <!-- 动态增减表单 -->
            <div class="tabs">
            <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
              <el-tab-pane
                :key="item.name"
                v-for="item in editableTabs"
                :label="item.title"
                :name="item.name"
              >
                {{item.content}}
              </el-tab-pane>
            </el-tabs>
            </div>
            <!-- 用户信息 -->
            <div class="right">
              <span style="color:white;padding-right:10px;">狗子</span>
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 用户头像 -->
              <!-- 引用本地图片时，需要使用require解析路径 -->
              <el-avatar
                :size="50"
                :src="require('../assets/user.jpg')"
                style="margin-left: 15px"
              ></el-avatar>
            </div>
          </el-header>
          <el-main>         
              <router-view name="right"></router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data() {
    return {
      isCollapse: true, //保存折叠状态
      editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
      listData: [
        {
          title: "基础模块", //基础模块数据
          titles: [
            { listName: "首页", route: "/home" },
            { listName: "教师管理", route: "/TeacherManage" },
            { listName: "班级管理", route: "/ClassManage" },
            { listName: "学生管理", route: "/StudentManage" },
            { listName: "更改密码", route: "/ChangePass" }
          ]
        },
        {
          title: "在线测试", //在线测试模块数据
          titles: [
            { listName: "试卷录入", route: "/NewExam" },
            { listName: "批阅试卷", route: "/MarkPaper" },
            { listName: "试卷管理", route: "/ExamManage" },
            { listName: "查看成绩", route: "/Score" },
            { listName: "考试安排", route: "/ExamArrange" }
          ]
        }
      ]
    };
  },
  methods: {
    /**
     *  控制折叠或是合上
     * */
    control() {
      this.isCollapse = !this.isCollapse;
    },
     /**
     * 侧边栏点击添加tab标签页
     */
    handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  
};
</script>
<style scoped lang='less'>
a {
  text-decoration: none;
  color: #b3c0d1;
}
//侧边栏
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  //菜单栏
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
//头部导航栏
.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  line-height: 60px;
  padding: 0px 0px;
  .left{
    width:200px;
  .switch {
      float:left;
    }
  }
  /deep/.tabs{
    height:60px;
    overflow:hidden;
  }
  /deep/ .right {
    width:200px;
    display: flex;
    justify-content: flex-end;
  }
  .el-button {
    border: 1px solid #3a3d4c;
  }
  .el-button:focus {
    color: #fff;
  }
  .el-button--mini {
    background-color: #3a3d4c;
    padding: 13px 0px;
    font-size: 30px;
  }
}
.el-main {
  padding: 0px;
}
</style>
