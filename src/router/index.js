import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    meta: { authOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },

  {
    path: '/team/list',
    name: 'team-list',
    component: () => import('@/views/team/TeamList.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/team/add',
    name: 'team-add',
    component: () => import('@/views/team/TeamAdd.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/team/edit/:id',
    name: 'team-edit',
    component: () => import('@/views/team/TeamAdd.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/employees',
    name: 'employee-list',
    component: () => import('@/views/employees/EmployeeList.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/employee/add',
    name: 'employee-add',
    component: () => import('@/views/employees/EmployeeAdd.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/employee/edit/:uuid',
    name: 'employee-edit',
    component: () => import('@/views/employees/EmployeeAdd.vue'),
    meta: { authOnly: true },
  },

  {
    path: '/jobs',
    name: 'job-list',
    component: () => import('@/views/jobs/List.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/job/add',
    name: 'job-add',
    component: () => import('@/views/jobs/Add.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/job/edit/:uuid',
    name: 'job-edit',
    component: () => import('@/views/jobs/Add.vue'),
    meta: { authOnly: true },
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      guestOnly: true,
    },
  },
  {
    path: '/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
      guestOnly: true,
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
      guestOnly: true,
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

function isLoggedIn() {
  return localStorage.getItem('auth')
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
