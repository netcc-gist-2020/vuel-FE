<template>
  <div class="container">
    <div class="item i1">
      <!-- <Video :mediaStream="hostStream" :toReverse="true"/> -->
      <h1>TeacherView</h1>
    </div>
    <div class="item i2">
      <!-- <LectureView/> -->
      <h1>LectureView</h1>
    </div>
    <div class="item i3">
      <h1>My Avatar</h1>
    </div>
    <div class="item i4">
      <h1>Seats</h1>
      <Seats/>
    </div>
  </div>

</template>
<script>
import { hostVideoMixin } from '@/mixins/hostVideoMixin.js'
// import { expressionMixin } from '@/mixins/expressionMixin.js'
// import ChatRoom from '@/components/ChatRoom'
// import Seats from '@/components/Seats'
import { classRoomMixin } from '@/mixins/classRoomMixin.js'
// import Video from '@/components/Video'
// import LectureView from '@/components/ClassRoom/LectureView'
// import WebSocket from 'ws'

export default {
  name: 'ClassRoom',
  mixins: [hostVideoMixin, classRoomMixin],
  components: {
    // ChatRoom,
    // Seats,
    // Video,
    // LectureView
  },
  computed: {
  }
}
</script>

<style scoped>

.container {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  padding: 0 auto;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 33%);
  grid-auto-flow: row;
}
.item:nth-child(4) {
  grid-row: span 2;
  grid-column: span 3;
}
.i1 {
  background: orange;
}
.i2 {
  background: tomato;
}
.i3 {
  background: burlywood;
}
.i4 {
  background: blue;
}
</style>
