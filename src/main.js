// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 第三方套件
import Vue from 'vue';             // 當路徑沒有看到 './' 時，都是直接從 node_modules 載入
import axios from 'axios';         // 主要 AJAX 套件
import VueAxios from 'vue-axios';  // 將 axios 轉為 vue 的套件

// 自行增設的檔案
import App from './App';
import router from './router';     // 載入資料夾時，預設就會載入 index.js 的檔案，所以後面可以省略

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
