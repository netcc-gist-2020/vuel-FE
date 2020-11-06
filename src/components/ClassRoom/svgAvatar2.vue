<template>
  <BaseAvatar
    :userId="userId"
    :index="index"
    :absence="absence"
    :expression="expression"
    :eyeDir="eyeDir"
  >
    <BasicAvatar />
  </BaseAvatar>
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
