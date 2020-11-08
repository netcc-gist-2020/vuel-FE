<template>
<div class="monitoring list">
<ul v-for="(item, id) in guestStats" :key="id">
    {{item[0]}} - {{item[1]}} - {{item[2]}} - {{item[3]}}
</ul>
<v-btn @click="getStatistic"> GET DATA </v-btn>
  <GChart
    :settings="{packages: ['bar']}"
    :data="chartData"
    :options="chartOptions"
    :createChart="(el, google) => new google.charts.Bar(el)"
    @ready="onChartReady"
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
    chartsLib: null,
    chartData: []
  }),
  components: {
    GChart
  },
  computed: {
    ...mapGetters([
      'getMonitoringServerURL',
      'getAmIHost'
    ]),
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: '[WIP] Monitoring Students',
          subtitle: '모여봐요 구름교실'
        },
        bars: 'vertical', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3'],
        isStacked: true
      })
    }
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
    },
    onChartReady (chart, google) {
      this.chartsLib = google
    }
  }
}
</script>
