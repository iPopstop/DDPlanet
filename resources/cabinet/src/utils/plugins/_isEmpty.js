import Vue from 'vue'
import isEmpty from 'lodash/isEmpty'

Vue.set(Vue.prototype, 'isEmpty', isEmpty)
Vue.prototype.$swap = (arr, x, y) => {
  if (y <= arr.length) {
    const origin = arr[x]
    arr[x] = arr[y]
    Vue.set(arr, y, origin)
  }
}
window.$swap = (arr, x, y) => {
  if (y <= arr.length) {
    const origin = arr[x]
    arr[x] = arr[y]
    Vue.set(arr, y, origin)
  }
}

export default isEmpty
