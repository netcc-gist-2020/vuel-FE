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

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
