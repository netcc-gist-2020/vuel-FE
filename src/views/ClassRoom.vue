<template>
  <v-container id="classroom">
    <v-row>
      <v-col cols="8">
        <LectureView/>
      </v-col>
      <v-col cols="4">
        <v-row style="height: 50%; overflow: hidden;">
          <Video :mediaStream="hostStream" :toReverse="true"/>
        </v-row>
        <v-row style="height: 50%">
          <!-- <ChatRoom/> -->
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <!-- <Seats :socket2="socket2"/> -->
    </v-row>
  </v-container>
</template>

<script>
import { hostVideoMixin } from '@/mixins/hostVideoMixin.js'
// import { expressionMixin } from '@/mixins/expressionMixin.js'
// import ChatRoom from '@/components/ChatRoom'
// import Seats from '@/components/Seats'
import Video from '@/components/Video'
import LectureView from '@/components/ClassRoom/LectureView'
// import WebSocket from 'ws'

export default {
  name: 'ClassRoom',
  mixins: [hostVideoMixin],
  components: {
    // ChatRoom,
    // Seats,
    Video,
    LectureView
  },
  computed: {
  }
}
</script>

<style scoped>
#classroom {
  max-width: 100%;
}

video {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
}
</style>
