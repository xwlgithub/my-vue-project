import  './msg'
import  './allPram'
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
Vue.use(VueAxios,axios)
