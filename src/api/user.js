import qs from 'qs'
import request from '@/utils/request'

const urlPrefix = '/auth'

export function login(data) {
  return request({
    url: urlPrefix + '/login',
    method: 'post',
    data: qs.stringify(data) // 表单传参
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}

export function getInfo() {
  return request({
    url: urlPrefix + '/current/principal',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: urlPrefix + '/logout',
    method: 'post'
  })
}
