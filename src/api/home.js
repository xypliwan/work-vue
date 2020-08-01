import axios from '@/utils/axios'
//首页

//消息中心列表
export function getCountList(data = {}) {
  return axios({
    url: `/home-page/get-count`,
    method: 'get',
    params: data
  })
}

//工单首页列表明细
export function getHomeList(data = {}) {
  return axios({
    url: `/home-page/get-list`,
    method: 'post',
    data
  })
}

//工单处理记录
export function processDetail(data = {}) {
  return axios({
    url: `/question-step`,
    method: 'get',
    params: data
  })
}
