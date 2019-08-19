<template>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <h3></h3>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</template>