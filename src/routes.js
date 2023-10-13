import Main from './views/Main/index.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import store from '@/store/index'
import { computed } from 'vue'
/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { title: 'Main',requireAuth: true },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: 'Home',requireAuth: true  },
        component: () => import('./views/Home/index.vue')
      },
      {
        path: '/system',
        name: 'System',
        meta: { title: 'System',requireAuth: true  },
        component: () => import('./views/System/index.vue')
      },
      {
        path: '/project',
        name: 'Project',
        meta: { title: 'Project',requireAuth: true  },
        component: () => import('./views/Project/index.vue')
      },
      {
        path: '/kefu',
        name: 'Kefu',
        meta: { title: 'Kefu',requireAuth: true  },
        component: () => import('./views/Kefu/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: { title: 'User',requireAuth: true  },
        component: () => import('./views/User/index.vue')
      },
    ],

  },

  {
    path: '/withdraw',
    name: 'Withdraw',
    meta: { title: 'Withdraw',requireAuth: true  },
    component: () => import('./views/Withdraw/index.vue')
  },
  {
    path: '/withdraw-record',
    name: 'Withdraw Record',
    meta: { title: 'Withdraw Record',requireAuth: true  },
    component: () => import('./views/WithdrawRecord/index.vue')
  },
  {
    path: '/recharge-record',
    name: 'Recharge Record',
    meta: { title: 'Recharge Record',requireAuth: true  },
    component: () => import('./views/RechargeRecord/index.vue')
  },
  {
    path: '/recharge',
    name: 'Recharge',
    meta: { title: 'Recharge',requireAuth: true  },
    component: () => import('./views/Recharge/index.vue')
  },
  {
    path: '/address',
    name: 'Address',
    meta: { title: 'Address',requireAuth: true  },
    component: () => import('./views/Address/index.vue')
  },
  {
    path: '/bindBank',
    name: 'BindBank',
    meta: { title: 'BindBank',requireAuth: true  },
    component: () => import('./views/BindBank/index.vue')
  },
  {
    path: '/bindUSDT',
    name: 'BindUSDT',
    meta: { title: 'BindUSDT',requireAuth: true  },
    component: () => import('./views/BindUSDT/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: { title: 'Category',requireAuth: true  },
    component: () => import('./views/Category/index.vue')
  },
  {
    path: '/category-details',
    name: 'CategoryDetails',
    meta: { title: 'CategoryDetails',requireAuth: true  },
    component: () => import('./views/CategoryDetails/index.vue')
  },
  {
    path: '/newlists',
    name: 'NewList',
    meta: { title: 'NewList',requireAuth: true  },
    component: () => import('./views/NewList/index.vue')
  },
  {
    path: '/new-details',
    name: 'NewDetails',
    meta: { title: 'NewDetails',requireAuth: true  },
    component: () => import('./views/NewListDetails/index.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: { title: 'Setting',requireAuth: true  },
    component: () => import('./views/User/Setting/index.vue')
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    meta: { title: 'PersonalInfo',requireAuth: true },
    component: () => import('./views/User/Setting/PersonInfo.vue')
  },
  {
    path: '/authentication',
    name: 'Authentication',
    meta: { title: 'Authentication',requireAuth: true  },
    component: () => import('./views/User/Setting/Authentication.vue')
  },
  {
    path: '/change-login-pass',
    name: 'ChangeLoginPass',
    meta: { title: 'ChangeLoginPass',requireAuth: true  },
    component: () => import('./views/User/Setting/ChangeLoginPass.vue')
  },
  {
    path: '/change-payment-pass',
    name: 'ChangePaymentPass',
    meta: { title: 'ChangePaymentPass',requireAuth: true  },
    component: () => import('./views/User/Setting/ChangePaymentPass.vue')
  },
  {
    path: '/system-yuebao',
    name: 'SystemYueBao',
    meta: { title: 'SystemYueBao',requireAuth: true  },
    component: () => import('./views/User/SystemYueBao/index.vue')
  },
  {
    path: '/system-level',
    name: 'SystemLevel',
    meta: { title: 'SystemLevel',requireAuth: true  },
    component: () => import('./views/User/SystemLevel/index.vue')
  },
  {
    path: '/fund-details',
    name: 'FundDetails',
    meta: { title: 'FundDetails',requireAuth: true  },
    component: () => import('./views/User/FundDetails/index.vue')
  },
  {
    path: '/include-record',
    name: 'IncludeRecord',
    meta: { title: 'IncludeRecord',requireAuth: true  },
    component: () => import('./views/User/IncludeRecord/index.vue')
  },
  {
    path: '/noti',
    name: 'Notification',
    meta: { title: 'Notification',requireAuth: true  },
    component: () => import('./views/User/Notification/index.vue')
  },
  {
    path: '/usdt-calculator',
    name: 'UsdtCalculator',
    meta: { title: 'UsdtCalculator',requireAuth: true  },
    component: () => import('./views/User/UsdtCalculator/index.vue')
  },
  {
    path: '/reward-system',
    name: 'RewardSystem',
    meta: { title: 'RewardSystem',requireAuth: true  },
    component: () => import('./views/User/RewardSystem/index.vue')
  },
  {
    path: '/team-report',
    name: 'TeamReport',
    meta: { title: 'TeamReport',requireAuth: true  },
    component: () => import('./views/User/TeamReport/index.vue')
  },
  {
    path: '/invite',
    name: 'Invite',
    meta: { title: 'Invite',requireAuth: true  },
    component: () => import('./views/User/Invite/index.vue')
  },
  {
    path: '/commonProblem',
    name: 'CommonProblem',
    meta: { title: 'CommonProblem',requireAuth: true  },
    component: () => import('./views/User/CommonProblem/index.vue')
  },
  {
    path: '/problemDetails',
    name: 'ProblemDetails',
    meta: { title: 'ProblemDetails',requireAuth: true  },
    component: () => import('./views/User/CommonProblem/Details.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login',requiresVisitor: true  },
    component: () => import('./views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'Register', requiresVisitor: true },
    component: () => import('./views/Auth/Register.vue')
  },
  {
    path: '/forget',
    name: 'ForgetPass',
    meta: { title: 'ForgetPass', requiresVisitor: true },
    component: () => import('./views/Auth/ForgetPass.vue')
  },

//    { path: '/:path(.*)', component: () => import('./views/NotFound.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const loginInfo = computed(()=> store.getters["app/LoginData"])
  // console.log(loginInfo.value);
  const token = loginInfo.value?.token
  console.log(token,"router token");
  if (to.matched.some(record => record.meta.requiresVisitor)
  ) {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
  // next()

});


/* Default title tag */
const defaultDocumentTitle = 'Coin'

router.afterEach(to => {
  /* Set document title from route meta */

  if (to.meta && to.meta.title) {
    document.title = `${defaultDocumentTitle}  —  ${to.meta.title}`
  } else {
    document.title = defaultDocumentTitle
  }
})


export default router

