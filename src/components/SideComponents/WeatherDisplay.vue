<template>
  <div id="WeatherDisplay">
    <h4> Your Daily Weather Report for {{this.$store.state.currentCity}} </h4>
    <h6>Current Temperature (C): {{ Math.round(this.$store.state.currentWeather.weather.temp) }} </h6>
    <h6>Feels like (C): {{ Math.round(this.$store.state.currentWeather.weather.feelsLikeTemp) - 273 }} </h6>
    <h6>Window Weather: {{ this.$store.state.currentWeather.weather.description }} </h6>
    <h6>Sunrise & Sunset: {{  moment(this.$store.state.currentWeather.weather.sunrise, 'HH:mm').add(9, 'hours').format('HH:mm')}} & {{moment(this.$store.state.currentWeather.weather.sunset, 'HH:mm').add(9, 'hours').format('HH:mm')}} </h6>
    <h6>Cloud Coverage (%): {{ this.$store.state.currentWeather.weather.clouds }} </h6>
    <h6>Expected Preciptiation (mm/hr): {{ this.$store.state.currentWeather.weather.liquidEquivalentPrecipitationRate }} </h6>
    <h6>Wind Speed (m/s) & Direction: {{ this.$store.state.currentWeather.weather.windSpeed }} from {{ this.$store.state.currentWeather.weather.windDirection }} </h6>
    <h6>Visibility (km): {{ this.$store.state.currentWeather.weather.visibility }} </h6>
    <h6>UV Index: {{ this.$store.state.currentWeather.weather.uvIndex }} </h6>
  </div>
</template>

<script>
export default {
  name: 'WeatherDisplay'
}
</script>

<style>

</style>
