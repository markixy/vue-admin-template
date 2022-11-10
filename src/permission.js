import router from './router'
import store from './store'
import { MessageBox, Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { isLogout } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasUserInfo = store.getters.name
  var loggedIn = !!hasUserInfo
  // 不是主动退出的则尝试获取用户信息，兼容 rememberMe
  if (!loggedIn && !isLogout()) {
    try {
      // get user info
      await store.dispatch('user/getInfo')
      loggedIn = true
    } catch (error) {
      console.warn('err', error) // for debug
      NProgress.done()
      if (to.path === '/login') {
        // 关闭 request.js 拦截器401响应弹框
        try {
          MessageBox.close()
          // Message.closeAll()
        } catch (err) {
          //ignore
        }
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
      return
    }
  }

  if (loggedIn) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          console.warn('err', error) // for debug
          // remove token and go to login page to re-login
          await store.dispatch('user/resetState')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
