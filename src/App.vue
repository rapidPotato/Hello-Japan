<template>
  <div id="app" class="container">
    <div class="row d-flex justify-content-center">
      <PageTitle id="PageTitle" />
    </div>
    <div class="row">
      <Clock id="Clock" />
    </div>
    <div class="row">
      <div class="col-6">
        <MapDisplay />
      </div>
      <div class="col-6">
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
import "dotenv/config";
// import cityData from "../data/index.js";

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
      // If you update this please update data\cityLocations.json
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
      // this if for restaurant data
      restaurantsInfo: {},
    };
  },

  methods: {
    // for getting weather
    getWeatherInfo(lon, lat) {
      axios
        .get(
          `https://weatherbit-v1-mashape.p.rapidapi.com/current?units=S&lang=undefined&lon=${lon}&lat=${lat}`,
          {
            headers: {
              "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
              "x-rapidapi-key": process.env.VUE_APP_RAKUTEN_KEY,
            },
          }
        )
        .then((response) => {
          const actralDataObject = response.data.data[0];
          // console.log("####", actralDataObject);
          let result = {};
          result = actralDataObject.weather;

          result.temp = (actralDataObject.temp - 273.15).toFixed(2);

          result.clouds = actralDataObject.clouds;
          result.windSpeed = actralDataObject.wind_spd;
          result.windDirection = actralDataObject.wind_cdir_full;
          result.visibility = actralDataObject.vis;
          result.uvIndex = actralDataObject.uv;
          result.liquidEquivalentPrecipitationRate = actralDataObject.precip;
          result.sunrise = actralDataObject.sunrise;
          result.sunset = actralDataObject.sunset;
          result.feelsLikeTemp = actralDataObject.app_temp;

          result.icon = `/icons/${result.icon}.png`;
          this.location.weather = result;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // get restaruant info
    getRestaurantsInfo(city, cityID) {
      axios
        .get(
          `https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=1&currency=USD&lang=en_US&location_id=${cityID}`,
          {
            headers: {
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key": process.env.VUE_APP_RAKUTEN_KEY,
            },
          }
        )
        .then((response) => {
          const result = {};
          this.restaurantsInfo[city] = result;
          result.address = response.data.data[0].address;
          result.name = response.data.data[0].name;
          result.opening = response.data.data[0].open_now_text;
          result.phone = response.data.data[0].phone;
          result.image = response.data.data[0].photo.images.small.url;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // get corona info
    getCoronaInfo() {
      axios
        .get(
          "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=japan",
          {
            headers: {
              "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
              "x-rapidapi-key": process.env.VUE_APP_RAKUTEN_KEY,
            },
          }
        )
        .then((response) => {
          this.info.total_cases = response.data.data.summary.total_cases;
          this.info.deaths = response.data.data.summary.deaths;
          this.info.death_ratio =
            parseFloat(response.data.data.summary.death_ratio).toFixed(2) + "%";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created: function() {
    // fetch weather info
    this.getWeatherInfo(this.location.Tokyo.lon, this.location.Tokyo.lat);
    this.getWeatherInfo(this.location.Osaka.lon, this.location.Osaka.lat);
    this.getWeatherInfo(this.location.Fukuoka.lon, this.location.Fukuoka.lat);
    this.getWeatherInfo(this.location.Naha.lon, this.location.Naha.lat);
    this.getWeatherInfo(this.location.Sendai.lon, this.location.Sendai.lat);
    this.getWeatherInfo(this.location.Sapporon.lon, this.location.Sapporo.lat);
    console.log("location:", this.location);
    this.$store.commit("updateInitialWeather", this.location);

    // fetch restaurant info
    this.getRestaurantsInfo("Tokyo", 14133667);
    this.getRestaurantsInfo("Osaka", 14135010);
    this.getRestaurantsInfo("Naha", 298224);
    this.getRestaurantsInfo("Sendai", 298249);
    this.getRestaurantsInfo("Fukuoka", 14135118);
    this.getRestaurantsInfo("Sapporo", 298560);
    console.log("this.restaurantInfo:", this.restaurantsInfo);
    this.$store.commit("updateRestaurantsInfo", this.restaurantsInfo);

    // fetch corona info
    this.getCoronaInfo();
    this.$store.commit("updateCoronaInfo", this.info);
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 00.05);
    padding: 1.5em 2em;
  }
}
</style>
