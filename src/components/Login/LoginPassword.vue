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
      <v-btn @click="getAnswer">
        <router-link to="mypage">LOGIN</router-link>
      </v-btn>

    <p>{{ answer }}</p>
    <div v-if ="token != ''" >Login Token: {{ token }}</div>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export default {
  data: () => ({
    id: '',
    password: '',
    answer: 'ID, PW를 입력해주세요.',
    token: ''
  }),
  methods: {
    getAnswer: function () {
      this.answer = '...'
      var vm = this
      if (this.id === '' & this.password === '') this.answer = 'ID, PW를 입력해주세요'
      axios.post(
        'http://116.89.189.53:8000/login',
        { Id: this.id, Pwd: this.password }
      ).then(function (response) {
        console.log(response)

        // vm.answer = _.capitalize(response.data.answer)

        if (response.data.err === '') {
          vm.answer = '로그인 정보가 일치합니다. '
          vm.token = response.data.tok
          this.$router.push('mypage')
        } else {
          vm.answer = '로그인 정보가 일치하지 않습니다. '
          vm.token = ''
          alert('wrong! but ill give you pass for demo')
          this.$router.push('mypage')
        }
      })
        .catch(function (error) {
          vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
        })
    }
  }
}
</script>
