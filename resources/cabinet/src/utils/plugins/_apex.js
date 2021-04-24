import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

const ru = require('apexcharts/dist/locales/ru.json')

Vue.use(VueApexCharts)
window.Apex.chart = {
  locales: [ru],
  defaultLocale: 'ru'
}
Vue.component('apexchart', VueApexCharts)
