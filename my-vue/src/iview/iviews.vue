<template>
  <div >
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :collapse-transition="false"
    background-color="darkslategray"
    text-color="#42b983"
    active-text-color="#DCDFE6">
    <el-menu-item index="1" >博客地址</el-menu-item>
    <el-menu-item index="2" >源码地址</el-menu-item>
    <el-menu-item index="3">系统说明</el-menu-item>
  </el-menu>
  </div>
</template>

<script>
    export default {
        name: "iviews"
    }
</script>

<style scoped>
  /*去除顶栏下线*/
.el-menu{
  border-bottom: none;
}
</style>
