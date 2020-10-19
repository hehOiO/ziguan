// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise';
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import router from './router'
import axios from './http'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify';

import * as filters from '@/components/fifter/fifter'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//引入
Vue.use(ElementUI);
Vue.use(SlideVerify);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(elTableInfiniteScroll);
promise.polyfill();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
