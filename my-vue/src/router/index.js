import Vue from 'vue'
import logins from '../components/login'
import myindex from '../components/myindex'
import welcome from '../components/welcome'
import userInfo from '../components/userInfo'
import roleInfo from '../components/roleInfo'
import permiss from '../components/permiss'
import threeLetter from '../components/threeLetter'
import config from "../mixin/allPram";

import VueRouter from 'vue-router'
/**
 * 重写路由的push方法清除警告信息
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)

const router = new VueRouter({
  //mode:'history',
  routes: [
    {
      path: '/',
      component: logins
    },  {
      path: '/myindex',
      component: myindex,
      redirect: '/webcome',
      children: [
        {
          path: '/webcome',
          component: welcome,
          meta:{
            title:'我的首页'
          }
        },
        {
          path: '/userInfo',
          component: userInfo,
          meta: {
            title: '用户管理'
          }
        }, {
          path: '/roleInfo',
          component: roleInfo,
          meta: {
            title: '角色管理'
          }
        },{
          path: '/permiss',
          component: permiss,
          meta:{
            title:'权限管理'
          }
        },{
          path: '/threeLetter',
          component: threeLetter,
          meta:{
            title:'三字母管理'
          }
        },
      ]
    }
  ]
})
/*钩子函数,如果没登录情况下返回登录界面*/
router.beforeEach((to, from, next) => {
  console.log("钩子函数执行")
  /*获取路径*/
   var info=sessionStorage.getItem(config.PARAM_KEY.LOGIN_USER_NAME)
  console.log("获取当前登录名称"+info)
   if (info) {
     next();
   }else {
     console.log(to.path)
    if (to.path=='/'){
      next();
    }else {
      next("/")
    }
   }
})
export default router
