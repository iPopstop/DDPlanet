import Vue from 'vue'
import moment from 'moment'

window.moment = moment
Vue.set(Vue.prototype, 'moment', moment)

moment.updateLocale('ru', {
  week: {
    dow: 1
  }
})

Vue.filter('defDate', (value) => {
  return value ? moment(value).format(process.env.VUE_APP_DATETIME_FORMAT) : '-'
})

Vue.filter('defTime', (value) => {
  return value
    ? moment(value, process.env.VUE_APP_DEFAULT_TIME_FORMAT).format(
      process.env.VUE_APP_TIME_FORMAT
    )
    : '-'
})

Vue.filter('defDateWithoutTime', (value) => {
  return value ? moment(value).format(process.env.VUE_APP_DATE_FORMAT) : '-'
})

Vue.filter('agoDate', (value) => {
  return value ? moment(value).fromNow() : '-'
})