<template>
<div class="avatar-view">
  <BaseAvatar
    :userId="userId"
    :index="index"
    :absence="absence"
    :expression="expression"
    :eyeDir="eyeDir"
    :isSpy="isSpy"
  >
  <div class="bav">
    <BasicAvatar v-if="isPresent"/>
    <Absence v-else/>
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
import Absence from '@/components/ClassRoom/Absence'

export default {
  name: 'SvgAvatar2',

  components: {
    BaseAvatar,
    BasicAvatar,
    Absence
  },

  methods: {
    isPresent () {
      return !(this.absence)
    }
  },

  props: {
    userId: String,
    index: Number,
    absence: Boolean,
    expression: String,
    eyeDir: String,
    isSpy: Boolean
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
