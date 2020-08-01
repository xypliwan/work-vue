import axios from '@/utils/axios'
//支持会话

//获取聊天列表
export function getSupportChatList(data = {}) {
  return axios({
    url: `/support/get-chat-list`,
    method: 'get',
    params: data
  })
}

//聊天列表新消息已读
export function setSupportRead(data = {}) {
  return axios({
    url: `/support/msg-checked`,
    method: 'get',
    params: data
  })
}

//获取聊天新消息数字
export function getSupportChatListNum(data = {}) {
  return axios({
    url: `/support/get-chat-list-num`,
    method: 'get',
    params: data
  })
}
