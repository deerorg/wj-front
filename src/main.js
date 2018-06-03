// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import bus from './store/bus'
import { Form, FormItem, Input, Checkbox, Button, Message, MessageBox, Submenu, Menu, MenuItem, Icon } from 'element-ui'
import 'normalize.css'
import 'common/scss/base.scss'
import 'common/scss/element-ui.scss'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(require('vue-wechat-title'))
Vue.prototype.$bus = bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
