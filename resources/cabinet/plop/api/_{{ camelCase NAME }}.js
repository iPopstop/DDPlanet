import api from '@/api/api.js'

const get = (params) =>
    api({
        method: 'get',
        url: '',
        params
    })

const post = (data) =>
    api({
        method: 'post',
        url: '',
        data
    })

export { get, post }
