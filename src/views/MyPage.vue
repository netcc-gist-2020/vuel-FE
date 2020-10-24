<template>
  <v-container id="mypage">
    <v-row>
      <v-col class="left-col" cols="4">
        <h1 class="mb-4">Changa Lee</h1>
        <v-row class="my-2">
          <v-btn @click="beHost" text>Profile</v-btn>
        </v-row>
        <v-row class="my-2">
          <v-btn text>Class</v-btn>
        </v-row>
        <v-row class="my-2">
          <v-btn text>Avatar</v-btn>
        </v-row>
      </v-col>

      <v-col cols="4">
        <v-container class="mid-col mt-n10">
            <v-img
              contain
              max-width="25vw"
              max-height="25vw"
              width="25vw"
              height="25vw"
              class="profile-image mb-16"
              src="../assets/chlee.png"
            ></v-img>
            <v-form>
              <p>Classroom ID</p>
              <v-text-field
                max-width="320px"
                width="100%"
                height="48px"
                placeholder="Enter"
                min-height="48px"
                filled
              ></v-text-field>
              <v-btn
                @click="joinRoom"
                color="#31D0AA"
                dark
                max-width="320px"
                width="320px"
                height="48px"
              >
                  JOIN
              </v-btn>
            </v-form>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyPage',
  components: {
  },
  computed: {
    ...mapGetters([
      'getAmIHost'
    ])
  },
  methods: {
    ...mapActions([
      'setAmIHost'
    ]),

    joinRoom () {
      this.$store.state.classRoomID = this.$el.querySelector('input').value
      router.push('/classroom')
    },

    beHost () {
      this.setAmIHost(true)
      console.log('am i host? ', this.getAmIHost)
    }
  }
  // For testing
  // mounted () {
  //   console.log('Welcome to MyPage')
  //   const data = { A: { expression: 'neutral', absence: 'present' }, B: { expression: 'neutral', absence: 'present' } }
  //   console.log(data)
  //   const newData = Object.keys(data).map(function (key) {
  //     return [String(key), data[key]]
  //   })
  //   for (var i = 0; i < newData.length; i++) {
  //     console.log(i + ': ' + newData[i][1])
  //   }
  //   console.log(newData[0])
  // }
}
</script>

<style scoped>
.left-col h1 {
  font-size: 3em;
}

.left-col button {
  font-size: 2em;
}

p {
  font-weight: bold;
}

#mypage {
  max-width: 100%;
  width: 100%;
  height: 100%;
}

#mypage > .row {
  height: 100%;
}

.mid-col {
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-image {
  border-radius: 50%;
  box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.6);
}

.v-text-field--filled > .v-input__control > .v-input__slot {
  min-height: 48px;
}
</style>
