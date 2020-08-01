<<<<<<< HEAD
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
=======

import axios from '@/utils/axios'
//消息中心


//消息中心列表
export function getMessageList(data = {}) {
    return axios({
        url: `/message/list`,
        method: "get",
        params: data
    })
};


//设置已读
export function setRead(data = {}) {
    return axios({
        url: `/message/set-read`,
        method: "post",
        data
    })
};

//获取未读的数量
export function getUnreadNum(data = {}) {
    return axios({
        url: `/message/get-unread-num`,
        method: "get",
        params: data
    })
};


>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
