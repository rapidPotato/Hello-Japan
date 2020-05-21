<template>
  <div id="RestaurantDisplay" class="restaurantDisplay">
    <h5> {{this.$store.state.currentRestaurantInfo.name}} </h5>
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
h6 {
    text-align : left;
    line-height: 200% ;
    font-size: 15px;
    padding: 0em 0em .5em;
}
h5 {
  font-size: 18px;
}
</style>
