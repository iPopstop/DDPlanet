import initialState from './initialState'
import _has from "lodash/has";
import _values from "lodash/values";

const mutations = {
  index(state, payload) {
    state.applications = {
      ...state.applications,
      ...payload
    }
  },
  form(state, payload) {
    state.form = payload
  },
  show(state, payload) {
    state.current = {
      ...state.current,
      ...payload
    }
  },
  stats(state, payload) {
    state.stats = {
      ...state.stats,
      ...payload
    }
    state.chart.chartOptions.xaxis.categories = payload.data.stats.dts
    payload.data.stats.cats.forEach(function(value, i) {
      let info = payload.data.stats.categories[0][value]
      payload.data.stats.dts.forEach(function(dt) {
        let d = dt.toString()
        if(!_has(info, d)) {
          info[d] = null
        }else if(info[d] === 0) {
          info[d] = null
        }
      })
      state.chart.series[i] = {
        name: value,
        data: _values(info)
      }
    })
  },
  users(state, payload) {
    state.users = payload
  },
  clear() {
    this.state.applications = initialState()
  }
}

export default mutations
