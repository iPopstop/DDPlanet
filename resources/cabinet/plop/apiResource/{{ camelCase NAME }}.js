import api from '@/api/api.js'

const index = params => api({
  method: 'get',
  url: '{{ lowerCase NAME }}',
  params
})

const create = params => api({
  method: 'post',
  url: '{{ lowerCase NAME }}',
  params
})

const show = id => api({
  method: 'post',
  url: `{{ lowerCase NAME }}/${id}`,
})

const update = ({ id, ...params }) => api({
  method: 'patch',
  url: `{{ lowerCase NAME }}/${id}`,
  params
})

const destroy = id => api({
  method: 'delete',
  url: `{{ lowerCase NAME }}/${id}`,
})

export {
  index,
  show,
  create,
  update,
  destroy
}
