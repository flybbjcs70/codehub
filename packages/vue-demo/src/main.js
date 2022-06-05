import Vue from 'vue'
import ElementUI from 'element-ui'
import createDialog from 'create-dialog'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.use(ElementUI)
Vue.use(createDialog)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
