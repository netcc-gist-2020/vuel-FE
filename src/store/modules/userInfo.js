const state = {
  userName: '',
  amIHost: false,
  pictureBlob: null
}

const getters = {
  getUserName: state => state.userName,
  getPictureBlob: state => state.pictureBlob
}

const actions = {
  setUserName ({ commit }, name) {
    commit('setUserName', name)
  },

  setPictureBlob ({ commit }, blob) {
    commit('setPictureBlob', blob)
  }
}

const mutations = {
  setUserName (state, name) { state.userName = name },
  setPictureBlob (state, blob) { state.pictureBlob = blob }
}

export default {
  state,
  getters,
  actions,
  mutations
}
