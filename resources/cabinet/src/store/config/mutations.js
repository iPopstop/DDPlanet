import initialState from './initialState'

const mutations = {
    setAuthStatus(state) {
        state.is_auth = true
    },
    setAuthUserDetail(state, auth) {
        for (let key of Object.keys(auth)) {
            state.auth[key] = auth[key] !== null ? auth[key] : ''
        }
        state.is_auth = true
        state.auth.roles = auth.roles
    },
    resetAuthUserDetail(state) {
        for (let key of Object.keys(state.auth)) {
            state.auth[key] = ''
        }
        state.is_auth = false
        state.auth.roles = []
        state.last_activity = null
    },
    setConfig(state, config) {
        for (let key of Object.keys(config)) {
            state.config[key] = config[key]
        }
    },
    news(state, payload) {
      state.news = {
        ...state.settings,
        ...payload
      }
    },
    settings(state, payload) {
        state.settings = {
            ...state.settings,
            ...payload
        }
    },
    toggleSidebar(state) {
        state.config.sidebar = !state.config.sidebar
    },
    setPageLength(state, data) {
        state.auth.preferences.page_length = parseInt(data)
    },
    setLastActivity(state) {
        state.last_activity = moment().format()
    },
    resetConfig(state) {
        for (let key of Object.keys(state.config)) {
            state.config[key] = ''
        }
    },
    setPermission(state, data) {
        state.permissions = []
        data.forEach((permission) => state.permissions.push(permission.name))
    },
    setDefaultRole(state, data) {
        state.default_role = data
    },
    clear() {
        this.state.config = initialState()
    }
}

export default mutations
