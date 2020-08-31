<template>
  <div class="avatar">
    <div class="crop body">
      <img :style="getStyle('body', option['body'])" src="../assets/avatar/bodies/Bodies.png" />
    </div>

    <div class="crop eyes">
      <img :style="getStyle('eyes', option['eyes'])" src="../assets/avatar/bodies/Eyes.png" />
    </div>

    <div class="crop tee">
      <img :style="getStyle('tee', option['tee'])"  src="../assets/avatar/clothes/Tee.png" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Avatar',

  props: {
    option: Object
  },

  data: () => ({
  }),

  methods: {
    getStyle (option, index) {
      if (option === 'tee') {
        return 'margin-top: -' + index * 191 + 'px'
      }

      if (option === 'body') {
        return 'margin-top: -' + index * 365 + 'px'
      }

      if (option === 'eyes') {
        return 'margin-top: -' + (index * 70 + 45) + 'px; width: 881px'
      }
    }
  }
}
</script>

<style>

.avatar{
  display: block;
  position: relative;
  width: 250px;
  height: 320px;
}

.crop {
  position: absolute;
  overflow: hidden;
}

.tee {
  top: 155px;
  width: 250px;
  height: 160px;
}

.body {
  width: 250px;
  height: 320px;
}

.eyes {
  width: 200px;
  height: 55px;
  left: 14px;
  top: 60px;
}

.eyes img {
  width: 881px;
}

.crop img {
  width: 100%;
}
</style>
