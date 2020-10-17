<template>
  <v-layout id="login" align-center>
    <v-container class="pa-4 mt-n16" >
      <v-row
        align="center"
        justify="center"
        class="mb-4"
      >
        <h1>LOGIN</h1>
      </v-row>
      <v-spacer></v-spacer>
      <v-row >
        <LoginFace v-if="isLoginFace"/>
        <LoginPassword v-else/>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import LoginFace from '@/components/Login/LoginFace'
import LoginPassword from '@/components/Login/LoginPassword'

export default {
  name: 'Login',

  components: {
    LoginFace,
    LoginPassword
  },

  computed: {
    isLoginFace () {
      return this.$store.state.isLoginFace
    }

  }
}
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
}

#login > div {
  max-width: 320px;
}

h1 {
  font-size: 3em;
}
</style>
