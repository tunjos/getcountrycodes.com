<template>
  <div>
    <h1>This is a Login Page</h1>
    <form id="loginForm" @submit="validateLogin" novalidate="true">
      <div v-if="errors && errors.length > 0">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        placeholder="Your Email"
      />
      <br />
      <br />
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="Your Password"
      />
      <br />
      <br />
      <button type="submit" @click="validateLogin">Login</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { GccApi } from "../common/GccApi";

export default {
  name: "login",
  components: {
    HelloWorld
  },
  data: () => ({
    errors: [],
    email: null,
    password: null
  }),
  methods: {
    startProgressBar() {
      this.$Progress.start();
    },
    finishProgressBar() {
      this.$Progress.finish();
    },
    failProgressBar() {
      this.$Progress.fail();
    },
    validateLogin: function(e) {
      this.errors = [];
      e.preventDefault();

      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.password) {
        this.errors.push("password required.");
      }

      if (this.errors.length) {
        return false;
      } else {
        this.login();
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    login: function() {
      this.startProgressBar();
      GccApi.login({
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.finishProgressBar();
          this.$router.replace({ path: "/dashboard" });
          console.log(response);
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
