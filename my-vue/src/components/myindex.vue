<template>
  <el-container  class="hl-container">
    <!--头部区域-->
    <!--TODO 内容区设置宽撑起整个界面 避免整个界面滚动-->
    <el-header style="width: 100%">
      <div style="display: flex;align-items: center">
        <!--<img style="width: 74px;height: 37px" src="../image/logo.png"/>-->
        <span style="margin-left: 15px">{{nowUserName}}</span>
      </div>
      <iv></iv>

      <el-button type="info" @click="goLogin" style="background-color: darkslategray; color: #42b983;" >退出系统</el-button>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ?'64px':'200px'" >
        <div class="toggle-button" @click="toggleClick"><i :class="iconColor"></i></div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="1" route="/webcome">
            <i class="el-icon-menu"></i>
            <span slot="title">我的首页</span>
          </el-menu-item>
          <el-submenu index="2" v-h="'serverMenu'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" route="/userInfo" v-h="'userInfoMenu'">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-2" route="/roleInfo" v-h="'roleInfoMenu'">
                <template slot="title">
                  <i class="el-icon-s-check"></i>
                  <span>角色管理</span>
                </template>
              </el-menu-item>
              <el-menu-item  index="2-3" route="/permiss" v-h="'menuInfoMenu'" >
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span>菜单管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-h="'lsps'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>LSP</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" route="/threeLetter" v-h="'threeLetter'">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>三字母管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="padding: 5px">
        <!--面包屑-->
        <el-breadcrumb class="el-bread" separator-class="el-icon-wind-power">
          <!--导航栏-->
          <el-breadcrumb-item :to="{path:'/webcome'}">
            <el-tag style="cursor: pointer;" color="#606266" type="success">我的首页</el-tag>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-model="MenuList"
                              v-for=" item in MenuList" :key="item.meta.title" :to="item.path">
            <el-tag color="#606266" style="cursor: pointer;" type="success" closable
                    @close="handleClose(item.meta.title)">{{item.meta.title}}
            </el-tag>

          </el-breadcrumb-item>
        </el-breadcrumb>
        <hr>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import iv from '../iview/iviews'
  import config from "../mixin/allPram";
  export default {
    components: {
      iv
    },
    name: "myindex",
    watch: {
      $route(val) {
        //  console.log(this.Titles.hasOwnProperty("1"))
        console.log(val)
        /*面包屑 自动增长*/
        console.log(this.Titles.indexOf(val.meta.title))
        if (this.Titles.indexOf(val.meta.title) >= 0) {
          console.log("包含了")
          return
        } else {
          this.MenuList.push(val)
          this.Titles.push(val.meta.title)
        }
      }
    },
    data() {
      return {
        nowUserName:'',
        activeName: 'webcome',
        isCollapse: false,
        iconColor: 'el-icon-c-scale-to-original',
        MenuList: [],
        Titles: ['我的首页'],//面包屑标题集合
        menu1: ''
      }
    },
    methods: {
      /*左侧菜蛋栏折叠*/
      toggleClick() {
        this.isCollapse = !this.isCollapse
      },
      /*跳转登录页*/
      goLogin() {
        this.$router.push("/")
      },
      //导航栏去除标签方法
      handleClose(tag) {
        var indexO = this.MenuList.map(item => item.meta.title).indexOf(tag);
        this.Titles.splice(this.Titles.indexOf(tag), 1)
        this.MenuList.splice(indexO, 1)
        this.$router.push("/myindex")
      }
    },
    created(){
      this.nowUserName=sessionStorage.getItem(config.PARAM_KEY.LOGIN_USER_NAME)
    }
  }
</script>

<style scoped>
  /*面包屑导航栏设置css*/
  .el-bread {
    background-color: slategray;
    line-height: 45px;
    padding-left: 3px;
    border-radius: 2%;
  }

  .hl-container {
    height: 100%;
  }

  /*头部区域设置*/
  .el-header {
    background-color: darkslategray;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    color: #42b983;
    font-size: 20px;
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-menu {
    border-right: none;
  }

  .el-main {
    /*background-color: azure;*/
  }

  /*侧边栏收缩按钮设置*/
  .toggle-button {
    background-color: #545c64;
    text-align: center;
    font-size: 25px;
    line-height: 24px;
    color: rosybrown;
    letter-spacing: 0.2em;
    cursor: pointer;
    font-weight: normal;
  }
</style>
