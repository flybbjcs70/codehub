import Vue from 'vue'
import ElementUI from 'element-ui'
import createDialog from '@zewen/create-dialog'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.use(ElementUI)
Vue.use(createDialog, {
  responseHander (res) {
    /* eslint-disable */
    if(res.success) {
      return '保存成功了'
    }
    throw new Error(res && res.message || '失败了')
  },
  successHandler (message) {
    Vue.prototype.$message({type: 'success', message: message})
  },
  failHandler (reason) {
    Vue.prototype.$message({type: 'error', message: reason && reason.message || reason})
  }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
