<template>
<div class="monitoring list">
<ul v-for="(item, id) in guestStats" :key="id">
    {{item[0]}} - {{item[1]}} - {{item[2]}} - {{item[3]}}
</ul>
<v-btn @click="getStatistic"> GET DATA </v-btn>
  <GChart
    type="BarChart"
    :data="chartData"
    :options="chartOptions"
  />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { GChart } from 'vue-google-charts'
export default {
  name: 'Monitoring',
  data: () => ({
    guestStats: [],
    chartData: [],
    chartOptions: {
      chart: {
        title: '[WIP] Monitoring using 100% stacked bars',
        subtitle: 'Class Session 1'
      },
      isStacked: 'percent',
      width: '100%',
      height: 700,
      bars: 'vertical'
    }
  }),
  components: {
    GChart
  },
  computed: {
    ...mapGetters([
      'getMonitoringServerURL',
      'getAmIHost'
    ])
  },

  methods: {
    async getStatistic () {
      this.removeStatistic()
      console.log(`Am I host: ${this.getAmIHost}`)
      axios.get(
        `${this.getMonitoringServerURL}/classroom`
      )
        .then(response => {
          console.log('Response data: ', response.data[0])
          const numData = response.data.length
          console.log(numData)
          this.guestStats.push(['ID', 'Happy', 'Neutral', 'Sleepy'])
          for (var i = 0; i < numData; i++) {
            const newArr = []
            newArr.push(String(response.data[i].key))
            newArr.push(response.data[i].exp_duration.happy)
            newArr.push(response.data[i].exp_duration.neutral)
            newArr.push(response.data[i].exp_duration.sleepy)
            this.guestStats.push(
              newArr
            )
          }
          console.log(this.guestStats[1])
          this.chartData = this.guestStats
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeStatistic () {
      this.guestStats = []
    }
  }
}
</script>
