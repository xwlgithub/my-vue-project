import  './msg'
import  allParam from './allPram'
import  Vue from  'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 配置全局请求头
const  instance=axios.create({
  baseURL:'http://localhost:5555/api'
})
Vue.prototype.$http=instance
Vue.mixin({
  methods: {
    $get(url, data) {
      return instance.get(url, {
        params: data
      }).catch(err => {
        console.log(err)
        if (err.message === 'Network Error') {
          this.$message({
            message: '服务器异常',
            type: 'warning',
            duration:2000,
            showClose:true
          });
        }
      })
    },
    $post(url, data) {
      var pdd = instance.post(url, data)
      pdd.catch(err => {
        console.log(err.message)
        if (err.message === 'Network Error') {
          this.$message({
            message: '服务器异常',
            type: 'warning',
            duration:2000,
            showClose:true
          });
        } else {
          if (err.message === 'Request failed with status code 404') {
            this.$message({
              message: '服务器异常',
              type: 'warning',
              duration:2000,
              showClose:true
            });
          }
        }
      })
      return pdd
    }
  }
})
/**
 * tocken全局配置
 */
instance.interceptors.request.use(
  config => {
    //在你的sessionStorage取到token的值
    const tokenValue=sessionStorage.getItem(allParam.PARAM_KEY.access_tocken);
    if (tokenValue) {
      config.headers['access_tocken'] = tokenValue;
    }
    return config
  },
  error => {
    console.log(error)
  }
)
Vue.use(VueAxios,axios)
/**权限指令**/
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      //console.log("指令打印"+binding.value)
      //console.log("打印el"+el.parentNode)
      el.parentNode.removeChild(el);
    }
  }
});
//权限检查方法
Vue.prototype.$_has = function(value) {
  // debugger
  let isExist=false;
  let buttonpermsStr=sessionStorage.getItem(allParam.PARAM_KEY.BUTTONS);
  //console.log("打印按钮权限信息"+buttonpermsStr.BUTTONS)
  if(buttonpermsStr==undefined || buttonpermsStr==null){
    return false;
  }
  let strings =buttonpermsStr.split(",").toString()
  if (strings.indexOf(value)>=0){
    return true;
  } else {
    return false
  }
  return isExist;
};
//权限指令 动态菜单展示
Vue.directive('h', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_h(binding.value)) {
      //console.log("指令打印"+binding.value)
      //console.log("打印el"+el.parentNode)
      el.parentNode.removeChild(el);
    }
  }
});
//权限检查方法
Vue.prototype.$_h = function(value) {
  // debugger
  let isExist=false;
  let buttonpermsStr=sessionStorage.getItem(allParam.PARAM_KEY.MENUS);
  console.log("打印菜单"+buttonpermsStr)
  if(buttonpermsStr==undefined || buttonpermsStr==null){
    return false;
  }
  let strings =buttonpermsStr.split(",").toString()
  //console.log(strings)
  if (strings.indexOf(value)>=0){
    console.log(strings.indexOf(value))
    return true;
  } else {
    return false
  }
  return isExist;
};
