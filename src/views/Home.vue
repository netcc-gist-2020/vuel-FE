<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <v-row mx-auto>

        <v-btn>
          <router-link to="/login">LOGIN</router-link>
        </v-btn>

        <v-btn
          color="error"
        >
          <router-link to="/signup">SIGN UP</router-link>
        </v-btn>
      </v-row>

      <v-row>
        <Avatar/>
      </v-row>

  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Avatar
  },
  mounted () {
    this.$store.state.isLoginFace = true
  }
}
</script>
