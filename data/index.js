let mapData = {}
// If you update this please update App.vue

mapData.locations = require("./cityLocations.json")
mapData.weather = require("./cityWeather.json")
mapData.searchables = require("./searchables.json")
mapData.restaurants = require("./restaurantInfo.json")

module.exports = mapData