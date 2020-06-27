<template>
  <div>
    <div class="row">
      <div class="col-12">
        <br />
        <gmap-map :center="center" :zoom="5" style="width:100%;  height: 500px;" :options="options">
          <gmap-marker
            :key="index"
            v-for="(m, index) in this.$store.state.markers"
            :position="m.position"
            :icon="{
          url: m.icon.url,
          anchor: anchor,
          origin: origin,
          scaledSize: scaledSize,
          size: size,
        }"
            @click="(center = m.position), updateCity(m.cityName)"
          ></gmap-marker>
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "../../data/index.js";
import mapStyles from "../../public/mapStyles.json";

export default {
  name: "MapDisplay",
  data() {
    return {
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
          "https://hellojapanapp-cc.herokuapp.com/icons/30x30/wi-day-sunny.svg",
        Snow: "https://hellojapanapp-cc.herokuapp.com/icons/30x30/wi-snow.svg",
        Rain:
          "https://hellojapanapp-cc.herokuapp.com/icons/weatherbitIcons/r01d.png",
        Lightning:
          "https://hellojapanapp-cc.herokuapp.com/icons/30x30/wi-lightning.svg",
        Clouds:
          "https://hellojapanapp-cc.herokuapp.com/icons/30x30/wi-day-cloudy.svg"
      },
      options: {
        styles: mapStyles
      }
    };
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    updateCity(newCity) {
      let newWeather = this.$store.state.initialWeather[newCity];
      let newRestaurant = this.$store.state.initialRestaurantInfo[newCity];
      this.$store.commit("updateCity", newCity);
      this.$store.commit("updateWeather", newWeather);
      this.$store.commit("updateCurrentRestaurantInfo", newRestaurant);
    },
    addMarkerByLatLon(newLat, newLon, weatherURL, cityName) {
      let image = {
        url: weatherURL
      };

      const marker = {
        lat: newLat,
        lng: newLon
      };
      this.markers.push({ position: marker, icon: image, cityName: cityName });
      this.places.push(this.currentPlace);
      this.center = marker;
    },
    addMarkerFromSearch() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };

        const weatherIcon = cityData.weather.filter(
          city => city.name === this.currentPlace.name
        )[0].mapWeather;
        const weatherURL = this.mapWeatherObj[weatherIcon];
        const image = {
          url: weatherURL
        };

        this.markers.push({
          position: marker,
          icon: image,
          cityName: this.currentPlace.name
        });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped></style>
