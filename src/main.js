import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/store";
import Router from 'vue-router';
import 'lib-flexible/flexible.js';
import 'font-awesome/css/font-awesome.css'
import vueWechatTitle from "vue-wechat-title";
import coreConfig from "@/core/core.config.js";
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);

Vue.use(vueWechatTitle);
Vue.use(coreConfig);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
