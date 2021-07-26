<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">品名</th>
        <th scope="col">數量</th>
        <th scope="col">單價</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cartData.carts" :key="item.id">
        <th scope="row">
          <i class="far fa-trash-alt"></i>
        </th>
        <td>{{ item.product.title }}</td>
        <td>{{ item.qty }} / {{ item.product.unit }}</td>

        <td v-if="!item.product.price">
          {{ item.product.origin_price }}
        </td>
        <td v-else>{{ item.product.price }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="text-end">總計</td>
        <td>{{ cartData.total }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="text-success text-end">折扣價</td>
        <td class="text-success">{{ item.final_total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      carts: {},
    }
  },
  created() {
    const vm = this;
      vm.$bus.$on('cartData', carts => {
        vm.carts = carts;
      }
    );
  },
}
</script>
