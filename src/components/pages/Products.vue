<template>
  <div>
    <loading :active.sync="isLoading"/>    <!-- 讀取中的程式碼 -->
    <div class="text-right mt-4">
      <button class="btn btn-primary"
        @click="openModal(true)">
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
          <th width="160">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
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
            <button class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm"
              @click="deleteModal(item)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Pagination :pagination='pagination' @emitProductPage="getProducts" />
    <!-- Product-modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="上傳圖片">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品（ 刪除後將無法恢復 ）。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deleteProduct"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';                       // 載入 jquery 並使用 "$" 變數來運行其語法
import Pagination from './Pagination';

export default {                              // 將資料匯出到此元件使用
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},                        // 存放 Modal 欄位內容資料
      pagination: {},
      isNew: false,                           // 開啟的 modal 是否是新增產品
      isLoading: false,                       // vue-loading 是否顯示讀取中效果
      status: {
        fileUploading: false,                 // animating-icons 是否顯示讀取中效果
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      // API 伺服器路徑
      // 所申請的 APIPath
      // 帶入環境變數：伺服器來源 及 API路徑
      //console.log(process.env.APIPATH,process.env.CUSTOMPATH);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;   // 將遠端的產品資料放進 data 的 products 陣列
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        //使用判斷式，透過第一個參數是否為 true 來判定是新增產品還是編輯產品
        this.tempProduct = {};
        this.isNew = true;
      } else {
        // 使用 Object.assign 將 item 放入一個空物件，再放入 tempProduct 裡。避免傳參考。
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');         // 選取設有 id 的元素，以 modal 方式開啟
    },
    deleteModal(item){
      this.tempProduct=item;
      $('#delProductModal').modal('show');
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        } else {
          $('#delProductModal').modal('hide');
          vm.getProducts();
          console.log('刪除失敗！');
        };
      });
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        if (response.data.success) {            // 新增成功時，將 modal 視窗關閉，並再次請求遠端資料（等於重新整理）
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗！');              // 失敗跑出錯誤訊息
        };
      });
    },
    uploadFile() {
      // console.log(this);
      const uploadedFile = this.$refs.files.files[0]; // 上傳檔案的位置
      const vm = this;
      const forData = new FormData();             // 使用 FormData 來模擬表單上傳
      forData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;             // 顯示讀取中效果
      vm.$http.post(url, forData, {
        headers: {
          'Content-Type': 'multipart/form-data'   // 指定 formdata 的格式
        }
      }).then((response) => {
        // console.log(response.data);
        vm.status.fileUploading = false;          // 關閉讀取中效果
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          // 使用 set 強制寫入才能雙向綁定。
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger');
        };
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
