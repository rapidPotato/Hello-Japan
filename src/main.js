import Vue from "vue";
import Vuex from "vuex";
import * as VueGoogleMaps from "vue2-google-maps";
import { Tabs, Tab } from "vue-tabs-component";
import moment from "moment";
import App from "./App.vue";
import VueDarkMode from '@growthbunker/vuedarkmode';

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
Vue.use(VueDarkMode, {
  // Specify the theme to use: dark or light (dark by default).
  theme: "dark",

  // Specify the components to declare globally in your project
  // When undefined, null or given an empty array, all components will be imported
  components: [
    // Base components
    "alert", "avatar", "badge", "button", "divider", "heading", "icon",  "progress-bar",  "spinner",

    // Field components
    "checkbox", "file", "image-uploader", "input", "input-numeric", "label", "message", "radios", "select", "tabs", "textarea", "toggle"
  ]
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
      state.restaurantInfo = restaruantInfoObj;
    },
    updateRestaurantInfo: (state, restaurantInfoObj) => {
      state.currentRestaurantInfo = restaurantInfoObj;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
