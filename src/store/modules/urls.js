const state = {
  sfuURL: 'ws://kvm05:7000/ws',
  faceExpURL: 'ws://localhost:3000',
  faceSockServerURL: 'ws://116.89.189.44:30003',
  authBaseURL: 'http://116.89.189.53:8081'
}

const getters = {
  getSfuURL: state => state.sfuURL,
  getFaceExpURL: state => state.faceExpURL,
  getFaceSockServerURL: state => state.faceSockServerURL,
  getAuthBaseURL: state => state.authBaseURL
}

const actions = {
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
