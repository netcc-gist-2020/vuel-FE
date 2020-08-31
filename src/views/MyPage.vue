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
  }
}
</script>
