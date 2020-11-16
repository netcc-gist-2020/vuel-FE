<template>
  <v-layout id="signup" align-center>
    <v-container class="pa-4">
      <v-row
        align="center"
        justify="center"
        class="mb-4"
      >
        <h1>SIGN UP</h1>
      </v-row>
      <v-spacer> </v-spacer>
      <v-row>
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
              label="name"
              filled
            ></v-text-field>
          </v-row>

          <v-row class="">
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              filled
            ></v-text-field>
          </v-row>

          <v-row class="">
            <v-text-field
              v-model="nickname"
              label="nick name"
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
              @click="signUp"
              dark
            > sign up </v-btn>
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
              @click="router.go(-1)"
              outlined
            > CANCEL </v-btn>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import router from '@/router'
import axios from 'axios'
import { mapGetters } from 'vuex'
import { videoToCanvasMixin } from '@/mixins/videoToCanvasMixin'

export default {
  mixins: [videoToCanvasMixin],

  data: () => ({
    name: '',
    password: '',
    nickname: '',
    router
  }),

  computed: {
    ...mapGetters([
      'getAuthBaseURL'
    ])
  },

  methods: {
    async signUp () {
      const video = this.video
      const canvas = this.$el.querySelector('canvas')

      const formData = new FormData()
      const blob = await this.captureImageBaseURL()

      formData.append('user-face', blob)
      formData.append('meta-data', JSON.stringify({
        name: this.name
      }))

      console.log('signing up ' + this.name)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.createWaitingAnimation(canvas)

      axios.post(
        `${this.getAuthBaseURL}/signup/face`,
        formData,
        config
      )
        .then(response => {
          alert('Sign Up Succeeded!')
          console.log(response)
          router.push('Home')
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
#signup {
  width: 100%;
  height: 100%;
}

#signup > div {
  max-width: 320px;
}

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
