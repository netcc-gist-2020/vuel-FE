import Vue from 'vue'
import Vuex from 'vuex'
import urls from './modules/urls'
import userInfo from './modules/userInfo'
import classroomExpression from './modules/classroomExpression'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginFace: true
  },
  mutations: {
    setAmIHost (state, amIHost) {
      state.amIHost = amIHost
    }
  },
  actions: {
    setAmIHost ({ commit }, amIHost) {
      commit('setAmIHost', amIHost)
    }
  },
  getters: {
    getAmIHost: state => state.amIHost
  },
  modules: {
    urls,
    userInfo,
    classroomExpression
  }
})
