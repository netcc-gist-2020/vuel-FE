<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <video></video>
    </v-row>

    <v-spacer></v-spacer>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn>
        <router-link to="mypage">LOGIN</router-link>
      </v-btn>
    </v-row>

    <v-spacer></v-spacer>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn @click="disableLoginFace">
        LOGIN WITH ID&PW
      </v-btn>
    </v-row>
  </v-container>
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

<style scoped>
video {
  width: 320px;
  height: 320px;
}
</style>
