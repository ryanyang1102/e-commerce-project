<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
    };
  },
  methods: {
    signout() {
      const api = process.env.APIPATH;
      const url = `${api}/logout`;
      const vm = this;
      vm.$http.post(url).then((response) => {
        console.log(response.data);
        if (response.data.success){
          vm.$router.push('/login');
        };
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  /* scoped 代表此設定只限目前元件檔案 */
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
