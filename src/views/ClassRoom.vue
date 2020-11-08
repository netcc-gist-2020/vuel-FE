<template>
  <full-page ref="fullpage" :options="options" :id="fullpage">
    <!-- <div class="section">
      <div class="LectureViewFull">
        <LectureView/>
      </div>
    </div> -->
    <div class="section">
      <div class="container">
        <div class="item i1">
          <Video :mediaStream="hostStream" :toReverse="true"/>
          <!-- <h1>TeacherView</h1> -->
        </div>
        <div class="item i2">
          <fullscreen ref="fullscreen" @change="fullscreenChange">
            <LectureView/>
            <!-- <h1>LectureView</h1> -->
          </fullscreen>
          <button class="fsbtn" type="button" @click="toggle" >Fullscreen</button>
        </div>
        <div class="item i3">
          <h1>Check Monitoring</h1>
          <modal name="monitoring"
          :adaptive="true"
          :width="800"
          :height="800"
          >
            <Monitoring/>
          </modal>
          <button @click="show">Monitor</button>
        </div>
        <div class="item i4">
          <Seats/>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section3">
        <h1>Section2</h1>
      </div>
    </div>
  </full-page>
</template>
<script src="https://unpkg.com/vue-fullpage.js/dist/vue-fullpage.min.js"></script>
<script>
import { hostVideoMixin } from '@/mixins/hostVideoMixin.js'
// import { expressionMixin } from '@/mixins/expressionMixin.js'
// import ChatRoom from '@/components/ChatRoom'
import Seats from '@/components/Seats'
import { classRoomMixin } from '@/mixins/classRoomMixin.js'
import Video from '@/components/Video'
import LectureView from '@/components/ClassRoom/LectureView'
import Myavatar from '@/components/ClassRoom/MyAvatar'
import Monitoring from '@/components/ClassRoom/Monitoring'
// import WebSocket from 'ws'

export default {
  name: 'ClassRoom',
  mixins: [hostVideoMixin, classRoomMixin],
  data () {
    return {
      options: {
        licenseKey: '21718E34-33EB4989-AC9C3BED-1D93842C'
      },
      fullscreen: false,
      modal: false,
      message: ''
    }
  },
  methods: {
    toggle () {
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    show () {
      this.$modal.show('monitoring')
    },
    hide () {
      this.$modal.hide('monitoring')
    }
  },
  components: {
    // ChatRoom,
    Seats,
    Video,
    LectureView,
    Myavatar,
    Monitoring
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped>
@import url("https://unpkg.com/fullpage.js/dist/fullpage.min.css");
.container {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  padding: 0 auto;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(3, 33%);
  grid-template-columns: repeat(3, 33%);
  grid-auto-flow: row;
  justify-items: center;
}
.item:nth-child(4) {
  grid-row: span 2;
  grid-column: span 3;
}
.i1 {
  background: orange;
}
.i2 {
  position: relative;
  background: black;
}
.i3 {
  background: burlywood;
}
.i4 {
  background: blue;
}
button {
  display: block;
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: black;
  border: white;
}
</style>
