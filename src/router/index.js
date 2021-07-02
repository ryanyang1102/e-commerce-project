import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',        // 路徑儘量打小寫
      name: 'Login',
      component: Login,
    },
  ],
});
