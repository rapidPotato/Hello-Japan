<template>
  <div id="CoronaDisplay">
    <div class="coronaHead">
      <b>Today's Corona Summary for Japan</b>
    </div>
    <div class="coronaDisplay">
      <b>New Cases:</b>
      {{ this.$store.state.coronaInfo.change.total_cases }}
    </div>
    <div class="coronaDisplay">
      <b>Number of People Recently Tested:</b>
      {{ this.$store.state.coronaInfo.change.tested }}
    </div>
    <div class="coronaDisplay">
      <b>Change in Active Cases:</b>
      {{ this.$store.state.coronaInfo.change.active_cases }}
    </div>
    <div class="coronaDisplay">
      <b>Change in Critical Cases:</b>
      {{ this.$store.state.coronaInfo.change.critical }}
    </div>
    <div class="coronaDisplay">
      <b>Recently Recovered Cases:</b>
      {{ this.$store.state.coronaInfo.change.recovered }}
    </div>
    <div class="coronaDisplay">
      <b>New Fatal Cases:</b>
      {{ this.$store.state.coronaInfo.change.deaths }}
    </div>
    <div class="coronaHead">
      <b>Total Statistics for Japan</b>
    </div>
    <div class="coronaDisplay">
      <b>Currently Active Cases:</b>
      {{ this.$store.state.coronaInfo.summary.active_cases }}
    </div>
    <div class="coronaDisplay">
      <b>Currently Critical Cases:</b>
      {{ this.$store.state.coronaInfo.summary.critical }}
    </div>
    <div class="coronaDisplay">
      <b>Total Recovered Cases:</b>
      {{ this.$store.state.coronaInfo.summary.recovered }}
    </div>
    <div class="coronaDisplay">
      <b>Total Number of Cases:</b>
      {{ this.$store.state.coronaInfo.summary.total_cases }}
    </div>
    <div class="coronaDisplay">
      <b>Total Number of People Tested:</b>
      {{ this.$store.state.coronaInfo.summary.tested }}
    </div>
    <div class="coronaDisplay">
      <b>Total Number of Fatal Cases:</b>
      {{ this.$store.state.coronaInfo.summary.deaths }}
    </div>
  </div>
</template>
<script>
export default {
  name: "CoronaDisplay",
};
</script>

<style scoped>
.coronaDisplay {
  text-align: left;
  line-height: 200%;
  font-size: 15px;
}
.coronaHead {
  font-size: 18px;
  padding: 0em 0em 0.5em;
}
</style>
