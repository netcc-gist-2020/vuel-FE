const state = {
  amIHost: false,
  classRoomID: '',
  myID: '',
  guestList: {}
}

const getters = {
  getUserList: state => state.guestList,
  getMyID: state => state.myID,
  getRoomID: state => state.classRoomID
}

const actions = {
  leaveRoom ({ commit }) {
    commit('setUsers', {})
  }
}

const mutations = {
  setUsers (state, users) { state.guestList = users },
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
    console.log('Changed user: ' + newInfo.key)
    console.log('Changed expression: ' + newInfo.expression)
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
}

export default {
  state,
  getters,
  actions,
  mutations
}
