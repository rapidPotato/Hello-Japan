<template>
  <div id="app" class="container">
    <div class="row d-flex justify-content-center">
      <PageTitle id="PageTitle" />
    </div>
    <div class="row">
      <Clock id="Clock" />
    </div>
    <div class="row">
      <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12">
        <MapDisplay />
      </div>
      <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12">
        <SideDisplay id="SideDisplay" />
      </div>
    </div>
  </div>
</template>

<script>
import MapDisplay from "./components/MapDisplay.vue";
import SideDisplay from "./components/SideDisplay.vue";
import PageTitle from "./components/PageTitle.vue";
import Clock from "./components/Clock.vue";
import axios from "axios";
import cityData from "../data/index.js";

require("dotenv").config();

export default {
  name: "App",
  components: {
    MapDisplay,
    SideDisplay,
    PageTitle,
    Clock,
  },
  data() {
    return {
      // If you update this please update data/cityLocations.json
      location: {
        Tokyo: {
          lon: 139.6503,
          lat: 35.6762,
        },
        Osaka: {
          lon: 135.5023,
          lat: 34.6937,
        },
        Naha: {
          lon: 127.679,
          lat: 26.2126,
        },
        Sendai: {
          lon: 140.8694,
          lat: 38.2682,
        },
        Fukuoka: {
          lon: 130.4017,
          lat: 33.5902,
        },
        Sapporo: {
          lat: 43.0618,
          lon: 141.3545,
        },
      },
      markers: [],
      places: [],
      // this if for restaurant data
      restaurantsInfo: {},
    };
  },
  methods: {
    async getWeatherInfo(lon, lat) {
      let response = await axios.get(
        `https://weatherbit-v1-mashape.p.rapidapi.com/current?units=S&lang=undefined&lon=${lon}&lat=${lat}`,
        {
          headers: {
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": process.env.VUE_APP_RAPIKEY,
          },
        }
      );

      const actualDataObject = response.data.data[0];

      // pull each of the responses key's value into the ActualDataObject
      this.location[actualDataObject.city_name].weather =
        actualDataObject.weather;
      this.location[actualDataObject.city_name].weather.icon = `/icons/${
        this.location[actualDataObject.city_name].weather.icon
      }.png`;
      this.location[actualDataObject.city_name].weather.temp = (
        actualDataObject.temp - 273.15
      ).toFixed(2);
      this.location[actualDataObject.city_name].weather.clouds =
        actualDataObject.clouds;
      this.location[actualDataObject.city_name].weather.windSpeed =
        actualDataObject.wind_spd;
      this.location[actualDataObject.city_name].weather.windDirection =
        actualDataObject.wind_cdir_full;
      this.location[actualDataObject.city_name].weather.visibility =
        actualDataObject.vis;
      this.location[actualDataObject.city_name].weather.uvIndex =
        actualDataObject.uv;
      this.location[
        actualDataObject.city_name
      ].weather.liquidEquivalentPrecipitationRate = actualDataObject.precip;
      this.location[actualDataObject.city_name].weather.sunrise =
        actualDataObject.sunrise;
      this.location[actualDataObject.city_name].weather.sunset =
        actualDataObject.sunset;
      this.location[actualDataObject.city_name].weather.feelsLikeTemp =
        actualDataObject.app_temp;
    },

    // get restaruant info
    async getRestaurantsInfo(city, cityID) {
      let response = await axios.get(
        `https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=1&currency=USD&lang=en_US&location_id=${cityID}`,
        {
          headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": process.env.VUE_APP_RAPIKEY,
          },
        }
      );
      const result = {};
      this.restaurantsInfo[city] = result;
      result.address = response.data.data[0].address;
      result.name = response.data.data[0].name;
      result.opening = response.data.data[0].open_now_text;
      result.phone = response.data.data[0].phone;
      if (response.data.data[0].photo !== undefined) {
        result.image = response.data.data[0].photo.images.small.url;
      }
    },

    // get corona info
    async getCoronaInfo() {
      let response = await axios.get(
        "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=japan",
        {
          headers: {
            "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.VUE_APP_RAPIKEY,
          },
        }
      );
      this.info = response.data.data;
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
      this.$store.commit("updateMarkers", this.markers);
    },
    async getQuote() {
      return await axios.get("https://quotes21.p.rapidapi.com/quote", {
        headers: {
          "x-rapidapi-host": "quotes21.p.rapidapi.com",
          "x-rapidapi-key": process.env.VUE_APP_RAPIKEY,
        },
      });
    },
  },
  created: async function() {
    const quote = await this.getQuote();
    this.$store.commit("updateRandomQuote", quote.data);
    // fetch weather info
    await this.getWeatherInfo(this.location.Tokyo.lon, this.location.Tokyo.lat);
    await this.getWeatherInfo(this.location.Osaka.lon, this.location.Osaka.lat);
    await this.getWeatherInfo(
      this.location.Fukuoka.lon,
      this.location.Fukuoka.lat
    );
    await this.getWeatherInfo(this.location.Naha.lon, this.location.Naha.lat);
    await this.getWeatherInfo(
      this.location.Sendai.lon,
      this.location.Sendai.lat
    );
    await this.getWeatherInfo(
      this.location.Sapporo.lon,
      this.location.Sapporo.lat
    );
    await this.$store.commit("updateInitialWeather", this.location);
    this.$store.commit("updateWeather",this.location['Tokyo'])

    for (const city of cityData["locations"]) {
      let weatherIcon =
       process.env.VUE_APP_SITE_URL +
      this.$store.state.initialWeather[city.name]["weather"]["icon"];
      this.addMarkerByLatLon(city.lat, city.lon, weatherIcon, city.name);
    }
    // fetch corona info
    await this.getCoronaInfo();
    this.$store.commit("updateCoronaInfo", this.info);
    // fetch restaurant info
    await this.getRestaurantsInfo("Tokyo", 14133667);
    await this.getRestaurantsInfo("Osaka", 14135010);
    await this.getRestaurantsInfo("Naha", 298224);
    await this.getRestaurantsInfo("Sendai", 298249);
    await this.getRestaurantsInfo("Fukuoka", 14135118);
    await this.getRestaurantsInfo("Sapporo", 298560);
    await this.$store.commit("updateRestaurantsInfo", this.restaurantsInfo);
    await this.$store.commit(
      "updateCurrentRestaurantInfo",
      this.restaurantsInfo["Tokyo"]
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.tabs-component {
  margin: 4em 0;
}
.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}
@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}
.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}
.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}
.tabs-component-tab:hover {
  color: #666;
}
.tabs-component-tab.is-active {
  color: #000;
}
.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}
@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }
  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}
.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}
.tabs-component-panels {
  padding: 4em 0;
}
@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 1.5em 2em;
  }
}
</style>
