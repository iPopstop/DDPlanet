import _has from 'lodash/has'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'

const getters = {
    getAuthUser: (state) => (name) => {
        return state.auth[name]
    },
    getAuthStatus: (state) => {
        return state.is_auth
    },
    hasRole: (state) => (name) => {
        return _includes(state.auth.roles_list, state.default_role[name])
    },
    getConfig: (state) => (name) => {
        return state.config[name]
    },
    keys: (state) => () => {
        return _filter(Object.keys(state.config), i => /^show_(.*?)_menu$/gim.test(i))
    },
    getPreference: (state) => (name) => {
        if (_has(state.auth, 'preferences') && _has(state.auth.preferences, name)) {
            return state.auth.preferences[name]
        } else {
            return 15
        }
    },
    hasPermission: (state) => (name) => {
        return state.permissions.indexOf(name) > -1
    },
    getLastActivity: (state) => {
        return state.last_activity
    },
    getDefaultRole: (state) => (name) => {
        return state.default_role[name]
    }
}

export default getters
