<template>
  <div class="avatar">
    <img v-if="index == 0" class="mx-5" src="../assets/avatar/basic01.png">
    <img v-else-if="index == 1" class="mx-5" src="../assets/avatar/basic02.png">
    <img v-else-if="index == 2" class="mx-5" src="../assets/avatar/basic03.png">
    <img v-else-if="index == 3" class="mx-5" src="../assets/avatar/basic04.png">
    <img v-else-if="index == 4" class="mx-5" src="../assets/avatar/basic05.png">
    <!-- <img class="mx-5" :src="getSrc(index + 1)"> -->
  </div>
</template>

<script>
export default {
  name: 'AvatarDummy',

  props: {
    index: Number,
    emotion: String
  },

  data: () => ({
  }),

  methods: {
    // getSrc (index, emotion) {
    //   return '../assets/avatar/basic0' + index + '_' + emotion + '.png'
    // }
    getSrc (index) {
      return '../assets/avatar/basic0' + index + '.png'
    }
  }
}
</script>

<style>
</style>
