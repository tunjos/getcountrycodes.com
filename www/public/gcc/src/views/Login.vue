<template>
  <div class="h-full mx-auto bg-white w-1/3 rounded-lg shadow-lg p-8">
    <h1 class="mb-6">GetCountryCodes Login</h1>
    <form
      id="loginForm"
      @submit="validateLogin"
      novalidate="true"
      class="text-left mb-3"
    >
      <div v-if="errors && errors.length > 0">
        <b>Please correct the following error(s):</b>
        <ul class="text-sm text-red-600">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <label class="block mb-2">
        <span class="text-gray-700 font-bold">Email</span>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="form-input mt-1 block w-full"
          placeholder="Your Email"
        />
      </label>
      <label class="block mb-4">
        <span class="text-gray-700 font-bold">Password</span>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="form-input mt-1 block w-full"
          placeholder="Your Password"
        />
      </label>
      <router-link
        to="/forgot-password"
        class="block font-medium text-right text-sm text-indigo-600"
        >Forgot password?</router-link
      >
      <input
        type="checkbox"
        v-model="rememberMe"
        class="form-checkbox text-sm text-indigo-600"
      />
      Remember me
      <button
        class="btn shadow-lg btn-indigo w-full mt-4"
        type="submit"
        @click="validateLogin"
      >
        Login
      </button>
    </form>
    Don't have an account?
    <router-link to="/register" class="font-bold text-indigo-600">
      Register here.</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { GccApi } from "@/common/GccApi";

export default {
  name: "login",
  components: {
    HelloWorld
  },
  data: () => ({
    errors: [],
    email: null,
    password: null,
    rememberMe: false
  }),
  methods: {
    validateLogin: function(e) {
      this.errors = [];
      e.preventDefault();

      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.password) {
        this.errors.push("Password required.");
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
<style src="@/assets/tailwind.css"></style>
