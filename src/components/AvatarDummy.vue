<template>
  <div class="avatar">
    <div class="avatarid">
      {{ userId }}
      {{ expression }}

    </div>
    <img class="mx-5" :src="getImageUrl()">
  </div>
</template>

<script>
export default {
  name: 'AvatarDummy',

  props: {
    userId: String,
    index: Number,
    absence: String,
    expression: String,
    eyeDir: String
  },

  data: () => ({
  }),

  methods: {
    getImageUrl (index, expression, eyeDir) {
      var images = require.context('../assets/avatar/', false, /\.png$/)
      var typeEye = 0
      var typeExp = 0

      if (this.eyeDir === 'left') typeEye = 1
      else if (this.eyeDir === 'right') typeEye = 2
      else typeEye = 0

      if (this.expression === 'happy') typeExp = 1
      else if (this.expression === 'sleepy') typeExp = 2
      else typeExp = 0
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
.avatar {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.avatarid {
  border-radius: 8px;
  border-color: black;
}
</style>
