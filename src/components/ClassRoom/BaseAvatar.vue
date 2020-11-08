<template>
  <div class="wrap" :class="userId">
    <slot></slot>
    <div id="info">
      {{ userId }}
      {{ expression }}
    </div>
    <v-row>
      <v-btn @click="click('happy')">happy</v-btn>
      <v-btn @click="click('normal')">normal</v-btn>
      <v-btn @click="click('sleepy')">sleepy</v-btn>
      <v-btn @click="click('right')">right</v-btn>
      <v-btn @click="click('center')">center</v-btn>
      <v-btn @click="click('left')">left</v-btn>
    </v-row>
  </div>
</template>

<script>
import { avatarExpressionMixin } from '@/mixins/avatarExpressionMixin.js'

export default {
  name: 'BaseAvatar',
  mixins: [avatarExpressionMixin],
  props: {
    userId: String,
    index: Number,
    absence: String,
    expression: String,
    eyeDir: String
  },
  methods: {
    click (arg) {
      switch (arg) {
        case 'happy':
        case 'normal':
        case 'sleepy':
          this.getExpression(arg, '')
          break
        default:
          this.getExpression('', arg)
      }
    }
  }
}
</script>

<style>
svg {
    margin: 10px auto;
    width: 100%;
}
#saliva {
    opacity: 0%;
}
.happy, .sleepy, #face_right, #face_left, .nose2, .mouth2 {
    visibility:hidden;
}

.wrap {
    display: inline-flex;
    top: 10%;
    left: 20%;
    margin-top: -20px;
    margin-left: 0px;
    text-align: center;
}
</style>
