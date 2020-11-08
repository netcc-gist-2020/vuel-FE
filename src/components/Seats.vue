<template>
  <v-container fluid class="seats">
    <svgAvatar2
      class="avatar"
      v-for="(info, id) in guests"
      :key="info[0]"
      :index="id"
      :absence="info[1].absence"
      :expression="info[1].expression"
      :eyeDir="info[1].eye_dir"
      :userId="info[0]"
    />
    <button class="btns" @click=showGuests>ShowGuests</button>
    <button class="btns" @click=leave>Leave</button>
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
  data: () => ({
  }),
  methods: {
    leave () {
      const closingMessage = { type: 'close', data: { key: this.$store.state.myID } }
      this.socket2.send(JSON.stringify(closingMessage))
      router.push('mypage')
    },
    showGuests () {
      console.log(this.guests)
    }
  },
  computed: {
    ...mapGetters(['getUserList']),
    guests () {
      return Object.keys(this.getUserList).map(key => {
        return [String(key), this.getUserList[key]]
      })
    }
  },
  watch: {
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
  height: 100%;
  background: #CCB099;
}
.avatar {
  width: 10%;
  z-index: 30;
}

</style>
