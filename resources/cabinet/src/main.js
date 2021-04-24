/* eslint-disable import/first */
import Vue from 'vue'
import App from './App'
import './utils/plugins'

import store from './store'
import router from './router'
import './utils/helpers'
import './assets/styles/app.scss'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/button'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tab'
import './utils/helpers/index'

window.$ = require('jquery')
Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: (h) => h(App)
})

app.$mount('#app')
