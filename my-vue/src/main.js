import Vue from 'vue'
import App from './App'
import router from  './router/index'
import elementUi from 'element-ui'
import mixin from './mixin'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css'
import  echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(elementUi)
Vue.prototype.$echarts=echarts

new Vue({
  el: '#app',
  router,
  components: { App },
  template:'<App/>'
})
