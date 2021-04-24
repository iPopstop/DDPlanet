import Vue from 'vue'
import _upperFirst from 'lodash/upperFirst'
import _lowerCase from 'lodash/lowerCase'
import _upperCase from 'lodash/upperCase'
import _isBoolean from 'lodash/isBoolean'
import _isNumber from 'lodash/isNumber'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import _sum from 'lodash/sum'
import _max from 'lodash/max'
import _shuffle from 'lodash/shuffle'
import _flatten from 'lodash/flatten'
import _isObject from 'lodash/isObject'
import _keys from 'lodash/keys'

if (process.env.VUE_APP_DATETIME_PLUGIN === 'moment') {
  require('./date/moment')
} else if (process.env.VUE_APP_DATETIME_PLUGIN === 'vanilla') {
  require('./date/vanilla')
} else if (process.env.VUE_APP_DATETIME_PLUGIN === 'fns') {
  require('./date/fns')
}

Vue.filter('upper', (value) => {
  return value ? _upperCase(value.toString()) : ''
})

Vue.filter('lower', (value) => {
  return value ? _lowerCase(value.toString()) : ''
})

Vue.filter('capitalize', (value) => {
  return value ? _upperFirst(value.toString()) : ''
})

Vue.filter('substr', (value, length) => {
  return value.length > length ? value.substring(0, length) : value
})

Vue.filter('preview', (value, length) => {
  return value.length > length ? `${value.substring(0, length)  }...` : value
})

Vue.filter('booleanFormat', (value, trueText = 'YES', falseText = 'NO') => {
  const isTrue = trueText || 'Yes'
  const isFalse = falseText || 'No'
  return _isBoolean(value) && value ? isTrue : isFalse
})

Vue.filter('percentage', (value, digits) => {
  const number = digits && _isNumber(digits) ? parseInt(digits) : 2
  return _isNumber(value)
    ? `${Math.round(value * (10 ** number)) * 100 / (10 ** number)}%`
    : '-'
})

Vue.filter('bytes', (value) => {
  switch (true) {
  case value === null || value === '' || isNaN(value):
    return '-'
  case value >= 0 && value < 1024:
    return `${value  } B`
  case value >= 1024 && value < 1024 ** 2:
    return `${Math.round((value / 1024) * 100) / 100} K`
  case value >= 1024**2 && value < 1024**3:
    return `${Math.round((value / 1024**2) * 100) / 100} M`
  case value >= 1024**3 && value < 1024**4:
    return `${Math.round((value / 1024**3) * 100) / 100} G`
  default:
    return `${Math.round((value / 1024**4) * 100) / 100} T`
  }
})

Vue.filter('map', (value, name) => {
  if (_isArray(value)) {
    return _map(value, name)
  }
  return value
})

Vue.filter('sum', (values) => {
  if (_isArray(values)) {
    return _sum(values)
  }
  return values
})

Vue.filter('max', (values) => {
  if (_isArray(values)) {
    return _max(values)
  }
  return values
})

Vue.filter('shuffle', (values) => {
  if (_isArray(values)) {
    return _shuffle(values)
  }
  return values
})

Vue.filter('size', (values) => {
  if (_isArray(values)) {
    return values.length()
  }
  return values
})

Vue.filter('join', (values, symbols) => {
  if (_isArray(values)) {
    return values.join(symbols)
  }
  return values
})

Vue.filter('flatten', (values) => {
  if (_isArray(values)) {
    return _flatten(values)
  }
  return values
})

Vue.filter('keys', (values) => {
  if (_isArray(values) || _isObject(values)) {
    return _keys(values)
  }
  return values
})

Vue.filter('test', (value, exp, flags = null) => {
  if (value) {
    const res = new RegExp(exp, flags)
    return res.test(value)
  }
  return value
})
