<template>
  <div id="RestaurantDisplay">
    <!-- <h1> This is the Restaurant Display </h1> -->
    <h6> {{this.$store.state.currentRestaurantInfo.name}} </h6>
    <img :src = this.$store.state.currentRestaurantInfo.image /> <br>
    <h8> Availibility: {{this.$store.state.currentRestaurantInfo.opening}} </h8> <br>
    <h8> {{this.$store.state.currentRestaurantInfo.address}} </h8> <br>
    <h8> {{this.$store.state.currentRestaurantInfo.phone}} </h8>

  </div>
</template>

<script>
export default {
  name: 'RestaurantDisplay'
}
</script>

<style>

</style>
