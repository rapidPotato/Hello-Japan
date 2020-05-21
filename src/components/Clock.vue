<template>
  <div id="Clock" class="container">
      <div class="row">
        <div class="col-6">
            <p class="date align-content-left">May 22</p>
        </div>
        <div class="col-6">
            <p class="time align-content-left" v-text="currentTime"></p>
        </div>
      </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'Clock',
  data() {
      return {
          message: 'Current Time:',
          currentTime: null
        }
      },
      methods: {
          updateCurrentTime() {
            this.currentTime = moment().format('LTS');
          }
        },
        created() {
          this.currentTime = moment().format('LTS');
          setInterval(() => this.updateCurrentTime(), 1 * 1000);
        }
}
</script>

<style scoped>
p {
    margin-bottom: 50px;
    color: rgb(74, 155, 155);
}

#Clock {
    font-size: 0.7em;
    text-transform: uppercase;
    font-weight: bold;
}

.time {
    margin-right: 10px;
}

</style>
