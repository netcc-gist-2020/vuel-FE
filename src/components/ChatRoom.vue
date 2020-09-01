<template>
  <v-container>
    <v-container id="scroll-target" style="height: 300px" class="overflow-y-auto">
      <v-row class="messageWrapper"
        v-scroll:#scroll-target="onScroll"
        style="height: 300px"
      >
        <!-- <li v-bind:class="[isSelf ? sent : received]" v-for="(message, id) in Messages" :key="id">
          {{message.text}}
        </li> -->
        <li v-for="Message in Messages" :key="Message.id">
        <ChattingMessage :text="Message.text" :username="Message.username"></ChattingMessage>
        </li>
      </v-row>
    </v-container>
    <div class="input-handler">
    <v-text-field class="enter-message" v-model="text" v-on:keyup.enter="sendMessage(text)" placeholder="Type Message" solo>
    </v-text-field>
    <v-btn class="send-button" color="#31D0AA" @click="sendMessage(text)">SEND</v-btn>
    </div>
  </v-container>
</template>

<script>
import ChattingMessage from '@/components/Chatting/ChattingMessage'
export default {
  name: 'ChatRoom',
  data: () => ({
    Messages: [{ text: 'Hello!', username: 'Changha Lee' }]
  }),
  components: { ChattingMessage },
  methods: {
    sendMessage: function (text) {
      if (text != null) {
        this.Messages.push({ text: text, username: 'self' })
        this.text = null
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
}
.input-handler {
  display: flex;
  justify-content: space-evenly;
  align-self: flex-end;
  height: max-content;
}
.enter-message {
  justify-self: flex-start;
}
.send-button {
  margin-left: 10px;
  align-self: flex-start;
}
.sent-messages{
  size: 10em;
  /* background-color: blue; */
  padding: 0;
  margin: 0;
}
.messageWrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
li {
  display: flex;
  height: max-content;
  width: 100%;
  text-size-adjust: 1em;
}

</style>
