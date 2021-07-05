<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price }}
          </td>
          <td class="text-right">
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">
              啟用
            </span>
            <span v-else>
              未啟用
            </span>
          </td>
          <td>
            <botton class="btn btn-outline-primary btn-sm">
              編輯
            </botton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {                         // 將資料匯出到此元件使用
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      // API 伺服器路徑
      // 所申請的 APIPath
      // 帶入環境變數：伺服器來源 及 API路徑
      //console.log(process.env.APIPATH,process.env.CUSTOMPATH);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;   // 將遠端的產品資料放進 data 的 products 陣列
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
