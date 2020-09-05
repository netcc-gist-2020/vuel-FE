<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <img src="../assets/ClassVideo.png">
      </v-col>
      <v-col cols="4">
        <v-row style="height: 50%; overflow: hidden;">
          <Video :mediaStream="hostStream"/>
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
import ChatRoom from '@/components/ChatRoom'
import Seats from '@/components/Seats'
import Video from '@/components/Video'
import io from 'socket.io-client'
import Peer from 'peerjs'
// import WebSocket from 'ws'

export default {
  name: 'ClassRoom',
  data: () => ({
    hostStream: null,
    myStream: null,
    socket: io.connect('http://116.89.189.14:3000'),
    // socket2: io.connect('ws://116.89.189.44'),
    socket2: new WebSocket('ws://116.89.189.44:8000'),
    myPeer: new Peer(undefined, {
      host: '116.89.189.14',
      port: '3001'
    })
  }),
  methods: {
    connectToNewUser (userId, stream) {
      const call = this.myPeer.call(userId, stream)
      console.log('I\'m calling ' + userId)

      call.on('stream', userVideoStream => {
      })

      call.on('close', () => {
      })
    }
  },
  components: {
    ChatRoom,
    Seats,
    Video
  },
  mounted () {
    const ROOM_ID = this.$store.state.classRoomID
    this.myPeer.on('open', id => {
      this.socket.emit('join-room', ROOM_ID, id)
    })

    this.socket.on('user-connected', userId => {
      console.log(userId + ' user is connected')
      if (this.$store.state.amIHost === true) {
        console.log('hey')
        this.connectToNewUser(userId, this.myStream)
      }
    }
    )

    // this.socket2.onmessage = function (event) {
    //   const message = JSON.parse(event.data)
    //   const { type, data } = message
    //   switch (type) {
    //     case 'welcome':
    //       console.log('Welcome!')
    //       this.$store.commit('getMyID', data.key, data.expression)
    //       this.$store.commit('getUsers', data.keys)
    //       break
    //     case 'enter':
    //       this.$store.commit('addUser', data.key, data.expression)
    //       break
    //     case 'closed':
    //       this.$store.commit('removeUser', data.key)
    //       break
    //     case 'exp':
    //       this.$store.commit('changeExpression', data.key, data.expression)
    //       break
    //   }
    // }

    this.socket2.onopen = () => {
      const openingMessage = { type: 'open', data: 'hello' }
      this.socket2.send(JSON.stringify(openingMessage))
      const vm = this
      this.socket2.onmessage = function (event) {
        const message = JSON.parse(event.data)
        console.log(message)
        const { type, data } = message
        switch (type) {
          case 'welcome':
            console.log('Welcome!')
            vm.$store.commit('getMyID', data.key)
            vm.$store.commit('getUsers', data.keys)
            break
          case 'enter':
            vm.$store.commit('addUser', data.key)
            break
          case 'bye':
            vm.$store.commit('removeUser', data.key)
            break
          case 'exp':
            vm.$store.commit('changeExpression', data.key, data.expression)
            break
        }
      }
    }

    this.myPeer.on('call', call => {
      console.log('I got a call')
      call.answer(this.myStream)
      console.log('And I answered with ' + this.myStream)
      call.on('stream', hostVideoStream => {
        this.hostStream = hostVideoStream
        console.log('I got a stream')
      })
    })

    if (this.$store.state.amIHost === true) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        this.myStream = stream
        this.hostStream = this.myStream
      })
    } else {
      navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      }).then(stream => {
        this.myStream = stream
      })
    }
  }
}
</script>

<style scoped>
video {
  width: 100%;
}

img {
  width: 100%;
}
</style>
