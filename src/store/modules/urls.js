const state = {
  sfuURL: 'ws://116.89.189.44:7000/ws',
  faceExpURL: 'ws://localhost:3000',
  // faceSockServerURL: 'ws://116.89.189.44:30003',
  faceSockServerURL: 'ws://116.89.189.56:8080',
  authBaseURL: 'http://116.89.189.53:8081',
  monitorServerURL: 'http://116.89.189.47:5000' // kvm 09
}

const getters = {
  getSfuURL: state => state.sfuURL,
  getFaceExpURL: state => state.faceExpURL,
  getFaceSockServerURL: state => state.faceSockServerURL,
  getAuthBaseURL: state => state.authBaseURL,
  getMonitoringServerURL: state => state.monitorServerURL
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
