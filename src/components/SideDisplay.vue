<template>
  <div id="SideDisplay">
    <tabs>
      <tab name = 'Weather'>
        <WeatherDisplay/>
      </tab>
      <tab name = 'Health'>
        <CoronaDisplay/>
      </tab>
      <tab name = 'Events'>
        <EventDisplay/>
      </tab>
    </tabs>
  </div>
</template>

<script>
import WeatherDisplay from './SideComponents/WeatherDisplay.vue'
import CoronaDisplay from './SideComponents/CoronaDisplay.vue'
import EventDisplay from './SideComponents/EventDisplay.vue'

export default {
  name: 'SideDisplay',
  components: {
    WeatherDisplay,
    CoronaDisplay,
    EventDisplay
  }
}
</script>

<style scoped>

</style>
