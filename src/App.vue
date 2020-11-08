<template>
  <v-app id="APP">
    <v-main>
      <!--<router-link to="/">home</router-link>-->
      <router-view></router-view>
    </v-main>
    <!-- <v-btn @click="goBack" class="debug">
      뒤로
    </v-btn> -->
  </v-app>
</template>

<script>
import router from '@/router'

export default {
  name: 'App',
  methods: {
    goBack () { router.go(-1) }
  }
}
</script>

<style scoped>
#APP {
  width: 100vw;
  height: 100vh;
}

.debug {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
