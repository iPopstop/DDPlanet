import API from '@/api'

const actions = {
  index({ commit }, payload) {
  	API.applications.index(payload).then(({ data }) => {
      commit('index', data.info)
      commit('users', data.users)
    })
  },
  show({ commit }, payload) {
	  API.applications.show(payload).then(({ data }) => {
      commit('show', data.data)
    })
  },
  close({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      API.applications.close(payload).then((response) => {
        dispatch('show', payload.id)
        resolve(response)
      }).catch(err => reject(err))
    })
  },
  user({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      API.applications.user(payload).then((response) => {
        dispatch('show', payload.id)
        resolve(response)
      }).catch(err => reject(err))
    })
  },
  stats({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.applications.stats(payload).then((response) => {
        commit('stats', response.data)
        resolve(response)
      }).catch(err => reject(err))
    })
  },
  create({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.applications.create(payload).then((response) => {
        resolve(response)
      }).catch(err => reject(err))
    })
  },
  update({ commit }, payload) {
	  API.applications.update(payload).then(({ data: { info } }) => {
      commit('update', info)
    })
  },
  destroy({ commit }, id) {
	  API.applications.destroy(id).then(({ data: { info } }) => {
      commit('destroy', info)
    })
  },
}

export default actions
