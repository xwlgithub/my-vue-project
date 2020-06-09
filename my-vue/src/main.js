import Vue from 'vue'
import App from './App'
import router from  './router/index'
import elementUi from 'element-ui'
import mixin from './mixin'
//import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import './css/global.css'
Vue.config.productionTip = false
// Vue.use(VueAxios,axios)
Vue.use(elementUi)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
