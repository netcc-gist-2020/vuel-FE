<template>
  <div class="avatar">
    <!-- <img v-if="index == 0" class="mx-5" src="../assets/avatar/basic01.png">
    <img v-else-if="index == 1" class="mx-5" src="../assets/avatar/basic02.png">
    <img v-else-if="index == 2" class="mx-5" src="../assets/avatar/basic03.png">
    <img v-else-if="index == 3" class="mx-5" src="../assets/avatar/basic04.png">
    <img v-else-if="index == 4" class="mx-5" src="../assets/avatar/basic05.png"> -->
    <img class="mx-5" :src="getImageUrl()">
  </div>
</template>

<script>
export default {
  name: 'AvatarDummy',

  props: {
    userId: String,
    index: Number,
    expression: String
  },

  data: () => ({
    // expression: this.expression
  }),

  methods: {
    getImageUrl (index, expression) {
      var images = require.context('../assets/avatar/', false, /\.png$/)
      var typeExp = 0
      const typeEye = 0
      if (this.expression === 'neutral') typeExp = 0
      else if (this.expression === 'happy') typeExp = 1
      else typeExp = 2
      return images('./' + this.index + typeExp + typeEye + '.png') // TODO: 이름 형식 바꾸기
    }
  },
  mounted () {
    console.log('Avatar!')
  },
  computed: {
    // get_expression () { return this.$store.getters.getExpressionById[this.userId] }
  },
  watch: {
    expression (exp) {
      console.log(exp)
      this.expression = exp
    }
  }
}
</script>

<style>
</style>
