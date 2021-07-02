<template>
  <div id="app">
    <router-view />
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
