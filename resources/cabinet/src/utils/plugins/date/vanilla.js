import Vue from 'vue'

Vue.filter('defDate', (value) => {
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/
  const [, year, month, day, rawHour, min] = datePattern.exec(value)
  return value ? `${year}-${month}-${day} ${(`0${rawHour}`).slice(-2)}:${min}` : '-'
})

Vue.filter('defTime', (value) => {
  const datePattern = /(\d{1,2}):(\d{2}):(\d{2})$/
  const [, hours, minutes] = datePattern.exec('14:50:00')
  return value ? `${hours}:${minutes}` : '-'
})

Vue.filter('defDateWithoutTime', (value) => {
  const datePattern = /(\d{4})-(\d{2})-(\d{2})/
  const [, year, month, day] = datePattern.exec(value)
  return value ? `${year}-${month}-${day}` : '-'
})

Vue.filter('agoDate', (value) => {
  const seconds = Math.floor((new Date() - value) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)  } years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)  } months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)  } days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)  } hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)  } minutes`
  }
  return `${Math.floor(seconds)  } seconds`
})