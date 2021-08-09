<template>
  <div>
    <loading :active.sync="isLoading"/>
    <table class="table my-3">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">品名</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <th class="align-middle">
            <button class="btn btn-outline-danger btn-sm" type="button"
              @click="deleteModal(item)">
              <i class="far fa-trash-alt"></i>
            </button>
          </th>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券「{{ item.coupon.title }}」，折扣 {{ item.coupon.percent }}%
            </div>
          </td>
          <td class="align-middle">
            {{ item.qty }} / {{ item.product.unit }}
          </td>

          <td v-if="!item.product.price" class="align-middle">
            {{ item.product.origin_price }}
          </td>
          <td v-else class="align-middle">
            {{ item.product.price }}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3"  class="text-success text-right">折扣價</td>
          <td class="text-success text-right">{{ cart.final_total }}</td>
        </tr>
      </tbody>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control"
        v-model="coupon_code" placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
          @click="addCouponCode">
          套用優惠碼
        </button>
      </div>
    </div>
    <!-- deleteModal -->
    <div class="modal fade" id="delCartModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除購物品項</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCart.product.title }}</strong> 品項（ 刪除後將無法恢復 ）。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="removeCartItem(tempCart.id)"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
      cart: {},
      tempCart: {
        product: {},
      },
      coupon_code: '',
    }
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        console.log(response);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    deleteModal(item){
      this.tempCart = item;
      this.tempCart.product = item.product;
      $('#delCartModal').modal('show');
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then((response) => {
        if(response.data.success) {
          vm.getCart();
          $('#delCartModal').modal('hide');
          vm.isLoading = false;
        }
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then((response) => {
        console.log(response.data);
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart()
  },
}
</script>
