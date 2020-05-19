import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import {Tabs, Tab} from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB0qhsOaWDRRSUDjOVev-I2YClUKAQeYGQ",
    libraries: "geometry,drawing,places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
