import Vue from 'vue'
import App from './App'
import router from  './router/index'
import elementUi from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css'
// 配置全局请求头
const  instance=axios.create({
  baseURL:'http://localhost:8080'
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
Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(elementUi)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
