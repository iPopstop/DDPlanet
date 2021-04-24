import initialState from './initialState'

const mutations = {
  index(state, payload) {
    state.applications = {
      ...state.applications,
      ...payload
    }
  },
  form(state, payload) {
    state.form = payload
  },
  show(state, payload) {
    state.current = {
      ...state.current,
      ...payload
    }
  },
  stats(state, payload) {
    state.stats = {
      ...state.stats,
      ...payload
    }
  },
  users(state, payload) {
    state.users = payload
  },
  clear() {
    this.state.applications = initialState()
  }
}

export default mutations
