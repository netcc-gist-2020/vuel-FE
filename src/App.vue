<template>
  <v-app>
    <v-main>
      <router-link to="/">home</router-link>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
</style>
