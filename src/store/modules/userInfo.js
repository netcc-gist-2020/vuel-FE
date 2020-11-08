const state = {
  userName: '',
  amIHost: false,
  pictureBlob: null
}

const getters = {
  getUserName: state => state.userName,
  getPictureBlob: state => state.pictureBlob,
  getAmIHost: state => state.amIHost
}

const actions = {
  setUserName ({ commit }, name) {
    commit('setUserName', name)
  },

  setPictureBlob ({ commit }, blob) {
    commit('setPictureBlob', blob)
  },

  setAmIHost ({ commit }, amIHost) {
    commit('setAmIHost', amIHost)
  }
}

const mutations = {
  setUserName (state, name) { state.userName = name },
  setPictureBlob (state, blob) { state.pictureBlob = blob },
  setAmIHost (state, amIHost) {
    state.amIHost = amIHost
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
