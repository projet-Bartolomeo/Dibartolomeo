import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8949b894 = () => interopDefault(import('..\\pages\\AddModifStudent.vue' /* webpackChunkName: "pages/AddModifStudent" */))
const _727571dd = () => interopDefault(import('..\\pages\\classesList.vue' /* webpackChunkName: "pages/classesList" */))
const _952f60ca = () => interopDefault(import('..\\pages\\FormClasses.vue' /* webpackChunkName: "pages/FormClasses" */))
const _06648cfc = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _18d88ed2 = () => interopDefault(import('..\\pages\\StudentList.vue' /* webpackChunkName: "pages/StudentList" */))
const _889812ea = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/AddModifStudent",
    component: _8949b894,
    name: "AddModifStudent"
  }, {
    path: "/classesList",
    component: _727571dd,
    name: "classesList"
  }, {
    path: "/FormClasses",
    component: _952f60ca,
    name: "FormClasses"
  }, {
    path: "/Login",
    component: _06648cfc,
    name: "Login"
  }, {
    path: "/StudentList",
    component: _18d88ed2,
    name: "StudentList"
  }, {
    path: "/",
    component: _889812ea,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
