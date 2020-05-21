<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="4" style="width: 90%; height: 500px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="{
          url: m.icon.url,
          anchor: anchor,
          origin: origin,
          scaledSize: scaledSize,
          size: size,
        }"
        @click="
          center = m.position;
          updateCity(m.cityName);
        "
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import cityData from "../../data/index.js";

export default {
  name: "MapDisplay",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      scaledSize: { width: 30, height: 30, f: "px", b: "px" },
      size: { width: 60, height: 90, f: "px", b: "px" },
      origin: { x: 0, y: 0 },
      anchor: { x: 15, y: 15 },
      center: { lat: 39.5, lng: 135.7 },
      markers: [],
      places: [],
      currentPlace: null,
      mapWeatherObj: {
        Sun:
          "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-day-sunny.svg",
        Snow: "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-snow.svg",
        Rain: "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-rain.svg",
        Lightning:
          "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-lightning.svg",
        Clouds:
          "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-day-cloudy.svg",
      },
    };
  },

  mounted() {
    this.geolocate();
  },

  created: function () {
    // console.log(this.$store.state.initialWeather)
    for (const city of cityData["locations"]) {
      // console.log(city,'in map.vue created')
      let weatherIcon =
        "http://localhost:8080" +
        this.$store.state.initialWeather[city.name]["weather"]["icon"];
      this.addMarkerByLatLon(city.lat, city.lon, weatherIcon, city.name);
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    updateCity(newCity) {
      let newWeather = this.$store.state.initialWeather[newCity];
      let newRestaurant = this.$store.state.initialRestaurantInfo[newCity];
      console.log(this.$store.state.initialRestaurantInfo)
      this.$store.commit("updateCity", newCity);
      this.$store.commit("updateWeather", newWeather);
      this.$store.commit("updateRestaurantInfo", newRestaurant);
      // console.log(this.$store.state.currentWeather)
    },
    addMarkerByLatLon(newLat, newLon, weatherURL, cityName) {
      let image = {
        url: weatherURL,
      };

      const marker = {
        lat: newLat,
        lng: newLon,
      };
      this.markers.push({ position: marker, icon: image, cityName: cityName });
      this.places.push(this.currentPlace);
      this.center = marker;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>

<style scoped></style>
