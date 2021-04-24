import _merge from 'lodash/merge'
import _has from 'lodash/has'
import store from '@/store'
import Errors from './_errors'

export class Form {
  /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param autoReset
     */
  constructor(data, autoReset) {
    this.originalData = data
    this.autoReset = autoReset !== undefined ? autoReset : true
    for (const field in data) {
      if ({}.hasOwnProperty.call(data, field)) {
        this[field] = data[field]
      }
    }

    this.errors = new Errors()
  }

  /**
     * Fetch all relevant data for the form.
     */
  data() {
    const data = {}

    for (const property in this.originalData) {
      if ({}.hasOwnProperty.call(this.originalData, property)) {
        data[property] = this[property]
      }
    }

    return data
  }

  /**
     * Reset the form fields.
     */
  reset() {
    for (const field in this.originalData) {
      if ({}.hasOwnProperty.call(this.originalData, field)) {
        this[field] = ''
      }
    }

    this.errors.clearAll()
  }

  /**
     * Submit the form.
     *
     * @param name
     * @param extra
     */
  submit(name, extra = []) {
    return new Promise((resolve, reject) => {
      store.dispatch(name, _merge(this.data(), extra)).then((response) => {
          if (!_has(response.data, 'status') || (_has(response.data, 'status' && response.data.status !== 'error'))) this.onSuccess(response.data)
          resolve(response)
        }).catch((error) => {
          this.onFail(error.response.data)
          reject(error)
        })
    })
  }

  /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
  onSuccess(data) {
    if (this.autoReset === true) {
      this.reset()
    }
  }

  /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
  onFail(errors) {
    this.errors.record(errors)
  }
}
