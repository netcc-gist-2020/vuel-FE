import Vue from 'vue'
import Vuex from 'vuex'
import urls from './modules/urls'
import userInfo from './modules/userInfo'

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
    setAmIHost (state, amIHost) {
      console.log('mutations called!')
      state.amIHost = amIHost
    },
    setMyID (state, userId) {
      state.myID = userId
      console.log('My ID is ' + userId)
    },
    getUsers (state, otherUsers) {
      console.log('Users already in the server: ' + otherUsers)
      state.guestList = { ...state.guestList }
      for (var i = 0; i < otherUsers.length; i++) {
        state.guestList[otherUsers[i]] = {
          absence: 'present',
          expression: 'neutral',
          eye_dir: 'center'
        } // TODO: 서버에서 줘야 하는 정보
      }
      console.log(state.guestList)
    },
    addNewUser (state, userId, info = { absence: 'present', expression: 'neutral', eye_dir: 'center' }) {
      // TODO: expression은 서버에서 줘야 하는 정보
      // state.guestList[userId] = expression

      state.guestList[userId] = info

      state.guestList = {
        ...state.guestList
      }

      console.log('New guest: ' + userId)
    },
    removeUser (state, userId) {
      // state.guestList.delete(userId)
    },
    changeExpression (state, newInfo) {
      // Load old info of the user (absence, expression, eye_dir)
      console.log('Changed user: ' + newInfo)
      // console.log(newInfo.absence)
      const userId = newInfo.key
      const userInfo = state.guestList[userId]

      console.log('guestList: ', state.guestList)

      userInfo.absence = newInfo.absence ? newInfo.absence : userInfo.absence
      userInfo.expression = newInfo.expression ? newInfo.expression : userInfo.expression
      userInfo.eye_dir = newInfo.eye_dir ? newInfo.eye_dir : userInfo.eye_dir

      state.guestList = {
        ...state.guestList
      }
    }
    // TODO: 모듈화 할 것
  },
  actions: {
    setAmIHost ({ commit }, amIHost) {
      console.log('actoins, setting amIHost', amIHost)
      console.log(commit)
      console.log(amIHost)
      commit('setAmIHost', amIHost)
    }
  },
  getters: {
    getUserList: state => state.guestList,
    getMyID: state => state.myID,
    getAmIHost: state => state.amIHost,
    getRoomID: state => state.classRoomID
  },
  modules: {
    urls,
    userInfo
  }
})
