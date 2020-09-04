<template>
  <v-container>
    <h1>loginpassword</h1>
    <v-text-field
      v-model="id"
      label="ID"
      filled
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="PASSWORD"
      filled
    ></v-text-field>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn @click="getAnswer"> LOGIN </v-btn>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'
import router from '@/router'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export default {
  data: () => ({
    id: '',
    password: '',
    token: ''
  }),
  methods: {
    getAnswer: function () {
      var vm = this
      axios.post(
        // 'http://localhost:8000/login',
        'http://116.89.189.53:8000/login',
        { Id: this.id, Pwd: this.password }
      ).then(function (response) {
        console.log(response)

        if (response.data.err === '') {
          vm.token = response.data.tok
          router.push('mypage')
        } else {
          vm.token = ''
          alert('wrong! but ill give you pass for demo')
          router.push('mypage')
        }
      })
        .catch(function (error) {
          alert('에러! API 요청에 오류가 있습니다. ' + error)
        })
    }
  }
}
</script>
