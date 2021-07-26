<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <router-link aria-hidden="true" to="/cartTable" @click="cartData">
        <button class="btn btn-success btn-block">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.APIPATH}/logout`;
      vm.$http.post(url).then((response) => {
        console.log(response.data);
        if(response.data.success) {
          vm.$router.push('/signin');
        }
      });
    },
  },
};
</script>
