<template>
  <div v-bind:class="{'mine' : isSelf(username), 'others' : !isSelf(username)}" v-bind:style="{'justify-content: flex-end': isSelf(username)}">
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
.mine {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.others {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.receivedMsg {
  justify-content: flex-end;
  background: yellow;
  display: flex;
  height: min-content;
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
