<template>
  <v-container fluid class="seats">
    <v-row justify="center">
      <Avatar v-for="guest in guests" :key="guest['name']" :option="guest" />
      <v-row justify="end" align="end" class="desk">
          <v-btn class="ma-3"> MUTE </v-btn>
          <v-btn class="ma-3"> AUTH </v-btn>
          <v-btn class="ma-3" color="error"> LEAVE </v-btn>
      </v-row>
    </v-row>

  </v-container>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'Seats',
  components: {
    Avatar
  },

  data: () => ({
    guests: [
      {
        name: 'Changa Lee',
        tee: 0,
        body: 0,
        eyes: 0
      },
      {
        name: 'Sua Jeon',
        tee: 0,
        body: 1,
        eyes: 0
      },
      {
        name: 'Taewan Kim',
        tee: 2,
        body: 0,
        eyes: 1
      },
      {
        name: 'Yura Choi',
        tee: 1,
        body: 1,
        eyes: 1
      },
      {
        name: 'Jeongyun Kim',
        tee: 1,
        body: 3,
        eyes: 2
      }
    ]
  })
}
</script>

<style scoped>
.seats {
  background: #f1f1f1;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
}
.desk {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #CCB099;
}

</style>
