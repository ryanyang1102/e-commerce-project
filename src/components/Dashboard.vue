<template>
  <div>
    <Navbar></Navbar>            <!-- 記得將拆出去的元件載入放回原本的位置 -->
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>   <!-- 代表子元件的 template 預設呈現的地方 -->
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';    // 載入外部元件到此元件
import Sidebar from './Sidebar';

export default {                  // 匯出資料到此元件
  components: {
    Navbar,
    Sidebar,
  },
  created() {
    // 在 Products.vue 的外層元件來寫
    // 先將存好的 cookie 讀出（正規表達式）
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // 接著要將 cookie 往後端送
    if(token !== "") {
      this.axios.defaults.headers.common.Authorization = token;
    } else {
      this.$router.push('/login');
    };
  },
};
</script>
