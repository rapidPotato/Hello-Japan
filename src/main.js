import Vue from 'vue'
import Vuex from 'vuex'
import * as VueGoogleMaps from "vue2-google-maps";
import {Tabs, Tab} from 'vue-tabs-component';
require("dotenv").config(require('find-config')('.env'));
console.log(process.env.VUE_APP_GAPIKEY)

import App from './App.vue'

Vue.component("tabs", Tabs);
Vue.component('tab', Tab);


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GAPIKEY,
    libraries: "geometry,drawing,places" // necessary for places input
  }
});


const store = new Vuex.Store({
  state: {
    currentCity: '',
    currentWeather: {}
  },
  mutations: {
    updateCity: (state, newCity) => {
      state.currentCity = newCity
    },
    updateWeather: (state, newWeather) => {
      state.currentWeather = newWeather
    },
  }
})


new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
