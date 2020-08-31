<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <img src="../assets/ClassVideo.png">
      </v-col>
      <v-col cols="4">
        <v-row>
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

export default {
  name: 'ClassRoom',
  components: {
    ChatRoom,
    Seats
  },
  mounted () {
    const video = this.$el.querySelector('video')
    video.muted = true

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        console.log('metadata is loaded')
        video.play()
      })
    })
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
}
</style>
