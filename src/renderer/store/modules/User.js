const state = {
  api: null
}

const mutations = {
  SAVE_API (state, api) {
    state.api = api
  }
}

const actions = {
  setAPI ({ commit }, api) {
    commit('SAVE_API', api)
  }
}

const getters = {
  getAPI: state => state.api
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
