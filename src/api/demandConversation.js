<<<<<<< HEAD
import axios from '@/utils/axios'
//会话窗口

//获取需求状态类型
export function getNeedStatus() {
  return axios({
    url: `/common/get-need-status`,
    method: 'get'
  })
}

//获取会话列表
export function getNeedChatList(data = {}) {
  return axios({
    url: `/need/get-chat-list`,
    method: 'get',
    params: data
  })
}

//获取需求详情
export function getNeedDetail(data = {}) {
  return axios({
    url: `/need/get-detail`,
    method: 'get',
    params: data
  })
}

//需求更新
export function needDetailUpdate(data = {}) {
  return axios({
    url: `/need/update-list`,
    method: 'post',
    data
  })
}

//获取需求答案
export function getNeedAnswer(data = {}) {
  return axios({
    url: `/answer/get-need-answer`,
    method: 'get',
    params: data
  })
}

//需求会话新消息数
export function getNeedChatListNum(data = {}) {
  return axios({
    url: `/need/get-chat-list-num`,
    method: 'get',
    params: data
  })
}

//设置列表已读
export function setNeedRead(data = {}) {
  return axios({
    url: `/need/set-read`,
    method: 'post',
    data
  })
}

//获取转交人列表
export function getNeedDealUserList(data = {}) {
  return axios({
    url: `/need/deal-user-list`,
    method: 'get',
    params: data
  })
}

//转交需求责任人
export function needChangeDealUser(data = {}) {
  return axios({
    url: `/need/change-deal-user`,
    method: 'post',
    data
  })
}

//查看变更日志
export function needCheckLog(data = {}) {
  return axios({
    url: `/need/check-log`,
    method: 'get',
    params: data
  })
}

//关联tapd
export function bindTapd(data = {}) {
  return axios({
    url: `/need/bind-tapd`,
    method: 'post',
    data
  })
}

//获取自定义字段
export function getCustomFieldsSettings(data = {}) {
  return axios({
    url: `/tapd/get-custom-fields-settings`,
    method: 'get',
    params: data
  })
}
=======

import axios from '@/utils/axios'
//会话窗口


//获取需求状态类型
export function getNeedStatus(data = {}) {
    return axios({
        url: `/common/get-need-status`,
        method: "get",
    })
};

//获取会话列表
export function getNeedChatList(data = {}) {
    return axios({
        url: `/need/get-chat-list`,
        method: "get",
        params: data
    })
};


//获取需求详情
export function getNeedDetail(data = {}) {
    return axios({
        url: `/need/get-detail`,
        method: "get",
        params: data
    })
};


//需求更新
export function needDetailUpdate(data = {}) {
    return axios({
        url: `/need/update-list`,
        method: "post",
        data
    })
};

//获取需求答案
export function getNeedAnswer(data = {}) {
    return axios({
        url: `/answer/get-need-answer`,
        method: "get",
        params: data
    })
};

//需求会话新消息数
export function getNeedChatListNum(data = {}) {
    return axios({
        url: `/need/get-chat-list-num`,
        method: "get",
        params: data
    })
};


//设置列表已读
export function setNeedRead(data = {}) {
    return axios({
        url: `/need/set-read`,
        method: "post",
        data
    })
};


//获取转交人列表
export function getNeedDealUserList(data = {}) {
    return axios({
        url: `/need/deal-user-list`,
        method: "get",
        params: data
    })
};


//转交需求责任人
export function needChangeDealUser(data = {}) {
    return axios({
        url: `/need/change-deal-user`,
        method: "post",
        data
    })
};


//查看变更日志
export function needCheckLog(data = {}) {
    return axios({
        url: `/need/check-log`,
        method: "get",
        params: data
    })
};

//关联tapd
export function bindTapd(data = {}) {
    return axios({
        url: `/need/bind-tapd`,
        method: "post",
        data
    })
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
