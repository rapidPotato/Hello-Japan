<template>
  <div id="EventDisplay">
    <h1>This is the Event Display</h1>
  </div>
</template>

<script>
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default {
  name: "EventDisplay",
  data() {
    return {
      restaurantsInfo: {},
    };
  },
  methods: {
    getRestaurantsInfo(city, cityID) {
      axios
        .get(
          `https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=1&currency=USD&lang=en_US&location_id=${cityID}`,
          {
            headers: {
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key": process.env.VUE_APP_RESTAURANT_KEY,
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
  },

  created: function () {
    this.getRestaurantsInfo("Tokyo", 14133667);
    this.getRestaurantsInfo("Osaka", 14135010);
    this.getRestaurantsInfo("Naha", 298224);
    this.getRestaurantsInfo("Sendai", 298249);
    this.getRestaurantsInfo("Fukuoka", 14135118);
    this.getRestaurantsInfo("Sapporo", 298560);
    console.log("this.restaurantInfo:", this.restaurantsInfo);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2a3642;
  margin-top: 60px;
}
</style>
