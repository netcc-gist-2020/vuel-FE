<template>
  <div class="avatar">
    <div class="avatarid">
      {{ userId }}
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
