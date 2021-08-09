// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 從 npm 下載安裝的第三方套件
import Vue from 'vue';             // 當路徑沒有看到 './' 時，都是直接從 node_modules 載入
import axios from 'axios';         // 主要 AJAX 套件
import VueAxios from 'vue-axios';  // 將 axios 轉為 vue 的套件
import Loading from 'vue-loading-overlay';         // 讀取中效果套件
import 'vue-loading-overlay/dist/vue-loading.css'; // 讀取中效果套件的 css 檔
import 'bootstrap';                // 引號裡面的 bootstrap 為路徑來源

// 自行增設的檔案
import App from './App';
import router from './router';     // 載入資料夾時，預設就會載入 index.js 的檔案，所以後面可以省略
import './bus';                    // 注入 bus.js檔 ( Even Bus )
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  // console.log('to:', to, 'from:', from, 'next:', next);
  if(to.meta.requiresAuth) {
    const api = process.env.APIPATH;
    const url = `${api}/api/user/check`;    // 這邊要使用 axios 套件來請求
    axios.post(url).then((response) => {    // 請求驗證不需傳送 user 資料
      // console.log(response.data);
      if (response.data.success){
        next();                             // 成功登入則放行切換頁面
      } else {
        next({
          path: '/login',                   // 未登入則切換到登入頁面
        });
      };
    });
  } else {
    next();
  }
});
