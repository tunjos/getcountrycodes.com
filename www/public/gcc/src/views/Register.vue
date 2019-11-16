<template>
  <div>
    <h1>This is a Registration Page</h1>
    <form
      id="RegistrationForm"
      @submit="validateRegistration"
      novalidate="true"
    >
      <div v-if="errors && errors.length > 0">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
        <button
          v-if="canLogin && errors.length == 0"
          type="submit"
          @click="$router.push({ path: '/login' })"
        >
          Login
        </button>
        <br />
        <br />
      </div>

      <input
        id="fullname"
        v-model="fullname"
        type="text"
        name="fullname"
        placeholder="Your Full Name"
      />
      <br />
      <br />
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
      <button type="submit" @click="validateRegistration">Register</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { GccApi } from "@/common/GccApi";

export default {
  name: "register",
  components: {
    HelloWorld
  },
  data: () => ({
    errors: [],
    fullname: null,
    firstname: null,
    surname: null,
    email: null,
    password: null,
    canLogin: false,
    message: null,
    showRegister: true
  }),
  methods: {
    validateRegistration: function(e) {
      this.errors = [];
      e.preventDefault();

      if (!this.fullname) {
        this.errors.push("Full Name required.");
      }

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
        this.splitFullname(this.fullname);
        this.register();
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    splitFullname: function(fullname) {
      var fullnameArray = fullname.trim().split(" ");
      this.firstname = fullnameArray.splice(0, 1);
      this.surname = fullnameArray.join("");
    },
    register: function() {
      this.startProgressBar();
      GccApi.register({
        firstname: this.firstname,
        surname: this.surname,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.finishProgressBar();

          if (response.data.code == 0) {
            showRegister: true;
            this.message = response.data.message;
          }
          console.log(response);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data.error_code == 0) {
              // Create a unique code for aready registered, inactive, unverified
              this.message = err.response.data.message;
              this.canLogin = true;
            }
          }
          console.log(err);
          this.failProgressBar();
        });
    }
  }
};
</script>
