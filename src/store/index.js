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
      // for (var otherUser in otherUsers) {
      //   state.guestList[otherUser] = 'neutral'
      // }
      console.log(otherUsers)
      for (var i = 0; i < otherUsers.length; i++) {
        state.guestList[otherUsers[i]] = 'neutral'
      }
      console.log(state.guestList)
    },
    addNewUser (state, userId, expression = 'neutral') {
      // state.guestList[userId] = expression
      state.guestList = {
        ...state.guestList,
        userId: expression
      }
      console.log('New guest: ' + userId)
    },
    removeUser (state, userId) {
      // state.guestList.delete(userId)
    },
    changeExpression (state, userId, newexp) {
      state.guestList[userId] = newexp
    }
  },
  getters: {
    getUserList: (state) => {
      console.log(state.guestList)
      return state.guestList
    }
  },
  modules: {
  }
})
