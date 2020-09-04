import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginFace: true,
    amIHost: true,
    classRoomID: '',
    guestList: ['Me']
  },
  mutations: {
    renderNewUser (state, userId) {
      state.guestList.push(userId)
      console.log('Added guest: ' + userId)
    },
    removeUser (state, userId) {
      const index = state.guestList.indexOf(userId)
      state.guestList.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
