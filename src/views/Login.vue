<template>
  <v-content>
    <h1>LOGIN</h1>
    <LoginFace v-if="isLoginFace"/>
    <LoginPassword v-else/>

    <router-link to="mypage">goto mypage</router-link>
  </v-content>
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
