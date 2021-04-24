import initialState from './initialState'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
    ...initialState()
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
