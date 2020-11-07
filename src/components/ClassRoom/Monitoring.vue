<template>
<div class="monitoring list">
<ul v-for="(item, id) in guestStats" :key="id">
    {{item[0]}} - {{item[1].happy}} - {{item[1].neutral}} - {{item[1].sleepy}}
</ul>
<v-btn @click="getStatistic"> GET DATA </v-btn>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Monitoring',
  data: () => ({
    guestStats: []
  }),

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
          for (var i = 0; i < numData; i++) {
            const newArr = []
            newArr.push(String(response.data[i].key))
            newArr.push(response.data[i].exp_duration)
            this.guestStats.push(
              newArr
            )
          }
          console.log(this.guestStats[0])
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
