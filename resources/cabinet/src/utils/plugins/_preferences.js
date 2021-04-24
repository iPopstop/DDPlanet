import Vue from 'vue'
import store from '@/store'

Vue.prototype.$hasPreference = store.getters['config/getPreference']
window.$hasPreference = store.getters['config/getPreference']
