<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <h1>Changa Lee</h1>
        <v-row>
          <v-btn text>Profile</v-btn>
        </v-row>
        <v-row>
          <v-btn text>Class</v-btn>
        </v-row>
        <v-row>
          <v-btn text>Avatar</v-btn>
        </v-row>
      </v-col>

      <v-col cols="4">
        <v-row></v-row>
        <v-row>
          <v-form>
            <p>Classroom ID</p>
            <v-text-field placeholder="Enter" filled>
            </v-text-field>
            <v-btn
              @click="setClassRoomID"
              color="success"
            >
              <router-link to="/classroom">
                JOIN
              </router-link>
            </v-btn>
          </v-form>
        </v-row>
      </v-col>

      <v-col cols="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'MyPage',
  components: {
  },
  methods: {
    setClassRoomID () {
      this.$store.state.classRoomID = this.$el.querySelector('input').value
    }
  },
  // For testing
  mounted () {
    console.log('Welcome to MyPage')
    const data = { A: { expression: 'neutral', absence: 'present' }, B: { expression: 'neutral', absence: 'present' } }
    console.log(data)
    const newData = Object.keys(data).map(function (key) {
      return [String(key), data[key]]
    })
    for (var i = 0; i < newData.length; i++) {
      console.log(i + ': ' + newData[i][1])
    }
    console.log(newData[0])
  }
}
</script>
