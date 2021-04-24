import Vue from 'vue'
import _get from 'lodash/get'
import _forEachRight from 'lodash/forEachRight'
import _replace from 'lodash/replace'

Vue.prototype.$t = (string, args) => {
  let value = _get(window.i18n, string)

  _forEachRight(args, (paramVal, paramKey) => {
    value = _replace(value, `:${paramKey}`, paramVal)
  })
  return value
}