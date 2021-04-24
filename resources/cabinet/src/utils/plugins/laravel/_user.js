import Vue from 'vue'
import store from '@/store'

Vue.prototype.$auth = store.getters['config/getAuthUser']
Vue.prototype.$isAuth = store.getters['config/getAuthStatus']
Vue.prototype.$hasRole = store.getters['config/hasRole']
Vue.prototype.$hasPermission = store.getters['config/hasPermission']
window.$auth = store.getters['config/getAuthUser']
window.$isAuth = store.getters['config/getAuthStatus']
window.$hasRole = store.getters['config/hasRole']
window.$hasPermission = store.getters['config/hasPermission']
