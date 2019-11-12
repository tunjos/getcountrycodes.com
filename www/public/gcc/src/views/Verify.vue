<template>
  <div>
    <h1>This is a Verification Page</h1>
    <div v-if="errors && errors.length > 0">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
    <br />
    <br />
    <button
      v-if="canLogin && errors.length == 0"
      type="submit"
      @click="$router.push({ path: '/login' })"
    >
      Login
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { GccApi } from "../common/GccApi";

export default {
  name: "verify",
  components: {
    HelloWorld
  },
  data: () => ({
    errors: [],
    canLogin: false,
    message: null
  }),
  created: function() {
    this.startProgressBar();
    var verify_token = this.$route.params.token;
    if (this.validateToken(verify_token)) {
      this.verify(verify_token);
    } else {
      this.errors.push("Invalid verification token provided");
    }
  },
  methods: {
    validateToken: function(token) {
      this.errors = [];
      return token.length == 64;
    },
    verify: function(token) {
      this.startProgressBar();
      GccApi.verify({
        verify_token: token
      })
        .then(response => {
          this.finishProgressBar();
          this.canLogin = true;
          this.message = response.data.message;
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
