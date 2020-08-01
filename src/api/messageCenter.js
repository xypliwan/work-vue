import axios from '@/utils/axios'
//消息中心

//消息中心列表
export function getMessageList(data = {}) {
  return axios({
    url: `/message/list`,
    method: 'get',
    params: data
  })
}

//设置已读
export function setRead(data = {}) {
  return axios({
    url: `/message/set-read`,
    method: 'post',
    data
  })
}

//获取未读的数量
export function getUnreadNum(data = {}) {
  return axios({
    url: `/message/get-unread-num`,
    method: 'get',
    params: data
  })
}
