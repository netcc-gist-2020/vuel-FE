<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <video></video>
    </v-row>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="name"
      label="NAME"
      filled
    ></v-text-field>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn @click="tryLogin"> LOGIN </v-btn>
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
import axios from 'axios'
import router from '@/router'

export default {
  data: () => ({
    myStream: null,
    name: ''
  }),
  methods: {
    disableLoginFace () {
      this.$store.state.isLoginFace = false
    },

    async tryLogin () {
      console.log('i\'ll try!')
      const video = this.$el.querySelector('video')
      const canvas = document.createElement('canvas')

      // const mediaStream = video.srcObject
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

      const formData = new FormData()
      const base64 = canvas.toDataURL('image/jpeg')

      const blob = await fetch(base64).then(res => res.blob())
      console.log(blob)

      // formData.append('name', 'user-face')
      // formData.append('content', blob)
      formData.append('user-face', blob)
      formData.append('user-name', this.name)

      console.log('formData: ', formData)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      // let vm = this
      axios.post(
        'http://116.89.189.53:9080/signin/face',
        // 'http://203.237.53.84:9080/signin/face',
        formData,
        config
      )
        .then(response => {
          console.log(response)
          router.push('mypage')
        })
        .catch(err => {
          console.log(err)
        })
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
      this.myStream = stream
      video.addEventListener('loadedmetadata', () => {
        console.log('metadata is loaded')
        video.play()
      })
    })
  },

  beforeDestroy () {
    this.myStream.getTracks().forEach(track => {
      track.stop()
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
