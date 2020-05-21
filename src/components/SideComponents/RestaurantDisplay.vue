<template>
  <div id="RestaurantDisplay">
    <!-- <h1> This is the Restaurant Display </h1> -->
    <h6> {{this.$store.state.currentRestaurantInfo.name}} </h6>
    <img :src = this.$store.state.currentRestaurantInfo.image /> <br>
    <h6> Availibility: {{this.$store.state.currentRestaurantInfo.opening}} </h6> <br>
    <h6> {{this.$store.state.currentRestaurantInfo.address}} </h6> <br>
    <h6> {{this.$store.state.currentRestaurantInfo.phone}} </h6>

  </div>
</template>

<script>
export default {
  name: 'RestaurantDisplay'
}
</script>

<style>

</style>
