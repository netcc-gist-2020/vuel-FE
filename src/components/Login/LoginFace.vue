<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <canvas></canvas>
      <v-progress-circular :class="{ notLoaded: keepDrawing }"
        style="height: 100px; width: 100px; position: absolute;"
        color="#9dc2e6"
        indeterminate
      ></v-progress-circular>

    </v-row>

    <v-row class="mt-8">
      <v-text-field
        v-model="name"
        label="NAME"
        filled
      ></v-text-field>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        color="#4B4DED"
        width="320px"
        height="48px"
        @click="tryLogin"
        dark
      > LOGIN </v-btn>
    </v-row>

    <v-row
      class="mt-6"
      align="center"
      justify="center"
    >
      <v-btn
        color="#4B4DED"
        width="320px"
        height="48px"
        @click="disableLoginFace"
        outlined
      > LOGIN WITH ID&PW </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  data: () => ({
    myStream: null,
    name: '',
    video: document.createElement('video'),
    keepDrawing: true
  }),
  methods: {
    disableLoginFace () {
      this.$store.state.isLoginFace = false
    },

    createWaitingAnimation (canvas) {
      this.keepDrawing = false

      const context = canvas.getContext('2d')
      const image = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = image.data
      let i = 0

      for (i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (r + g + b) / 3

        data[i] = data[i + 1] = data[i + 2] = brightness
      }

      context.putImageData(image, 0, 0)
      // console.log(image);
    },
    async tryLogin () {
      console.log('i\'ll try login!')
      const video = this.video
      const canvas = this.$el.querySelector('canvas')

      const formData = new FormData()
      const base64 = canvas.toDataURL('image/jpeg')

      const blob = await fetch(base64).then(res => res.blob())

      formData.append('user-face', blob)
      formData.append('user-name', this.name)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.createWaitingAnimation(canvas)
      axios.post(
        'http://116.89.189.52:9080/signin/face',
        // 'http://116.89.189.53:9080/signin/face',
        // 'http://203.237.53.84:9080/signin/face',
        formData,
        config
      )
        .then(response => {
          console.log(response)
          router.push('mypage')
        })
        .catch(err => {
          // this.keepDrawing = true

          // video.dispatchEvent(new Event('play'))

          console.log(video)
          console.log(err)
        })
    }
  },

  mounted () {
    const video = this.video
    const canvas = this.$el.querySelector('canvas')
    const vm = this
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

    video.addEventListener('play', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      draw(video, canvas.getContext('2d'), video.videoWidth, video.videoHeight)
    }, false)

    function draw (video, context, width, height) {
      if (vm.keepDrawing) {
        context.drawImage(video, 0, 0, width, height)
        setTimeout(draw, 10, video, context, width, height)
      }
    }
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

canvas {
  width: 320px;
  height: 320px;
  border-radius: 16px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.v-btn__content {
  font-weight: bold;
}

.v-btn--depressed {
  border-width: medium;
}
</style>
