import { mapGetters } from 'vuex'

export const expressionMixin = {
  data: () => ({
    // socket2: new WebSocket(this.getFaceSockServerURL),
    // faceExpSocket: new WebSocket(this.getFaceExpURL)
    socket2: null,
    faceExpSocket: null
  }),

  computed: {
    ...mapGetters([
      'getUserName',
      'getFaceExpURL',
      'getFaceSockServerURL'
    ])
  },

  created () {
    this.socket2 = new WebSocket(this.getFaceSockServerURL)
    this.faceExpSocket = new WebSocket(this.getFaceExpURL)
  },

  mounted () {
    this.socket2.onopen = () => {
      const openingMessage = { type: 'open', data: 'hello' }
      this.socket2.send(JSON.stringify(openingMessage))
      const vm = this
      this.socket2.onmessage = function (event) {
        const message = JSON.parse(event.data)
        console.log('Message from server: ', message)

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
            console.log('Whole part of data:', data)
            console.log('Expression changed: ', data.key)
            vm.$store.commit('changeExpression', data)
            break
        }
      }
    }

    this.faceExpSocket.onopen = () => {
      this.faceExpSocket.send(this.getUserName)

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
        console.log('Face expression message: ', faceExpMsg) // 잘 됨
        vm.socket2.send(JSON.stringify(faceExpMsg))
      }
    }
  }
}
