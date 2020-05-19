import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import {Tabs, Tab} from 'vue-tabs-component';
require("dotenv").config(require('find-config')('.env'));

Vue.component("tabs", Tabs);
Vue.component('tab', Tab);


Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GAPIKEY,
    libraries: "geometry,drawing,places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')