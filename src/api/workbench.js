import axios from '@/utils/axios'
//工作台

//获取工单过滤条件数组
export function getQuestionListFilter(data = {}) {
  return axios({
    url: `/question/get-list-filter`,
    method: 'get',
    params: data
  })
}

//获取系统工单
export function getQuestionList(data = {}) {
  return axios({
    url: `/question/list`,
    method: 'get',
    params: data
  })
}

//获取技术支持过滤条件数组
export function getQupportListFilter(data = {}) {
  return axios({
    url: `/support/get-list-filter`,
    method: 'get',
    params: data
  })
}

//获取技术支持
export function getQupportList(data = {}) {
  return axios({
    url: `/support/list`,
    method: 'get',
    params: data
  })
}

//技术支持转交
export function changeSupportTec(data = {}) {
  return axios({
    url: `/support/change-tec`,
    method: 'post',
    data
  })
}

//技术支持开始处理
export function startSupportDeal(data = {}) {
  return axios({
    url: `/support/start-deal`,
    method: 'post',
    data
  })
}

//技术支持结束处理
export function endSupportDeal(data = {}) {
  return axios({
    url: `/support/end-deal`,
    method: 'post',
    data
  })
}

//获取需求过滤条件分组
export function getNeedListFilter(data = {}) {
  return axios({
    url: `/need/list-filter`,
    method: 'get',
    params: data
  })
}

//获取需求列表
export function getNeedList(data = {}) {
  return axios({
    url: `/need/list`,
    method: 'get',
    params: data
  })
}
