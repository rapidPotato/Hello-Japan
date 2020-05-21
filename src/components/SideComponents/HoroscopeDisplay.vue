<template>
  <div id="HoroscopeDisplay">
    <h1> Quote of the Moment </h1>
    <h3> {{this.$store.state.randomQuote.quote}} </h3>
    <h6> -{{this.$store.state.randomQuote.author}} </h6>

  </div>
</template>

<script>
export default {
  name: 'HoroscopeDisplay'
}
</script>

<style>

</style>
