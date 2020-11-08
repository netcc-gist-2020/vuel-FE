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
  },
  actions: {
  },
  getters: {
  },
  modules: {
    urls,
    userInfo,
    classroomExpression
  }
})
