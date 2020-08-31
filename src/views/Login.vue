<template>
  <v-content fluid>
    <v-row
      align="center"
      justify="center"
    >
      <h1>LOGIN</h1>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <LoginFace v-if="isLoginFace"/>
      <LoginPassword v-else/>
    </v-row>
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
