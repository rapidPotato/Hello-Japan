<template>
  <div id="HoroscopeDisplay">
    <h1> Quote of the Moment </h1>
    <h3> {{this.$store.state.quote.quote}} </h3>
    <h6> -{{this.$store.state.quote.author}} </h6>

  </div>
</template>

<script>
export default {
  name: 'HoroscopeDisplay'
}
</script>

<style>

</style>
