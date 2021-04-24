import Vue from 'vue'
import _map from 'lodash/map'
import store from '@/store'

Vue.prototype.$cfg = store.getters['config/getConfig']
window.$cfg = store.getters['config/getConfig']

Vue.prototype.$hasPermission = store.getters['config/hasPermission']
window.$hasPermission = store.getters['config/hasPermission']

Object.defineProperty(Vue.prototype, '_map', { value: _map })
