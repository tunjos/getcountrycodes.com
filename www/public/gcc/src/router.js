import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Logout")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard")
    },
    {
      path: "/verify/:token",
      name: "verify",
      component: () => import("@/views/Verify")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "@/views/About")
    }
  ]
});
