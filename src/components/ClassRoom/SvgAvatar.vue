<template>
  <div class="test">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect class="face-base" width="200" height="200" fill="#C4C4C4"/>
      <rect class="face-front" x="5" y="5" width="190" height="190" fill="#EBDFDF"/>
      <circle class="eye left" cx="57" cy="68" r="18" fill="#C4C4C4"/>
      <circle class="eye right" cx="144" cy="68" r="18" fill="#C4C4C4"/>
      <rect class="mouse" x="60" y="148" width="81" height="14" fill="#C4C4C4"/>
    </svg>

    <div class="btns">
      <v-btn @click="look('front')">look front</v-btn>
      <v-btn @click="look('right')">look right</v-btn>
      <v-btn @click="look('left')">look left</v-btn>
      <v-btn @click="look('up')">look up</v-btn>
      <v-btn @click="look('down')">look down</v-btn>
      <v-btn @click="blink">blank</v-btn>
      <v-btn @click="smilie">smile</v-btn>
      <v-btn @click="surprise">surprise</v-btn>
      <v-btn @click="sleepy">sleepy</v-btn>
      <v-btn @click="absent">absent</v-btn>
      <v-btn @click="present">present</v-btn>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SvgAvatar',
  methods: {
    look (direction) {
      const duration = 1
      let ffX = 0
      let ffY = 0
      let eX = 0
      let eY = 0
      let mX = 0
      let mY = 0
      switch (direction) {
        case 'right':
          ffX = 3
          eX = 15
          mX = 10
          break
        case 'left':
          ffX = -3
          eX = -15
          mX = -10
          break
        case 'up':
          ffY = -3
          eY = -15
          mY = -10
          break
        case 'down':
          ffY = 3
          eY = 15
          mY = 10
          break
      }

      gsap.to('.face-front', {
        duration,
        x: ffX,
        y: ffY
      })

      gsap.to('.eye', {
        duration,
        x: eX,
        y: eY
      })

      gsap.to('.mouse', {
        duration,
        x: mX,
        y: mY
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
.test {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: white;
}
svg {
  position: absolute;
  left: 50%;
  top: 50%;
  trasnfrom: translate("-50%", "-50%");
  width: 20vw;
  height: 20vw;
}

.btns {
  position: absolute;
  left: 20%;
  top: 70%;

}
</style>
