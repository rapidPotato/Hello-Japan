<template>
  <div id="CoronaDisplay">
    <h1>This is the Corona Display</h1>
  </div>
</template>

<script>
import axios from "axios";
import "dotenv/config";

export default {
  name: "CoronaDisplay",
  data() {
    return {
      info: {},
    };
  },

  methods: {
    getCoronaInfo() {
      axios
        .get(
          "https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=japan",
          {
            headers: {
              "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
              "x-rapidapi-key": process.env.VUE_APP_RAPIKEY,
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
    this.getCoronaInfo();
    this.$store.commit("updateCoronaInfo", this.info);
  },
};
</script>

<style scoped></style>
