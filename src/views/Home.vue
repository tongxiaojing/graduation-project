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
          <el-submenu v-for="(item,index) in listData" :key="index" :index="String(index+1)">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span  slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(items,indexs) in item.titles" 
              :key="indexs"
               @click="addTab(items,indexs)"
               class="aTabs"
               >
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
              <el-button
               @click="control" 
               size="mini" 
               class="switch"
               >
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
                closable
                @tab-click="jumpRouter"
                @tab-remove="removeTab"
              >
                <el-tab-pane
                  v-for="item in editableTabs"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name"
                ></el-tab-pane>
              </el-tabs>
            </div>
            <!-- 用户信息 -->
            <div class="right">
              <span style="color:black;padding-right:10px;">王麻子</span>
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
              <el-avatar :size="50" :src="require('../assets/user.jpg')" style="margin-left: 15px"></el-avatar>
            </div>
          </el-header>
          <el-main>
            <keep-alive>
              <router-view name="right"></router-view>
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
      ],
      editableTabsValue: "1",//默认标签页的位置
       editableTabs: [//标签页内容数组
        {
          title: "首页",
          name: "1",//标签内容位置
          content: "首页内容"
        }
      ],
      tabIndex: 1,//添加时从下标1开始，因为首页是默认占位的
    };
  },
  created(){
    let that=this;
    let tabsName=JSON.parse(sessionStorage.getItem('editableTabs'));//将存储的信息解析成json格式并赋给变量
    let tabsIndex=sessionStorage.getItem('tabsIndex');//获取tabs的下标
    if(tabsName && tabsIndex){//如果会话当中有值，就提取出来
        that.editableTabs=tabsName;
        that.editableTabsValue=tabsIndex;
        that.tabIndex=Number(tabsIndex)
    }
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
    addTab(items,indexs) {
      //console.log(items,indexs)
      let that=this;//用that保存this的指向
      function checkTabs(tabsIndex){//当tabs标签名==当前点击的菜单名时返回结果
        return tabsIndex.title == items.listName
      }
      let valueIndex = that.editableTabs.findIndex(checkTabs)//当数组中的元素在测试条件时返回true时,findIndex()返回符合条件的元素的索引位置，之后的值不会再调用执行函数
      let newTabName = valueIndex + 1 + ""; 
      if(valueIndex == -1){//如果没有符合条件的元素返回-1时进行添加
        newTabName = ++that.tabIndex + "";//将下标赋值给tabs的index
        that.editableTabs.push({//将获取的值push进tabs数组
                title: items.listName,//tabs标签名
                name: newTabName,//该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'
                content: items.listName//tabs标签内容
            });
      }else {
        newTabName = that.editableTabs[valueIndex].name; //使用editableTabs数组中name指定tab标签页位置
      }
      that.editableTabsValue = newTabName;//将默认位置换成新增的tabs的name
      sessionStorage.setItem(
      'editableTabs',
      JSON.stringify(that.editableTabs)
      );//存储tabs标签名,必须要转换成字符串，不然就是[object,object]
      sessionStorage.setItem('tabsIndex',newTabName);//保存tabs的位置信息即tabs的name

    },
    /**
     * 点击tabs标签页时，路由对应跳转
     */
    jumpRouter(targetIndex){
      console.log(targetIndex)
    },
    /**
     * 点击移除tabs标签
    */
    removeTab(targetName) {
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
};
</script>
<style scoped lang='less'>
#home{
  height: 100%;
//侧边栏
.el-aside {
  color: #fff;
  text-align: center;
  line-height: 200px;
  height:100%;
  background-color:#3A3D4C;
  //菜单栏
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
     /deep/.el-submenu__title,.el-menu-item{
      color:white;
    }
    .aTabs{
      /deep/ a {
      text-decoration: none;
      display: block;
      color: #ccc;
      &.router-link-exact-active {
        &.router-link-active {
          position: relative;
          z-index: 2;
          color: #0DD7DC;
          font-size: 15px;
          &::before {//小三角形用:after  :before伪类来实现
            content: "";
            position: absolute;
            top: 0;
            left: -40px;
            width: 200px;
            height: 100%;
            z-index: -1;
          }
          &::after {
            content: "";
            position: absolute;
            top: 12.5px;
            right: -45px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right: 10px solid #fff;
            z-index: -1;
          }
        }
      }
    }
    }
  }
}
//头部导航栏
.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
  padding:0px 0px;
  .left {
    width: 100px;
    .switch {
      float: left;
    }
  }
  /deep/.tabs {
    height: 60px;
    overflow: hidden;
    max-width: 70%;
    .el-tabs__item{
    color: #fff;
    height: 49px;
    &.is-active{
      color: #0DD7DC;
      border-bottom: 2px solid #0DD7DC !important;
    }
  }
  }
  /deep/ .right {
    width: 200px;
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
}
</style>
