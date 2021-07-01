<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // API 伺服器路徑
    // 所申請的 APIPath
    // 帶入環境變數：伺服器來源 及 API路徑
    //console.log(process.env.APIPATH,process.env.CUSTOMPATH);
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<style lang="scss">
@import "./assets/all"; // all 後面的 scss 可省略
</style>
