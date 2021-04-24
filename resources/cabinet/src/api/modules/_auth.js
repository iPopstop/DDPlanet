import api from '@/api/api.js'

const check = () =>
    api({
        method: 'post',
        url: 'auth/check'
    })

const user = () =>
    api({
        method: 'get',
        url: 'auth/user'
    })

const settings = () =>
    api({
        method: 'get',
        url: 'auth/settings'
    })

const login = (data) =>
    api({
        method: 'post',
        url: 'auth/login',
        data
    })

const logout = () =>
    api({
        method: 'post',
        url: 'auth/logout'
    })

const cookies = () =>
    api({
        method: 'get',
        url: '/sanctum/csrf-cookie'
    })

export { check, user, login, logout, cookies, settings }
