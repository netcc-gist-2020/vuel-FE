<template>
  <v-content>
    <video></video>
    <v-btn>
      LOGIN
    </v-btn>
    <v-btn @click="disableLoginFace">
      LOGIN WITH ID&PW
    </v-btn>
  </v-content>
</template>

<script>
export default {
  methods: {
    disableLoginFace () {
      this.$store.state.isLoginFace = false
    }
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
