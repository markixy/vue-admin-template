import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const LogoutKey = 'isLogout'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 记录是否是主动登出
export function setLogout() {
  localStorage.setItem(LogoutKey, 1)
}
export function removeLogout() {
  localStorage.removeItem(LogoutKey)
}
export function isLogout() {
  return localStorage.getItem(LogoutKey)
}
