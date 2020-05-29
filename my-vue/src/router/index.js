import Vue from 'vue'
import logins from '../components/login'
import myindex from '../components/myindex'
import welcome from '../components/welcome'
import userInfo from '../components/userInfo'
import roleInfo from '../components/roleInfo'
import permiss from '../components/permiss'

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
        },
      ]
    }
  ]

})
export default router
