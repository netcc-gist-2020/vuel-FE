<template>
  <v-layout id="home">
    <v-container pa-16 justify="center">
      <v-row justify="center">
        <v-img
          id="logo"
          alt="Vue logo"
          src="../assets/CLOUD_CLASSROOM.png"
          max-width="450"
        ></v-img>
      </v-row>
      <v-row class="spacer">
      </v-row>
      <v-row justify="space-around">
        <v-btn
          color="#8C8CA1"
          width="245px"
          height="48px"
          dark
          @click="login"
          >
          <!--<router-link to="/login">LOGIN</router-link>-->
          LOGIN
        </v-btn>

        <v-btn
          color="#EC6C60"
          width="245px"
          height="48px"
          dark
          @click="signup"
        >
          SIGN UP
        </v-btn>

        <v-btn
          color="#8C8CA1"
          width="245px"
          height="48px"
          dark
          @click="mypage"
          >
          <!--<router-link to="/login">LOGIN</router-link>-->
          MYPAGE
        </v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Home',
  components: {
  },
  methods: {
    login () { this.$router.push('/login') },
    signup () { this.$router.push('/signup') },
    mypage () { this.$router.push('/mypage') }
  },
  mounted () {
    gsap.from('#logo', {
      duration: 2,
      opacity: 0,
      y: '30%'
    })
  }
}
</script>

<style scoped>
#home {
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

#home > div {
  max-width: 960px;
}

.spacer {
  height: 15vh;
}
</style>
