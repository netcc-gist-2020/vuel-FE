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
      <Seats :guests="guestList"/>
    </v-row>
  </v-container>
</template>

<script>
import ChatRoom from '@/components/ChatRoom'
import Seats from '@/components/Seats'
import Video from '@/components/Video'
import io from 'socket.io-client'
import Peer from 'peerjs'

export default {
  name: 'ClassRoom',
  data: () => ({
    hostStream: null,
    myStream: null,
    socket: io.connect('http://116.89.189.14:3000'),
    socket2: io.connect('ws://210.125.84.93:8080'),
    myPeer: new Peer(undefined, {
      host: '116.89.189.14',
      port: '3001'
    }),
    guestList: []
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
    this.guestList = this.$store.state.guestList
    this.myPeer.on('open', id => {
      this.socket.emit('join-room', ROOM_ID, id)
      // this.socket2.emit('')
    })

    this.socket.on('user-connected', userId => {
      console.log(userId + ' user is connected')
      if (this.$store.state.amIHost === true) {
        console.log('hey')
        this.connectToNewUser(userId, this.myStream)
      }
      // For rendering new user's avatar
      // this.renderNewUser(userId)
      this.$store.commit('renderNewUser', userId)
    })

    // For expression changes
    this.socket2.on('message', (message) => {
      {userId, expression}
      console.log(userId + 'face changed to ' + expression)
    })

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
    console.log(this.guestList)
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
