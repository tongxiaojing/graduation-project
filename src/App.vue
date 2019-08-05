<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">登录</router-link>|
      <router-link to="/home">主页</router-link> 
    </div> -->
    <router-view/>
  </div>
</template>
<style lang="less">
@import './common/indexs.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   height: 100%;
}
body,html{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#nav {
  height:100%;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
