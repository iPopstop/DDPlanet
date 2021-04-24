/* eslint-disable */
import API from '@/api'
// noinspection all
const actions = {
  index({ commit }) {
  	API.{{ lowerCase NAME }}.index().then(({ data }) => {
      commit('index', data)
    })
  },
  show({ commit }, payload) {
	  API.{{ lowerCase NAME }}.show(payload).then(({ data: { info } }) => {
      commit('show', info)
    })
  },
  create({ commit }, payload) {
	  API.{{ lowerCase NAME }}.create(payload).then(({ data: { info } }) => {
      commit('create', info)
    })
  },
  update({ commit }, payload) {
	  API.{{ lowerCase NAME }}.update(payload).then(({ data: { info } }) => {
      commit('update', info)
    })
  },
  destroy({ commit }, id) {
	  API.{{ lowerCase NAME }}.destroy(id).then(({ data: { info } }) => {
      commit('destroy', info)
    })
  },
}

export default actions
