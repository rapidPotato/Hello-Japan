<template>
  <div>
    <div>
      <h5 >Search and add a pin</h5>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarkerFromSearch">Add</button>
      </label>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="4"
      style="width:90%;  height: 500px;"
      :options="options"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon = "{url: m.icon.url, anchor: anchor, origin: origin, scaledSize: scaledSize, size:size }"
        @click="center=m.position; updateCity(m.cityName)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import cityData from "../../data/index.js"
import mapStyles from "../../public/mapStyles.json"
// import { gmapApi } from "vue2-google-maps";

export default {
  name: "MapDisplay",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      scaledSize: {width: 30, height: 30, f: 'px', b: 'px',},
      size: {width: 60, height: 90, f: 'px', b: 'px'},
      origin: {x: 0, y: 0},
      anchor: {x: 15, y: 15},
      center: { lat: 39.5, lng: 135.7 },
      markers: [],
      places: [],
      currentPlace: null,
      mapWeatherObj: {
        Sun: "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-day-sunny.svg",
        Snow: 'https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-snow.svg' ,
        Rain: "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-rain.svg",
        Lightning: 'https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-lightning.svg',
        Clouds: "https://helloworldapp-cc.herokuapp.com/icons/30x30/wi-day-cloudy.svg",
      },
      options: {
        styles: mapStyles
      }
    };
  },
  // mounted() {
  //   this.geolocate();
  // },

  created: function () {
      for(const city of cityData.locations) {
        let weatherIcon = cityData.weather.filter(el => { return el.name === city.name})
        weatherIcon=weatherIcon[0].mapWeather
        let weatherURL= this.mapWeatherObj[weatherIcon]
        this.addMarkerByLatLon(city.lat,city.lon,weatherURL,city.name)
      }
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    // updateCity(newCity) {
      
    // },
    addMarkerByLatLon(newLat,newLon,weatherURL,cityName) {
      let image = {
        url: weatherURL
      };

      const marker = {
        lat: newLat,
        lng: newLon
      }
        this.markers.push({ position: marker, icon: image, cityName: cityName});
        this.places.push(this.currentPlace);
        this.center = marker;
    },
    addMarkerFromSearch() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        // console.log(marker.lat, marker.lng)

        // look up weather so we can convert it to icon
        //TODO: should call weather API for weather icon code
        const weatherIcon = cityData.weather.filter(city => city.name === this.currentPlace.name)[0].mapWeather;
        //TODO: should use icon code from api to get image
        const weatherURL= this.mapWeatherObj[weatherIcon]
        const image = {
          url: weatherURL
        }

        this.markers.push({ position: marker, icon: image, cityName: this.currentPlace.name });
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
    },
  }
};
</script>

<style scoped>

</style>
