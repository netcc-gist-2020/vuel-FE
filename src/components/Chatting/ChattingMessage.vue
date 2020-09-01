<template>
  <div class="msg" v-bind:style="{'justify-content: flex-end': isSelf(username)}">
  <div class="receivedMsg" v-bind:class="{'myMsg' : isSelf(username)}">
    {{text}}
  </div>
  </div>
</template>

<script>
// function isSelf (username) {
//   if (username === 'self') return true
//   else return false
// }
export default {
  name: 'ChattingMessage',
  props: {
    text: { required: true, type: String },
    username: { required: true, type: String }
  },
  data: () => ({

  }),
  methods: {
    isSelf: function (username) {
      if (username === 'self') { return true } else { return false }
    }
  }
}
</script>

<style scoped>
.msg {
  display: flex;
  width: 100%;
}

.receivedMsg {
  justify-content: flex-end;
  background: yellow;
  width: 20px;
  height: 20px;
  display: flex;
  height: max-content;
  width: max-content;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  text-size-adjust: 1em;
}

.myMsg {
  background: gray;
}

</style>
