<template>
  <div id="RestaurantDisplay">
    <div class="restaurantDisplay row">
      <div class="col-12">
        <h3>{{this.$store.state.currentRestaurantInfo.name}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h6>Availibility:</h6>
        <br />
        <p>{{this.$store.state.currentRestaurantInfo.opening}}</p>
        <br />
        <h6>Address:</h6>
        <br />
        <p>{{this.$store.state.currentRestaurantInfo.address}}</p>
        <br />
        <h6>Phone:</h6>
        <br />
        <p>{{this.$store.state.currentRestaurantInfo.phone}}</p>
      </div>
      <div class="col-6">
        <img :src="this.$store.state.currentRestaurantInfo.image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantDisplay"
};
</script>

<style>
h6 {
  text-align: left;
  line-height: 200%;
  font-size: 13px;
  font-weight: bold;
  padding: 0em 0em 0.5em;
}
h5 {
  font-size: 18px;
}

p {
  font-size: 15px;
}

img {
  border-radius: 50%;
  border: 5px solid #1da0a0;
}
</style>
