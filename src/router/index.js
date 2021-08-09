import Vue from 'vue';
import Router from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CartTable from '@/components/pages/CartTable';

Vue.use(Router);

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
        {
          path: 'coupons',                   // 優惠券路徑
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',                    // 訂單列表路徑
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',         // 注意路徑不可大寫
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'cart_table',  // 購物車路徑
          name: 'CartTable',
          component: CartTable,
        },
      ],
    },
  ],
});
