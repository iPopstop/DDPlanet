/* eslint-disable consistent-return */
import Vue from 'vue'
import _has from 'lodash/has'
import _filter from 'lodash/filter'
import _isArray from 'lodash/isArray'
import _includes from 'lodash/includes'
import toastr from 'toastr'
import store from '@/store'
import API from '@/api'

const helper = {
  // to get authenticated user data
  authUser() {
    return API.auth
      .user()
      .then((response) => response.data)
      .then((response) => response)
      .catch((error) => {
        this.showDataErrorMsg(error)
      })
  },

  // to check for authenticated user
  // eslint-disable-next-line lodash/prefer-constant
  check() {
    return store.dispatch('config/check')
  },

  // to set notification position
  notification() {
    /*const notificationPosition = process.env.VUE_APP_NOTIFICATION_VERTICAL_POSITION && process.env.VUE_APP_NOTIFICATION_HORIZONTAL_POSITION
      ? `toast-${process.env.VUE_APP_NOTIFICATION_VERTICAL_POSITION}-${process.env.VUE_APP_NOTIFICATION_HORIZONTAL_POSITION}`
      : 'toast-bottom-right'*/
    toastr.options = {
      positionClass: 'toast-bottom-right',
      closeDuration: process.env.VUE_APP_NOTIFICATION_DURATION,
      preventDuplicates: process.env.VUE_APP_NOTIFICATION_PREVENT_DUPLICATES,
      progressBar: process.env.VUE_APP_TOASTR_PROGRESS_BAR,
      newestOnTop: process.env.VUE_APP_TOASTR_NEWEST_ON_TOP
    }
  },

  // to get Auth Status
  isAuth() {
    return store.getters['config/getAuthStatus']
  },

  getConfig(name) {
    return store.getters['config/getConfig'](name)
  },

  getDefaultRole(role){
    return store.getters['config/getDefaultRole'](role)
  },

  getAuthUser(name) {
    return store.getters['config/getAuthUser'](name)
  },

  hasRole(role) {
    return store.getters['config/hasRole'](this.getDefaultRole(role))
  },

  userHasRole(user, roleName) {
    if (!user.roles) return false

    const userRole = _filter(user.roles, (role) => role.name === this.getDefaultRole(roleName))
    return !!userRole.length
  },

  featureAvailable(feature) {
    return this.getConfig(feature)
  },

  notAccessibleMsg() {
    toastr.error('В доступе отказано')
  },

  featureNotAvailableMsg() {
    toastr.error('Данная возможность выключена')
  },

  hasProperty(payload, key, value) {
    return _isArray(value)
      ? _has(payload, key) && payload[key].includes(value)
      : _has(payload, key) && payload[key] === value
  },

  showDataErrorMsg(error) {
    if (_has(error, 'error')) {
      if (error.error === 'token_expired') this.$router.push('/login')
    } else if (_has(error, 'response')) {
      const status = error.response.status
      let msg = ''
      if (status === 403) {
        msg = 'В доступе отказано'
      } else if (status === 422 && _has(error.response.data, 'error')) {
        msg = error.response.data.error
      } else if (status === 404 && _has(error, 'response')) {
        this.$router.push({ name: 'main' })
        msg = 'Страница не найдена'
      } else if (_has(error.response.data.errors, 'message')) {
        msg = error.response.data.errors.message[0]
      }
      if (msg) toastr.error(msg)
    }
  },

  fetchDataErrorMsg(error) {
    return error.response.data.errors.message[0]
  },

  showErrorMsg(error) {
    if (_has(error, 'error')) {
      if (_includes(error.error)) toastr.error(error.error)
      else toastr.error(error.error)

      if (error.error === 'token_expired') this.$router.push('/login')
    } else if (_has(error, 'response') && error.response.status === 403) {
      toastr.error('В доступе отказано')
    } else if (
      _has(error, 'response') &&
            error.response.status === 422 &&
            _has(error.response.data, 'error')
    ) {
      toastr.error(error.response.data.error)
    } else if (_has(error, 'response') && error.response.status === 404) {
      toastr.error('Страница не найдена')
    } else if (_has(error.errors, 'message')) toastr.error(error.errors.message[0])
  },

  fetchErrorMsg(error) {
    return error.errors.message[0]
  },

  randomString(length) {
    let count = length
    if (length === undefined) count = 40
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = count; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }
}

Vue.prototype.helper = helper
window.helper = helper

export default helper
