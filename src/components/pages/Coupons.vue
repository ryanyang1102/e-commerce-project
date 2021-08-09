<template>
  <div>
    <loading :active.sync="isLoading"/>    <!-- 讀取中的程式碼 -->
    <div class="text-right mt-4">
      <button class="btn btn-primary"
        @click="openModal(true)">
        建立優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th width="120">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-center">
            {{ item.code }}
          </td>
          <td class="text-center">
            {{ item.percentage }}%
          </td>
          <td class="text-center">
            {{ item.due_date | date }}
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
              @click="openModal(false, item)"
              >
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
    <Pagination :pagination='pagination' @emitProductPage="getCoupons" />

    <!-- couponModal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input type="text" class="form-control" id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入優惠券名稱">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="coupon_percent">折扣百分比</label>
              <input type="number" class="form-control" id="coupon_percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date"
                placeholder="請輸入到期日">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteModal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券（ 刪除後將無法恢復 ）。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deleteCoupon"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},                         // 存放 Modal 欄位內容資料
      isNew: false,                           // 開啟的 modal 是否是新增優惠券
      due_date: new Date(),     // 取得日期選單時間 (Wed Jan 13 2021 23:00:30 GMT+0800 (台北標準時間))
      pagination: {},
      isLoading: false,                       // vue-loading 是否顯示讀取中效果
    };
  },
  watch: { // 偵測到 due_date 屬性的變化後觸發
    due_date() {
      const vm = this;
      // 把日期選單時間放進 new Date 轉成 timestamp (除1000是為了把 毫秒 轉成 秒)
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;   // 將遠端的產品資料放進 data 的 coupons 陣列
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      const vm = this;
      vm.isNew = isNew;
      if (vm.isNew) {
        // console.log(vm.tempCoupon.due_date);
        //使用判斷式，透過第一個參數是否為 true 來判定是新增優惠券還是編輯優惠券
        vm.tempCoupon = {};
      } else {
        // 使用 Object.assign 將 item 放入一個空物件，再放入 tempProduct 裡。避免傳參考。
        vm.tempCoupon = Object.assign({}, item);
        // console.log(vm.tempCoupon.due_date);
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T')[0];
        vm.due_date = dateAndTime;
      };
      $('#couponModal').modal('show');         // 選取設有 id 的元素，以 modal 方式開啟
    },
    deleteModal(item){
      this.tempCoupon = item;
      $('#delCouponModal').modal('show');
    },
    deleteCoupon() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then((response) => {
        // console.log(response.data);
        if (!response.data.success) {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
          console.log('刪除失敗！');
        } else {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
        }
        vm.isLoading = false;
      });
    },
    updateCoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {            // 新增成功時，將 modal 視窗關閉，並再次請求遠端資料（等於重新整理）
          $('#couponModal').modal('hide');
          vm.getCoupons();
        } else {
          $('#couponModal').modal('hide');
          vm.getCoupons();
          console.log('新增失敗！');              // 失敗跑出錯誤訊息
        };
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
