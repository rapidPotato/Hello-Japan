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
      <tab name="Quote">
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
.tabs {
  color: rgb(20, 110, 110);
}

.single-tab {
  color: rgb(20, 110, 110);
}

#SideDisplay {
  margin-top: -50px;
}
</style>
