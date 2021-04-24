import api from '@/api/api.js'

const index = params => api({
  method: 'get',
  url: 'applications',
  params
})

const create = (data) => api({
  method: 'post',
  url: 'applications',
  data
})

const show = id => api({
  method: 'get',
  url: `applications/${id}`,
})

const stats = params => api({
  method: 'get',
  url: 'applications/stats',
  params
})

const update = ({ id, ...params }) => api({
  method: 'patch',
  url: `applications/${id}`,
  params
})

const close = ({id, ...data}) => api({
  method: 'patch',
  url: `applications/close/${id}`,
  data
})

const user = ({id, ...data}) => api({
  method: 'patch',
  url: `applications/user/${id}`,
  data
})

const destroy = id => api({
  method: 'delete',
  url: `applications/${id}`,
})

export {
  index,
  show,
  create,
  update,
  destroy,
  stats,
  close,
  user
}
