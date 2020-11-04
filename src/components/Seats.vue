<template>
  <v-container fluid class="seats">
    <v-row justify="center">
      <svgAvatar2 v-for="(info, id) in guests" :key="info[0]" :index="id" :absence="info[1].absence" :expression="info[1].expression" :eyeDir="info[1].eye_dir" :userId="info[0]"/>
      <v-row justify="end" align="end" class="desk">
          <v-btn class="ma-3"> MUTE </v-btn>
          <v-btn class="ma-3"> AUTH </v-btn>
          <v-btn class="ma-3" color="error" @click="leave"> LEAVE </v-btn>
      </v-row>
    </v-row>

  </v-container>
</template>

<script>
import { expressionMixin } from '@/mixins/expressionMixin.js'
import svgAvatar2 from '@/components/ClassRoom/svgAvatar2'
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'Seats',
  mixins: [expressionMixin],
  components: {
    svgAvatar2
  },
  props: ['socket2'],
  data: () => ({
    // guests: []
  }),
  methods: {
    leave () {
      router.push('mypage')
    }
  },
  computed: {
    ...mapGetters({
      guests: 'getUsers'
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
  height: 65px;
  background: #CCB099;
}

</style>
