import Vue from 'vue'
import VueRouter from 'vue-router'
import _includes from 'lodash/includes'
import _find from 'lodash/find'
import _some from 'lodash/some'
import pages from './pages'

Vue.use(VueRouter)

const routes = [
  {
    // main
    path: '/',
    component: pages.layoutGuest,
    children: [
      // site.com/ -> site.com/main
      {
        path: '',
        redirect: {name: 'main'}
      },
      // Default route without params
      {
        path: 'main',
        name: 'main',
        component: pages.main
      },
      {
        path: 'applications/:id',
        name: 'applications.show',
        component: pages.main,
      },
    ]
  },
  {
    // main
    path: '/auth',
    meta: {validate: ['guest']},
    component: pages.layoutGuest,
    children: [
      // site.com/ -> site.com/main
      {
        path: '',
        redirect: {name: 'login'}
      },
      {
        path: 'login',
        name: 'login',
        component: pages.login
      },
      {
        path: 'register',
        name: 'register',
        component: pages.register
      },
    ]
  },
  {
    path: '/admin',
    component: pages.layoutAdmin,
    meta: {validate: ['auth']},
    children: [
      {
        path: '',
        redirect: {name: 'admin.stats'},
      },
      {
        path: 'stats',
        name: 'admin.stats',
        component: pages.stats,
      },
      {
        path: 'applications',
        name: 'admin.applications',
        component: pages.applications,
      },
      {
        path: 'applications/:id',
        name: 'admin.applications.show',
        component: pages.applicationsShow,
      },
    ]
  },
  /*
Authenticated only
{
path: '/', // all the routes which can be access without authentication
component: pages.layoutGuest,
meta: { validate: ['auth'] },
children: [
  {
    path: '/auth/lock',
    component: pages.lock,
  }
],
},
*/
  /*Error page (404 and etc what you want to set. You can also add path: 'error/404', path: 'error/500' and etc)
  By default, it working when you tried to open any page that doesn't have route*/
  {
    path: '*',
    component: pages.layoutError,
    children: [
      {
        path: '*',
        component: pages.notFound
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  linkExactActiveClass: 'router-link',
  linkActiveClass: 'is-active'
})

let loader = null

function hideLoader() {
  if (loader) {
    loader.hide()
    loader = null
  }
}

function showLoader() {
  loader = Vue.$loading.show({
    loader: String(process.env.VUE_APP_LOADER_TYPE),
    opacity: Number(process.env.VUE_APP_LOADER_OPACITY),
    color: String(process.env.VUE_APP_LOADER_COLOR),
    blur: String(process.env.VUE_APP_LOADER_BLUR)
  })
  return true
}

router.beforeEach((to, from, next) => {
  helper.check().then(() => {
      helper.notification()
      if (_some(to.matched, (m) => m.meta.validate)) {
        const m = _find(to.matched, (m) => m.meta.validate)
        const validater = m.meta.validate
        if (_includes(validater, 'auth')) {
          if (!helper.isAuth()) {
            toastr.error('Необходима авторизация')
            return next({name: 'login'})
          }
        }else if (_includes(validater, 'admin')) {
          if (helper.getAuthUser('status') !== 5) {
            helper.notAccessibleMsg()
            return next({name: 'main'})
          }
        }else if (_includes(validater, 'guest')) {
          if (helper.isAuth()) {
            toastr.error('Вы уже авторизованы')
            return next({name: 'main'})
          }
        }
      }
      return next()
    }).catch((error) => {
    // Authentication check fail, redirected back to "/login" route
    //store.dispatch('config/resetAuthUserDetail')
    //hideLoader()
  })
  /*setTimeout(() => {
      hideLoader()
  }, 800)*/
  return next()
})

router.afterEach(() => {
  //hideLoader()
})

Vue.prototype.router = router
window.router = router
export default router
