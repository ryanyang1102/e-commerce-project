<template>
  <div>
    <loading :active.sync="isLoading"/>    <!-- 讀取中的程式碼 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 150px; background-size: cover; background-position: center"
            >
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 沒有優惠，只顯示原價 -->
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
              <!-- 有優惠，顯示原價 + 優惠價 -->
              <del class="h6" v-if="item.price">{{ item.origin_price | currency }}</del>
              <div class="h5" v-if="item.price">{{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁元件 -->
    <Pagination
      :pagination='pagination'
      @emitProductPage="getProducts" />
    <!-- Product-modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <div class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</div>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option value="" >-- 請選擇數量 --</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong v-if="!product.price">
                {{ product.num * product.origin_price }}
              </strong>
              <strong v-else>
                {{ product.num * product.price }}
              </strong>
              元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              加到購物車
            </button>
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
      products: [],
      product: {},
      // cart: {},
      isLoading: false,
      status: {
        loadingItem: '',
      },
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.products = response.data.products;
        // console.log(response);
        vm.pagination = response.data.pagination;
        vm.isLoading = false;

      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        // console.log(response);
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then(response => {
        // console.log(response);
        vm.status.loadingItem = '';
        $('#productModal').modal('hide');
      });
    },
  },
  created() {
    this.getProducts();
  },
}
</script>
