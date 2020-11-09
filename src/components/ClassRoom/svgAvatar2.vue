<template>
<div class="avatar-view">
  <BaseAvatar
    :userId="userId"
    :index="index"
    :absence="absence"
    :expression="expression"
    :eyeDir="eyeDir"
  >
  <div class="bav">
    <BasicAvatar />
    <div id="idcard">
      {{ userId }}
    </div>
  </div>
  </BaseAvatar>
</div>
</template>

<script>
import BaseAvatar from '@/components/ClassRoom/BaseAvatar'
import BasicAvatar from '@/components/ClassRoom/BasicAvatar'

export default {
  name: 'SvgAvatar2',

  components: {
    BaseAvatar,
    BasicAvatar
  },

  props: {
    userId: String,
    index: Number,
    absence: String,
    expression: String,
    eyeDir: String
  },

  mounted () {
    console.log('SvgAvatar2!')
  }
}
</script>
<style>
.bav {
  position: relative;
  width: 100%;
}
.idcard {
  position: absolute;
  top: 100px;
}
</style>
