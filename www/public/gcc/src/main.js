import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProgressBar from "vue-progressbar";
import progressBarMixin from "./mixins/progressBarMixin";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "2px"
});
Vue.mixin(progressBarMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
