<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal">
        建立新的產品
      </button>
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
            <button class="btn btn-outline-primary btn-sm">
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="productModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';                  // 載入 jquery 並使用 "$" 變數來運行其語法

export default {                              // 將資料匯出到此元件使用
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
    openModal() {
      $('#productModal').modal('show');         // 選取設有 id 的元素，以 modal 方式開啟
    }
  },
  created() {
    this.getProducts();
  },
};
</script>
