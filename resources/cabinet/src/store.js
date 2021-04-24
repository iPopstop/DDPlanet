import Vue from 'vue'
import Vuex from 'vuex'
import _forEach from 'lodash/forEach'
import _keys from 'lodash/keys'
import createMutationsSharer from 'vuex-shared-mutations'
//import createPersistedState from "vuex-persistedstate"
// eslint-disable-next-line import/no-cycle
import modules from './store/'

Vue.use(Vuex)

const predicates = []
//Синхронизация мутаций
_forEach(_keys(modules.config.mutations), (mutation) => {
  predicates.push(`config/${mutation}`)
})

const store = new Vuex.Store({
  modules,
  plugins: [createMutationsSharer({predicate: predicates})]
  //plugins: [createPersistedState()],
})

window.store = store
export default store