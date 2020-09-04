import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginFace: true,
    amIHost: true,
    classRoomID: '',
    myID: '',
    guestList: { A: 'happy', B: 'neutral' }
  },
  mutations: {
    getMyID (state, userId) {
      state.myID = userId
    },
    getUsers (state, otherUsers) {
      state.guestList = otherUsers
    },
    addNewUser (state, userId, expression = 'neutral') {
      state.guestList[userId] = expression
      console.log('New guest: ' + userId)
    },
    removeUser (state, userId) {
      // const index = state.guestList.indexOf(userId)
      // state.guestList.splice(index, 1)
      state.guestList.delete(userId)
    },
    changeExpression (state, userId, newexp) {
      state.guestList[userId] = newexp
    }
  },
  getter: {
    getExpressionById: (state) => (userId) => {
      // return state.guestList[userId]
      return 'neutral'
    }
  },
  modules: {
  }
})
