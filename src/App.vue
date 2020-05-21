<template>
  <div id="app" class="container">
    <div class="row d-flex justify-content-center">
      <PageTitle id="PageTitle" />
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
import axios from "axios";
import cityData from "../data/index.js";


export default {
  name: "App",
  components: {
    MapDisplay,
    SideDisplay,
    PageTitle,
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
    };
  },

  methods: {
    getWeatherInfo(lon, lat) {
      axios
        .get(
          `https://weatherbit-v1-mashape.p.rapidapi.com/current?units=S&lang=undefined&lon=${lon}&lat=${lat}`,
          {
            headers: {
              "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
              "x-rapidapi-key":
                "e10051b80dmshac2089cb21f7c15p141093jsn0dcd03ead866",
            },
          }
        )
        .then((response) => {
          const actralDataObject = response.data.data[0];
          this.location[actralDataObject.city_name].weather =
            actralDataObject.weather;
          this.location[
            actralDataObject.city_name
          ].weather.icon = `/icons/${
            this.location[actralDataObject.city_name].weather.icon
          }.png`;
          this.location[actralDataObject.city_name].weather.temp = (
            actralDataObject.temp - 273.15
          ).toFixed(2);
          this.location[actralDataObject.city_name].weather.clouds =
            actralDataObject.clouds;
          this.location[actralDataObject.city_name].weather.windSpeed =
            actralDataObject.wind_spd;
          this.location[actralDataObject.city_name].weather.windDirection =
            actralDataObject.wind_cdir_full;
          this.location[actralDataObject.city_name].weather.visibility =
            actralDataObject.vis;
          this.location[actralDataObject.city_name].weather.uvIndex =
            actralDataObject.uv;
          this.location[
            actralDataObject.city_name
          ].weather.liquidEquivalentPrecipitationRate = actralDataObject.precip;
          this.location[actralDataObject.city_name].weather.sunrise =
            actralDataObject.sunrise;
          this.location[actralDataObject.city_name].weather.sunset =
            actralDataObject.sunset;
          this.location[actralDataObject.city_name].weather.feelsLikeTemp =
            actralDataObject.app_temp;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created: function () {
    this.getWeatherInfo(this.location.Tokyo.lon, this.location.Tokyo.lat);
    this.getWeatherInfo(this.location.Osaka.lon, this.location.Osaka.lat);
    this.getWeatherInfo(this.location.Fukuoka.lon, this.location.Fukuoka.lat);
    this.getWeatherInfo(this.location.Naha.lon, this.location.Naha.lat);
    this.getWeatherInfo(this.location.Sendai.lon, this.location.Sendai.lat);
    this.getWeatherInfo(this.location.Sapporo.lon, this.location.Sapporo.lat);
    // this.$store.commit("updateInitialWeather", this.location);
    // this.$store.commit("updateWeather",this.location['Tokyo'])
    this.$store.commit("updateInitialWeather", cityData['weather']);
    this.$store.commit("updateCity",'Tokyo')
    this.$store.commit("updateWeather",cityData['weather']['Tokyo'])
    this.$store.commit("updateRestaurantInfo",cityData['restaurants']['Tokyo'])
    this.$store.commit("updateInitialRestaurantInfo",cityData['restaurants'])
    console.log(cityData['restaurants']['Tokyo'])
    console.log(this.$store.state)
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
  margin-top: 60px;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 1.5em 2em;
  }
}
</style>
