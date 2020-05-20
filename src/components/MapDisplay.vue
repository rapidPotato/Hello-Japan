<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="4"
      style="width:90%;  height: 500px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon = "{url: m.icon.url, anchor:anchor,origin:origin,scaledSize:scaledSize,size:size }"
        @click="center=m.position; updateCity(m.cityName)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import cityData from "../../data/index.js"

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
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      
    };
  },

  mounted() {
    this.geolocate();
  },

  created: function () {
      for(const city of cityData.locations) {
        let weatherIcon = cityData.weather.filter(el => { return el.name === city.name})
        weatherIcon=weatherIcon[0].mapWeather
        let weatherURL= this.mapWeatherObj[weatherIcon]
        this.addMarkerByLatLon(city.lat,city.lon,weatherURL,city.name)
      }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    updateCity(newCity) {
      console.log(this.$store.state.currentCity)
      let newWeather = cityData.weather.filter(el => { return el.name === newCity})
      this.$store.commit("updateCity",newCity)
      this.$store.commit("updateWeather",newWeather)
      console.log(this.$store.state.currentCity)
    },
    addMarkerByLatLon(newLat,newLon,weatherURL,cityName) {
      console.log(cityName)
      let image = {
        url: weatherURL
        // // This marker is 20 pixels wide by 32 pixels high.
        // size: new google.maps.Size(20, 32),
        // // The origin for this image is (0, 0).
        // origin: new google.maps.Point(0, 0),
        // // The anchor for this image is the base of the flagpole at (0, 32).
        // anchor: new google.maps.Point(0, 32)
      };

      const marker = {
        lat: newLat,
        lng: newLon
      }
        this.markers.push({ position: marker,icon:image,cityName:cityName});
        this.places.push(this.currentPlace);
        this.center = marker;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
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

<style scoped>

</style>
