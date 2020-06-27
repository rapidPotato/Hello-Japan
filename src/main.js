import Vue from "vue";
import Vuex from "vuex";
import * as VueGoogleMaps from "vue2-google-maps";
import { Tabs, Tab } from "vue-tabs-component";
import moment from "moment";
import App from "./App.vue";

require("dotenv").config();

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);
Vue.prototype.moment = moment;

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GAPIKEY,
    libraries: "geometry,drawing,places",
  },
});

const store = new Vuex.Store({
  state: {
    currentCity: "",
    currentWeather: {},
    initialWeather: {},
    coronaInfo: {},
    randomQuote: {},
    horoscopeInfo: {},
    currentRestaurantInfo: {},
    initialRestaurantInfo: {},
    markers: [],
    quote: {},
  },
  mutations: {
    updateQuote: (state, quote) => {
      state.quote = quote;
    },
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
    updateCoronaInfo: (state, coronaInfoObj) => {
      state.coronaInfo = coronaInfoObj;
    },
    updateRestaurantsInfo: (state, restaurantInfoObj) => {
      state.initialRestaurantInfo = restaurantInfoObj;
    },
    updateCurrentRestaurantInfo: (state, restaurantInfoObj) => {
      state.currentRestaurantInfo = restaurantInfoObj;
    },
    updateRandomQuote: (state, quote) => {
      state.randomQuote = quote;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
