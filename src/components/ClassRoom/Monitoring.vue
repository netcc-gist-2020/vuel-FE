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
      console.log(`Am I host: ${this.getAmIHost}`)
      axios.get(
        `${this.getMonitoringServerURL}/classroom`
      )
        .then(response => {
          console.log(response)
          this.guestStats = Object.keys(response).map(key => {
            return [String(key), response[key]]
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
