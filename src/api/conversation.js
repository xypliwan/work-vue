
import axios from '@/utils/axios'
//会话窗口


//获取左侧会话聊天窗口数字
export function getChatListNum(data = {}) {
    return axios({
        url: `/question/get-chat-list-num`,
        method: "get",
    })
};

//获取左侧会话列表
export function getChatList(data = {}) {
    return axios({
        url: `/question/get-chat-list`,
        method: "get",
        params: data
    })
};

//获取回答列表(聊天列表)
export function getAnswer(data = {}) {
    return axios({
        url: `/answer/get-answer`,
        method: "get",
        params: data
    })
};


//获取问题详情
export function getChatDetail(data = {}) {
    return axios({
        url: `/question/get-detail`,
        method: "get",
        params: data
    })
};


//撤回消息
export function cancelSend(data = {}) {
    return axios({
        url: `/answer/cancel-send`,
        method: "post",
        data
    })
};


//更新问题详情
export function updateQuestion(data = {}) {
    return axios({
        url: `/question/update`,
        method: "post",
        data
    })
};

//左侧处理中标签(客服角色专属)
export function getDealLabel(data = {}) {
    return axios({
        url: `/question/get-deal-label`,
        method: "get"
    })
};

//左侧已采纳标签(客服角色专属)
export function getDoneLabel(data = {}) {
    return axios({
        url: `/question/get-done-label`,
        method: "get"
    })
};


//获取转交人员列表(客服角色专属)
export function getResolveUserList(data = {}) {
    return axios({
        url: `/question/get-resolve-user-list`,
        method: "get"
    })
};

//提交客服转交处理
export function changeQuestionResolveUser(data = {}) {
    return axios({
        url: `/question/change-question-resolve-user`,
        method: "post",
        data
    })
};

//提交技术支持
export function addSupport(data = {}) {
    return axios({
        url: `/question/add-support`,
        method: "post",
        data
    })
};

//获取技术支持答案
export function getSupportAnswer(data = {}) {
    return axios({
        url: `/answer/get-support-answer`,
        method: "get",
        params: data
    })
};

//获取支持详情
export function getSupportDetail(data = {}) {
    return axios({
        url: `/support/get-detail`,
        method: "get",
        params: data
    })
};

//客服催办技术支持
export function getSupportNotify(data = {}) {
    return axios({
        url: `/support/notify`,
        method: "post",
        data
    })
};

//技术支持标记未处理
export function supportUndeal(data = {}) {
    return axios({
        url: `/support/undeal`,
        method: "post",
        data
    })
};

//添加总结（客户角色）
export function addQuestionSumByCustomer(data = {}) {
    return axios({
        url: `/sum/add-question-sum-by-customer`,
        method: "post",
        data
    })
};

//采纳标记未解决（客户角色）
export function questionUndeal(data = {}) {
    return axios({
        url: `/question/undeal`,
        method: "post",
        data
    })
};


//添加回答
export function addAnswer(data = {}) {
    return axios({
        url: `/answer/add`,
        method: "post",
        data
    })
};


//发起邀评(客服身份)
export function addServiceInvite(data = {}) {
    return axios({
        url: `/sum/add-service-invite`,
        method: "post",
        data
    })
};

//标记问题已读
export function setRead(data = {}) {
    return axios({
        url: `/question/set-read`,
        method: "post",
        data
    })
};

//设置消息已读
export function setAnswerRead(data = {}) {
    return axios({
        url: `/answer/set-answer-read`,
        method: "post",
        data
    })
};

//获取问题客户总结
export function getCustomerSum(data = {}) {
    return axios({
        url: `/question/get-customer-sum`,
        method: "get",
        params: data
    })
};