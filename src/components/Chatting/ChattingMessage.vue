<template>
  <div class="msg">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'ChattingMessage',
  props: {
    text: {
      type: String,
      default: null
    }
  },
  data: () => ({

  })
}
</script>

<style scoped>
.container {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
}
.msg {
  background: yellow;
  width: 20px;
  height: 20px;
}
</style>
