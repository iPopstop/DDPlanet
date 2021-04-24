import Vue from 'vue'
import { ru } from 'date-fns/locale'

const { format, formatRelative /* intervalToDuration */ } = require('date-fns')

Vue.filter('defDate', (value) => {
  return value ? format(value, 'dd.MM.yyyy HH:mm') : '-'
})

Vue.filter('defTime', (value) => {
  return value ? format(value, 'HH:mm') : '-'
})

Vue.filter('defDateWithoutTime', (value) => {
  return value ? format(value, 'dd.MM.yyyy') : '-'
})

Vue.filter('agoDate', (value) => {
  /* let info = intervalToDuration({
    start: new Date(),
    end: new Date(value)
  })
  if(info['years'] > 0) {
    return info['years'] + ' г. назад'
  }else if(info['months'] > 0) {
    return info['months'] + ' м. назад'
  }else if(info['days'] > 0) {
    return info['days'] + ' д. назад'
  }else if(info['minutes'] > 0) {
    return info['hours'] + ' ч. назад'
  }else {
    return info['seconds'] + ' с. назад'
  } */
  return value ? formatRelative(new Date(value), new Date(), { locale: ru }) : '-'
})