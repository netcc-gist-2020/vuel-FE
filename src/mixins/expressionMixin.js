export const expressionMixin = {
  data: () => ({
    socket2: new WebSocket('ws://116.89.189.44:30003'),
    faceExpSocket: new WebSocket('ws://localhost:3000')
  }),

  mounted () {
    this.socket2.onopen = () => {
      const openingMessage = { type: 'open', data: 'hello' }
      this.socket2.send(JSON.stringify(openingMessage))
      const vm = this
      this.socket2.onmessage = function (event) {
        const message = JSON.parse(event.data)
        // console.log(message)
        const { type, data } = message
        switch (type) {
          case 'welcome':
            console.log('Welcome!')
            vm.$store.commit('setMyID', data.key) // TODO: set
            vm.$store.commit('getUsers', data.keys)
            break
          case 'enter':
            vm.$store.commit('addNewUser', data.key)
            break
          case 'bye':
            vm.$store.commit('removeUser', data.key)
            break
          case 'exp':
            console.log('Expression changed: ' + data)
            vm.$store.commit('changeExpression', data)
            break
        }
      }
    }

    this.faceExpSocket.onopen = () => {
      let faceExpMsg = { type: 'exp' }
      const vm = this
      this.faceExpSocket.onmessage = function (event) {
        const message = JSON.parse(event.data)
        faceExpMsg = {
          ...faceExpMsg,
          data: {
            key: vm.$store.getters.getMyID,
            ...message
          }
        }
        // console.log('Face expression message: ')
        // console.log(faceExpMsg) // 잘 됨
        vm.socket2.send(JSON.stringify(faceExpMsg))
      }
    }
  }
}