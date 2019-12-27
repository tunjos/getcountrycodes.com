<template>
  <div class="logout">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span>Logging out...</span>
  </div>
</template>

<script>
import { GccApi } from "@/common/GccApi";

export default {
  name: "logout",
  data: () => ({
    errors: []
  }),
  created: function() {
    this.logout();
  },
  methods: {
    logout: function() {
      this.startProgressBar();
      GccApi.logout()
        .then(response => {
          this.finishProgressBar();
          this.$router.replace({ path: "/" });
        })
        .catch(error => {
          if (error.response) {
            this.errors.push(error.response.data.message);
          }
          console.log(error);
          this.failProgressBar();
        });
    }
  }
};
</script>
