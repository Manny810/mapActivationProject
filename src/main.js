import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import AuthenticatedMain from "./views/Main.vue";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: "/", component: AuthenticatedMain, props: true },
  ],
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
