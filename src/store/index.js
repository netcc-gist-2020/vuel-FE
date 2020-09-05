import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginFace: true,
    amIHost: false,
    classRoomID: '',
    myID: '',
    guestList: {}
  },
  mutations: {
    setMyID (state, userId) {
      state.myID = userId
    },
    getUsers (state, otherUsers) {
      console.log(otherUsers)
      state.guestList = { ...state.guestList }
      for (var i = 0; i < otherUsers.length; i++) {
        state.guestList[otherUsers[i]] = 'neutral' // TODO: 서버에서 줘야 하는 정보
      }
      console.log(state.guestList)
    },
    addNewUser (state, userId, expression = 'neutral') {
      // TODO: expression은 서버에서 줘야 하는 정보
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
      state.guestList = {
        ...state.guestList,
        userId: newexp
      }
    }
    // TODO: 모듈화 할 것
  },
  getters: {
    getUserList: (state) => {
      console.log(state.guestList)
      return state.guestList
    },
    getMyID: (state) => {
      return state.myID
    }
  },
  modules: {
  }
})
