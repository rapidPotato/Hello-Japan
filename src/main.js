import Vue from "vue";
import Vuex from "vuex";
import * as VueGoogleMaps from "vue2-google-maps";
import { Tabs, Tab } from "vue-tabs-component";
require("dotenv").config(require("find-config")(".env"));
import moment from "moment";
import App from "./App.vue";

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);
Vue.prototype.moment = moment;

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GAPIKEY,
    libraries: "geometry,drawing,places", // necessary for places input
  },
});

const store = new Vuex.Store({
  state: {
    currentCity: "",
    currentWeather: {},
    initialWeather: {},
    coronaInfo: {},
    restaurantInfo: {},
    horoscopeInfo: {},
    currentRestaurantInfo: {},
    initialRestaurantInfo: {},
  },
  mutations: {
    updateCity: (state, newCity) => {
      state.currentCity = newCity;
    },
    updateWeather: (state, newWeather) => {
      state.currentWeather = newWeather;
    },
    updateInitialWeather: (state, weatherObj) => {
      state.initialWeather = weatherObj;
    },
    updateInitialRestaurantInfo: (state, initialRestaurantObj) => {
      state.initialRestaurantInfo = initialRestaurantObj;
    },
    updateCoronaInfo: (state, coronaInfoObj) => {
      state.coronaInfo = coronaInfoObj;
      // console.log("####CORONA INFO", state.coronaInfo);
    },
    updateRestaurantsInfo: (state, restaruantInfoObj) => {
      state.restaurantInfo = restaruantInfoObj;
    },
    updateRestaurantInfo: (state, restaurantInfoObj) => {
      state.currentRestaurantInfo = restaurantInfoObj;
      console.log("####Retaurant Info", state.currentRestaurantInfo);
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
