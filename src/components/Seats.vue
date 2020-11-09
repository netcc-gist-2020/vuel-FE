<template>
  <div class="seats">
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
    <button class="btns" @click=leave>Leave</button>
  </div>
</template>

<script>
import { expressionMixin } from '@/mixins/expressionMixin.js'
import svgAvatar2 from '@/components/ClassRoom/svgAvatar2'
import router from '@/router'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Seats',
  mixins: [expressionMixin],
  components: {
    svgAvatar2
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(['leaveRoom']),
    leave () {
      const closingMessage = { type: 'close', data: { key: this.$store.state.myID } }
      this.socket2.send(JSON.stringify(closingMessage))
      this.leaveRoom()
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
      }).sort()
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
* {
  max-width: 100%;
  max-height: 100%;
}
.seats {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  padding: 0 auto;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(5, 20%);
  grid-template-columns: repeat(5, 20%);
  grid-auto-flow: row;
  justify-items: center;
  border-style: solid;
  border-radius: 10px;
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
  width: 50%;
  z-index: 30;
}

</style>
