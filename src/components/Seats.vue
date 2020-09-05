<template>
  <v-container fluid class="seats">
    <v-row justify="center">
      <AvatarDummy v-for="(guestInfo, id) in guests" :key="guestInfo[0]" :index="id" :expression="guestInfo[1]" :userId="guestInfo[0]"/>
      <v-row justify="end" align="end" class="desk">
          <v-btn class="ma-3"> MUTE </v-btn>
          <v-btn class="ma-3"> AUTH </v-btn>
          <v-btn class="ma-3" color="error" @click="leave"> LEAVE </v-btn>
      </v-row>
    </v-row>

  </v-container>
</template>

<script>
// import Avatar from '@/components/Avatar'
import AvatarDummy from '@/components/AvatarDummy'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'Seats',
  components: {
    // Avatar
    AvatarDummy
  },
  props: ['socket2'],
  data: () => ({
    guests: []
  }),
  methods: {
    leave () {
      const closingMessage = { type: 'close', data: { key: this.$store.state.myID } }
      this.socket2.send(JSON.stringify(closingMessage))
      router.push('mypage')
    }
  },
  computed: {
    // get_guestList () { return this.$store.getters.getUserList }
    ...mapGetters({
      guestList: 'getUserList'
    })
  },
  watch: {
    guestList (val) {
      console.log(val)
      this.guests = Object.keys(val).map(function (key) {
        return [String(key), val[key]]
      })
    }
  },
  mounted () {
    // this.guestList = this.$store.getters.getUserList
    console.log(this.guestList)
  }
}
</script>

<style scoped>
.seats {
  background: #f1f1f1;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  min-height: 280px;
}
.desk {
  position: absolute;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100px;
  background: #CCB099;
}

</style>
