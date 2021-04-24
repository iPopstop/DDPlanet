/* eslint-disable lodash/prefer-lodash-method */
import Vue from 'vue'
import moment from 'moment'

window.$defaultShortcuts = [
  {
    text: 'Сегодня',
    onClick() {
      // return a Date
      return [new Date(), new Date()]
    }
  },
  {
    text: 'Завтра',
    onClick() {
      const day = moment().add(1, 'day')
      return [day.toDate(), day.toDate()]
    }
  },
  {
    text: 'Послезав...',
    onClick() {
      const day = moment().add(2, 'day')
      return [day.toDate(), day.toDate()]
    }
  },
  {
    text: '7 дней',
    onClick() {
      const day = moment()
      return [day.toDate(), day.add(7, 'days').toDate()]
    }
  },
  {
    text: 'Эта неделя',
    onClick() {
      const day = moment()
      return [day.weekday(0).toDate(), day.weekday(6).toDate()]
    }
  },
  {
    text: '1 год',
    onClick() {
      const day = moment()
      return [day.toDate(), day.add(1, 'year').toDate()]
    }
  }
]
Vue.prototype.$defaultShortcuts = [
  {
    text: 'Сегодня',
    onClick() {
      // return a Date
      return [new Date(), new Date()]
    }
  },
  {
    text: 'Завтра',
    onClick() {
      const day = moment().add(1, 'day')
      return [day.toDate(), day.toDate()]
    }
  },
  {
    text: 'Послезав...',
    onClick() {
      const day = moment().add(2, 'day')
      return [day.toDate(), day.toDate()]
    }
  },
  {
    text: '7 дней',
    onClick() {
      const day = moment()
      return [day.toDate(), day.add(7, 'days').toDate()]
    }
  },
  {
    text: 'Эта неделя',
    onClick() {
      const day = moment()
      return [day.weekday(0).toDate(), day.weekday(6).toDate()]
    }
  },
  {
    text: '1 год',
    onClick() {
      const day = moment()
      return [day.toDate(), day.add(1, 'year').toDate()]
    }
  }
]
