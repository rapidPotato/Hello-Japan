<template>
  <div id="WeatherDisplay">
    <div class = 'weatherHead'> <b> Your Daily Weather Report for {{this.$store.state.currentCity}} </b></div>
    <div class = 'weatherDisplay'> <b> Current Temperature: </b>{{ Math.round(this.$store.state.currentWeather.weather.temp) }} &#176;C </div>
    <div class = 'weatherDisplay'> <b>Feels like:</b> {{ Math.round(this.$store.state.currentWeather.weather.feelsLikeTemp) - 273 }} &#176;C</div>
    <div class = 'weatherDisplay'><b>Window Weather:</b> {{ this.$store.state.currentWeather.weather.description }} </div>
    <div class = 'weatherDisplay'><b>Sunrise & Sunset:</b> {{  moment(this.$store.state.currentWeather.weather.sunrise, 'HH:mm').add(9, 'hours').format('HH:mm')}} & {{moment(this.$store.state.currentWeather.weather.sunset, 'HH:mm').add(9, 'hours').format('HH:mm')}} </div>
    <div class = 'weatherDisplay'><b>Cloud Coverage:</b> {{ this.$store.state.currentWeather.weather.clouds }}% </div>
    <div class = 'weatherDisplay'><b>Expected Preciptiation:</b> {{ this.$store.state.currentWeather.weather.liquidEquivalentPrecipitationRate }} mm/hr</div>
    <div class = 'weatherDisplay'><b>Wind Speed:</b> {{ this.$store.state.currentWeather.weather.windSpeed }}m/s  </div>
    <div class = 'weatherDisplay'><b> Wind Direction:</b> {{ this.$store.state.currentWeather.weather.windDirection }} </div>
    <div class = 'weatherDisplay'><b>Visibility:</b> {{ this.$store.state.currentWeather.weather.visibility }} km</div>
    <div class = 'weatherDisplay'><b>UV Index:</b> {{ this.$store.state.currentWeather.weather.uvIndex }} </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherDisplay'
}
</script>

<style scoped>
.weatherDisplay {
    text-align : left;
    line-height: 200% ;
    font-size: 13px;
}
.weatherHead {
    font-size: 18px;
    padding: 0em 0em .5em;
}
</style>

