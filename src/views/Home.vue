<template>
  <div id="home">
    <el-container style="height: 100%;position: relative;">
      <el-aside width="auto">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="!isCollapse"
          :default-openeds="['1','2']"
          :default-active="$route.path"
          router
          background-color="#3A3D4C"
          text-color="#ffff"
        >
          <el-menu-item style="text-align:left;">
            <img src="../assets/logo.png" alt width="auto" height="40px" />
            <span>教学管理系统</span>
          </el-menu-item>
          <!-- 基础数据 -->
          <el-submenu v-for="(item,index) in listData" :key="index" :index="String(index+1)">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(items,indexs) in item.titles"
                :key="indexs"
                @click="addTab(items.listName,items.path)"
                class="aTabs"
                :index="items.path"
              >{{items.listName}}</el-menu-item>
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
                <!--折叠或者收起时切换图片 -->
                <i class="el-icon-s-fold" v-show="isCollapse"></i>
                <i class="el-icon-s-unfold" v-show="!isCollapse"></i>
              </el-button>
            </div>
            <!-- 动态增减表单 -->
            <div class="tabs">
              <el-tabs
                v-model="editableTabsValue"
                type="card"
                @tab-click="jumpRouter"
                @tab-remove="removeTab"
              >
                <el-tab-pane
                  v-for="(value,index) in editableTabs"
                  :key="value.name"
                  :closable="index>0"
                  :label="value.title"
                  :name="value.name"
                ></el-tab-pane>
              </el-tabs>
            </div>
            <!-- 用户信息 -->
            <div class="right">
              <span style="color:white;padding-right:10px;">王麻子</span>
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right:15px;color:white;"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>查看信息</el-dropdown-item>
                  <el-dropdown-item @click.native="handlelayOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 用户头像 -->
              <!-- 引用本地图片时，需要使用require解析路径 -->
              <el-avatar :size="50" :src="require('../assets/user.jpg')" style="margin-left: 15px"></el-avatar>
            </div>
          </el-header>
          <el-main>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>基础数据</el-breadcrumb-item>
              <el-breadcrumb-item>在线测试</el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
              <el-card class="box-card" shadow="always">
                <div class="text item">
                  <router-view name="right"></router-view>
                </div>
              </el-card>
            </keep-alive>
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
  data() {
    return {
      isCollapse: true, //保存折叠状态
      listData: [
        {
          title: "基础模块", //基础模块数据
          titles: [
            { listName: "首页", path: "/home" },
            { listName: "教师管理", path: "/TeacherManage" },
            { listName: "班级管理", path: "/ClassManage" },
            { listName: "学生管理", path: "/StudentManage" },
            { listName: "更改密码", path: "/ChangePass" }
          ]
        },
        {
          title: "在线测试", //在线测试模块数据
          titles: [
            { listName: "试卷录入", path: "/NewExam" },
            { listName: "批阅试卷", path: "/MarkPaper" },
            { listName: "试卷管理", path: "/ExamManage" },
            { listName: "查看成绩", path: "/Score" },
            { listName: "考试安排", path: "/ExamArrange" }
          ]
        }
      ],
      tabsList: [], //用于保存二级菜单的数组
      editableTabsValue: "/home", //默认标签页的位置
      editableTabs: [
        //标签页内容数组
        {
          title: "首页",
          name: "/home" //标签内容位置
        }
      ]
      // tabIndex: 1 //添加时从下标1开始，因为首页是默认占位的
    };
  },
  created() {
    let that = this;
    that.listData.forEach(item => {
      that.tabsList.push(...item.titles); //获取二级菜单的数组对象
    });
    let tabsName = JSON.parse(sessionStorage.getItem("tabsName")); //将存储的信息解析成json格式并赋给变量
    let openIndex = sessionStorage.getItem("openIndex"); //获取存储的最后打开的标签页
    if (tabsName && openIndex) {
      //如果会话当中有值，就提取出来
      that.editableTabs = tabsName;
      that.editableTabsValue = openIndex;
    }
  },
  methods: {
    /**
     * 退出登录操作
     */
    async handlelayOut() {
      var that = this;
      that
        .$confirm("确认退出吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          sessionStorage.clear(); //清除缓存
          that.$router.push("/"); //重新跳转
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    /**
     *  控制折叠或是合上
     * */
    control() {
      this.isCollapse = !this.isCollapse; //控制合上还是打开
    },
    /**
     * 侧边栏点击添加tab标签页
     * @param {string} listTitle 二级菜单的title
     * @param {string} path 是路径
     * @param {string} newTabName 是新增tabs的路径
     */
    addTab(listTitle, path) {
      let that = this; //用that保存this的指向
      let newTabName = path; //绑定当前菜单的路径到新增tag标签页上
      //console.log(newTabName)
      that.editableTabsValue = newTabName; //将新增的tabs标签页默认选中
      let valueIndex = that.editableTabs.findIndex(item => {
        return item.title == listTitle;
      }); //使用findIndex 方法查找打开的标签页里面有没有要打开的目标标签,有的话返回下标，没有返回-1;
      if (valueIndex == -1) {
        that.editableTabs.push({
          title: listTitle,
          name: newTabName
        });
      } else {
        //如果要打开的目标标签页已经在打开的标签页数组中，就赋值给选中标签
        that.editableTabsValue = that.editableTabs[valueIndex].name;
      }
      sessionStorage.setItem("tabsName", JSON.stringify(that.editableTabs)); //保留用户操作
      sessionStorage.setItem("openIndex", that.editableTabsValue);
    },
    /**
     * 点击tabs标签页时，路由对应跳转
     * @param {object} targetIndex 数组对象
     */
    jumpRouter(targetIndex) {
      let that = this;
      that.tabsList.forEach(item => {
        //遍历二级菜单栏的数组
        if (targetIndex.label == item.listName) {
          that.$router.replace(item.path);
          that.editableTabsValue = targetIndex.name; //将当前点击的tabs的name赋值给editableTabsValue
          sessionStorage.setItem("openIndex", that.editableTabsValue); //存储当前选中的tabs位置信息
        }
      });
    },
    /**
     * 点击移除tabs标签
     */
    removeTab(targetName) {
      let that = this;
      let tabs = that.editableTabs; //得到tabs数组对象
      let activeName = that.editableTabsValue; //得到现在tab标签页默认位置
      //console.log(activeName);
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name; //得到当前选中位置的下标
            }
          }
        });
      }
      that.editableTabsValue = activeName; //将现在tab标签页默认位置重新赋值
      that.editableTabs = tabs.filter(tab => tab.name !== targetName);
      sessionStorage.setItem("tabsName", JSON.stringify(that.editableTabs)); //重新保存tabs标签页的数组，保留当前操作
      that.$router.replace(that.editableTabsValue); //删除之后，路由对应跳转
    }
  }
};
</script>
<style scoped lang='less'>
/deep/ .el-menu {
  border-right: none;
}
#home {
  height: 100%;
  //侧边栏
  .el-aside {
    color: #fff;
    text-align: center;
    line-height: 200px;
    background-color: #3a3d4c;
    //菜单栏
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      /deep/.el-submenu__title,
      .el-menu-item {
        overflow: hidden;
        color: white;
      }
      /deep/ .aTabs {
        &.is-active {
          color: #0dd7dc;
          font-size: 15px;
          background-color: rgba(9, 35, 75, 0.5) !important;
          &::after {
            content: "";
            position: absolute;
            top: 12.5px;
            right: 0;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right: 10px solid #0dd7dc;
          }
        }
      }
    }
  }
  //头部导航栏
  .el-header {
    //overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #545c64;
    color: #fff;
    line-height: 60px;
    padding: 0px 0px;
    .left {
      .switch {
        float: left;
      }
    }
    /deep/.tabs {
      height: 60px;
      flex: 1;
      overflow: hidden;
      .el-tabs__item {
        color: #fff;
        height: 49px;
        &.is-active {
          color: #0dd7dc;
          border-bottom: 2px solid #0dd7dc !important;
        }
      }
    }
    /deep/ .right {
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
    padding: 0;
    &.el-main {
      //面包屑导航样式
      /deep/ .el-breadcrumb {
        font-size: 16px !important;
        line-height: 2;
        text-indent: 1em;
      }
      .el-card__body{
        margin-top:5%;
        height: 100%;
      .text {
        font-size: 14px;
      }
      .item {
        margin-bottom: 18px;
      }
      }
    }
  }
}

// /deep/  >>>   可用这两个东西进行深度覆盖
</style>
