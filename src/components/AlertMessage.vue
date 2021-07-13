<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="`alert-${ item.status }`"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [
        // {
        //   message: '訊息內容',
        //   status: 'danger',
        //   timestamp: 123,
        // }
      ],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({           // data 的 messages 將傳入的參數
        message,                     // 訊息文字的內容
        status,                      // 文字樣式 (bootstrap的樣式)
        timestamp,                   // 訊息 id
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);  // 點擊 alert 的'X'來關閉
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {             // 彈跳視窗 5 秒後關閉
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$emit('message:push');   // 這一行要放在 Products 裡
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
