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
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin"></i>
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
  </div>
</template>

<script>
import Pagination from './Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      isLoading: false,
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
        console.log(response);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
  },
  mounted() {
    this.getProducts();
  },
}
</script>
