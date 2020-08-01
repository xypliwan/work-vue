import axios from '@/utils/axios'
//用户

//退出登录
export function loginout() {
  return axios({
    url: `/login/loginout`,
    method: 'get'
  })
}

//获取token
export function getAccessToken(data = {}) {
  return axios({
    url: `/login/get-access-token`,
    method: 'get',
    params: data
  })
}

//获取提醒的内容
export function getRemindContent(data = {}) {
  return axios({
    url: `/remind/content`,
    method: 'get',
    params: data
  })
}

//获取提醒标签
export function getRemindTag(data = {}) {
  return axios({
    url: `/remind/tag`,
    method: 'get',
    params: data
  })
}

//获取标签详情
export function getRemindTagDetail(data = {}) {
  return axios({
    url: `/remind/tag-detail`,
    method: 'get',
    params: data
  })
}

//设置提醒标签
export function setRemindTag(data = {}) {
  return axios({
    url: `/remind/set-tag`,
    method: 'post',
    data
  })
}
