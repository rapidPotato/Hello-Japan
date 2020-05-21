import Vue from "vue";
import Vuex from "vuex";
import * as VueGoogleMaps from "vue2-google-maps";
import { Tabs, Tab } from "vue-tabs-component";
import moment from "moment";
import App from "./App.vue";
// require("dotenv").config(require("find-config")(".env"));
require("dotenv").config();

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
    // restaurantInfo: {},
    randomQuote: {},
    horoscopeInfo: {},
    currentRestaurantInfo: {},
    initialRestaurantInfo: {},
    markers: [],
  },
  mutations: {
    updateCity: (state, newCity) => {
      state.currentCity = newCity;
    },
    updateMarkers: (state, markers) => {
      state.markers = markers;
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
    },
    updateRestaurantsInfo: (state, restaruantInfoObj) => {
      state.initialRestaurantInfo = restaruantInfoObj;
    },
    updateCurrentRestaurantsInfo: (state, restaurantInfoObj) => {
      state.currentRestaurantInfo = restaurantInfoObj;
    },
    updateRandomQuote: (state, quote) => {
      state.randomQuote = quote;
      console.log(state.randomQuote);
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
