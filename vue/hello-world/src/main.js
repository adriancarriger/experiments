import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import {
  MdButton,
  MdContent,
  MdTabs
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import VueResource from 'vue-resource';

import auth from '@/auth'
import ExtendStyles from '@/components/extend-styles'

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(auth)
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(ExtendStyles)

Object.assign(Vue.http.options, {
  root: 'http://localhost:3000'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
