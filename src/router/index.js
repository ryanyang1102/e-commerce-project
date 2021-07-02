import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',             // 假如頁面路徑不屬於以下路徑
      redirect: 'login',     // 則會跳轉到登入頁面
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',        // 路徑儘量打小寫
      name: 'Login',
      component: Login,
    },
  ],
});
