<template>
  <v-container id="classroom">
    <v-row>
      <v-col cols="8">
        <img src="../assets/ClassVideo.png">
      </v-col>
      <v-col cols="4">
        <v-row style="height: 50%; overflow: hidden;">
          <Video :mediaStream="hostStream" :toReverse="true"/>
        </v-row>
        <v-row style="height: 50%">
          <ChatRoom/>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <Seats :socket2="socket2"/>
    </v-row>
  </v-container>
</template>

<script>
import { classRoomMixin } from '@/mixins/classRoomMixin.js'
import ChatRoom from '@/components/ChatRoom'
import Seats from '@/components/Seats'
import Video from '@/components/Video'
// import WebSocket from 'ws'

export default {
  name: 'ClassRoom',
  mixins: [classRoomMixin],
  data: () => ({
    socket2: new WebSocket('ws://116.89.189.44:30003'),
    faceExpSocket: new WebSocket('ws://localhost:3000')
  }),
  computed: {
  },
  methods: {
  },
  components: {
    ChatRoom,
    Seats,
    Video
  },
  mounted () {
    this.socket2.onopen = () => {
      const openingMessage = { type: 'open', data: 'hello' }
      this.socket2.send(JSON.stringify(openingMessage))
      const vm = this
      this.socket2.onmessage = function (event) {
        const message = JSON.parse(event.data)
        // console.log(message)
        const { type, data } = message
        switch (type) {
          case 'welcome':
            console.log('Welcome!')
            vm.$store.commit('setMyID', data.key) // TODO: set
            vm.$store.commit('getUsers', data.keys)
            break
          case 'enter':
            vm.$store.commit('addNewUser', data.key)
            break
          case 'bye':
            vm.$store.commit('removeUser', data.key)
            break
          case 'exp':
            console.log('Expression changed: ' + data)
            vm.$store.commit('changeExpression', data)
            break
        }
      }
    }

    this.faceExpSocket.onopen = () => {
      let faceExpMsg = { type: 'exp' }
      const vm = this
      this.faceExpSocket.onmessage = function (event) {
        const message = JSON.parse(event.data)
        faceExpMsg = {
          ...faceExpMsg,
          data: {
            key: vm.$store.getters.getMyID,
            ...message
          }
        }
        // console.log('Face expression message: ')
        // console.log(faceExpMsg) // 잘 됨
        vm.socket2.send(JSON.stringify(faceExpMsg))
      }
    }
  }
}
</script>

<style scoped>
#classroom {
  max-width: 100%;
}

video {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
}
</style>
