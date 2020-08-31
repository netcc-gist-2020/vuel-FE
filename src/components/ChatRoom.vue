<template>
  <v-container>
    <h1>chat room!</h1>
    <div class="total-messages">
    <div class="received-messages">
      <li class="received" v-for="(message, id) in receivedMessages" :key="id">
      <!-- <ChattingMessage: v-bind:text="message.text" /> -->
      {{message.text}}
      </li>
    </div>
    <div class="sent-messages">
      <li class="sent" v-for="(message, id) in myMessages" :key="id">
      <!-- <ChattingMessage: v-bind:text="message.text" /> -->
      {{message.text}}
      </li>
    </div>
    </div>
    <div class="input-handler">
    <v-text-field class="enter-message" v-model="text" v-on:keyup.enter="sendMessage(text)" placeholder="Type Message" solo>
    </v-text-field>
    <v-btn class="send-button" color="#31D0AA" @click="sendMessage(text)">SEND</v-btn>
    </div>
  </v-container>
</template>

<script>
// import ChattingMessage from '@/components/Chatting/ChattingMessage'
export default {
  name: 'ChatRoom',
  data: () => ({
    receivedMessages: [{ text: 'Hello!' }],
    myMessages: []
  }),
  // components: { ChattingMessage },
  methods: {
    sendMessage: function (text) {
      if (text != null) {
        this.myMessages.push({ text: text })
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
  align-self: flex-start;
}
.sent-messages{
  size: 10em;
  /* background-color: blue; */
  padding: 0;
  margin: 0;
}
.received{
  display: flex;
  width: max-content;
  background-color: aquamarine;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  text-size-adjust: 1em;
}

.sent{
  display: flex;
  width: max-content;
  background-color:#FFF84E;
  justify-self: flex-end;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  text-size-adjust: 1em;
}

li.sent{
  display: flex;
  justify-content: flex-end;
  margin-left: max-width;
  margin-bottom: 10px;
  padding: 10px;
}

</style>
