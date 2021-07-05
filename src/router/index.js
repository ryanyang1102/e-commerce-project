import Vue from 'vue';
import Router from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',                        // 假如頁面路徑不屬於以下路徑
      redirect: 'login',                // 則會跳轉到登入頁面
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },     // 路由訊息，用來驗證登錄的基準
    // },
    {
      path: '/login',                   // 路徑儘量打小寫
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [                       // 子元件
        {
          path: 'products',             // 巢狀路由第二層以後不用加上 `/`
          name: 'Products',
          component: Products,          // 指向載入進來的產品子元件
          meta: { requiresAuth: true }, // 需登錄驗證才可切換到此頁面
        },
      ],
    },
  ],
});
