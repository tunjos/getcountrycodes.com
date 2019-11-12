<template>
  <div>
    <h1>This is a Registration Page</h1>
    <input type="text" name="name" placeholder="Your Name" />
    <br />
    <br />
    <input type="email" name="email" placeholder="Your Email" />
    <br />
    <br />
    <input type="password" name="password" placeholder="Your Password" />
    <br />
    <br />
    <button type="submit">Register</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "register",
  components: {
    HelloWorld
  }
};
</script>
