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
      <Seats/>
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
    myPeer: new Peer(undefined, {
      host: '116.89.189.14',
      port: '3001'
    })
  }),
  methods: {
    connectToNewUser (userId, stream) {
      const call = this.myPeer.call(userId, stream)

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
      console.log(userId + ' user is conneced')
      if (this.amIHost === true) {
        this.connectToNewUser(userId, this.myStream)
      }
    })

    this.myPeer.on('call', call => {
      call.on('stream', hostVideoStream => {
        this.hostStream = hostVideoStream
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
        audio: false
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
