<template>
  <div class="section">
    <div class="container">
      <div class="item i1">
        <Video :mediaStream="hostStream" :toReverse="true"/>
      </div>
      <div class="item i2">
        <fullscreen class="lectureViewWrapper" ref="fullscreen" @change="fullscreenChange">
          <LectureView/>
          <button class="fsbtn" type="button" @click="toggle" >Fullscreen</button>
        </fullscreen>
      </div>
      <div class="item i3">
        <Seats/>
      </div>
    </div>
  </div>
</template>
<script>
import { hostVideoMixin } from '@/mixins/hostVideoMixin.js'
// import { expressionMixin } from '@/mixins/expressionMixin.js'
import Seats from '@/components/Seats'
import { classRoomMixin } from '@/mixins/classRoomMixin.js'
import Video from '@/components/Video'
import LectureView from '@/components/ClassRoom/LectureView'

export default {
  name: 'ClassRoom',
  mixins: [hostVideoMixin, classRoomMixin],
  data () {
    return {
      fullscreen: false,
      modal: false,
      message: ''
    }
  },
  methods: {
    toggle () {
      this.$refs.fullscreen.toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  components: {
    Seats,
    Video,
    LectureView
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped>
* {
  max-width: 100%;
  max-height: 100%;
}
.section {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}
.container {

  margin: 0 auto;
  padding: 0 auto;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(3, 32%);
  grid-template-columns: repeat(2, 50%);
  grid-auto-flow: row;
}
.item:nth-child(3) {
  grid-row: span 2;
  grid-column: span 2;
}
.i1 {
  padding: 4%;
}
.i2 {
  position: relative;
  padding: 4%;
}
.lectureViewWrapper {
  height: 100%;
}

.fsbtn {
  position: absolute;
  margin-right: 8px;
}

button {
  display: block;
  bottom: 0px;
  right: 0px;
  color: black;
}
</style>
