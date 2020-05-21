let mapData = {}
// If you update this please update App.vue

mapData.locations = require("./cityLocations.json")
mapData.weather = require("./cityWeather.json")
mapData.restaurants = require("./restaurantInfo.json")
mapData.corona = require("./corona.json")

module.exports = mapData