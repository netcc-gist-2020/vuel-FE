const state = {
  userName: '',
  amIHost: false
}

const getters = {
  getUserName: state => state.userName
}

const actions = {
  setUserName ({ commit }, name) {
    commit('setUserName', name)
  }
}

const mutations = {
  setUserName (state, name) { state.userName = name }
}

export default {
  state,
  getters,
  actions,
  mutations
}
