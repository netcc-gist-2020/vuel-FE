<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <img src="../assets/ClassVideo.png">
      </v-col>
      <v-col cols="4">
        <v-row>
          <Video :mediaStream="hostStream"/>
          <video></video>
        </v-row>
        <v-row>
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

export default {
  name: 'ClassRoom',
  data: () => ({
    hostStream: null
  }),
  components: {
    ChatRoom,
    Seats,
    Video
  },
  mounted () {
    if (this.$store.state.amIHost === true) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        this.hostStream = stream
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
