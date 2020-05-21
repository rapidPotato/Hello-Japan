<template>
  <div id="SideDisplay">
    <!-- <h1> This is the Side Display </h1> -->
    <tabs class="tabs">
      <tab class="single-tab" name="Weather">
        <WeatherDisplay />
      </tab>
      <tab name="Health">
        <CoronaDisplay />
      </tab>
      <tab name="Restaurant">
        <RestaurantDisplay />
      </tab>
      <tab name="Horoscope">
        <HoroscopeDisplay />
      </tab>
      <tab name="Events">
        <EventDisplay />
      </tab>
    </tabs>
  </div>
</template>

<script>
import WeatherDisplay from "./SideComponents/WeatherDisplay.vue";
import CoronaDisplay from "./SideComponents/CoronaDisplay.vue";
import EventDisplay from "./SideComponents/EventDisplay.vue";
import RestaurantDisplay from "./SideComponents/RestaurantDisplay.vue";
import HoroscopeDisplay from "./SideComponents/HoroscopeDisplay.vue";

export default {
  name: "SideDisplay",
  components: {
    WeatherDisplay,
    CoronaDisplay,
    EventDisplay,
    RestaurantDisplay,
    HoroscopeDisplay
  }
};
</script>

<style scoped>
tab {
  color: rgb(14, 80, 80);
}
</style>
