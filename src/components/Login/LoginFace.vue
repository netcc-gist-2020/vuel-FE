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
import { mapGetters, mapActions } from 'vuex'
import { videoToCanvasMixin } from '@/mixins/videoToCanvasMixin'

export default {
  mixins: [videoToCanvasMixin],
  data: () => ({
    name: ''
  }),

  computed: {
    ...mapGetters([
      'getUserName',
      'getAuthBaseURL'
    ])
  },

  methods: {
    ...mapActions([
      'setUserName',
      'setAmIHost',
      'setPictureBlob'
    ]),

    disableLoginFace () {
      this.$store.state.isLoginFace = false
    },

    async tryLogin () {
      this.setUserName(this.name)
      console.log(`my name: ${this.getUserName}`)

      const video = this.video
      const canvas = this.$el.querySelector('canvas')

      const formData = new FormData()
      const blob = await this.captureImageBaseURL()

      formData.append('user-face', blob)
      formData.append('meta-data', JSON.stringify({
        name: this.getUserName
      }))

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.createWaitingAnimation(canvas)

      axios.post(
        `${this.getAuthBaseURL}/signin/face`,
        formData,
        config
      )
        .then(response => {
          console.log(response)
          this.setPictureBlob(blob)
          router.push('mypage')
        })
        .catch(err => {
          this.keepDrawing = true
          video.dispatchEvent(new Event('play'))

          console.log(err)
        })
    }
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
