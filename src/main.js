// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import App from './App'
import router from './router'
import store from './store'
import  Router from 'vue-router'
// import store from './store'
import ElementUI from 'element-ui'
import request from './utils/request'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import './icons' // icon
import './permission' // permission control

var axios=require('axios')
axios.default.baseURL='https://www.chencloud.asia/backstage'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.req = request

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
