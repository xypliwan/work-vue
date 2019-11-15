import axios from '@/utils/axios'
//客户服务平台

//提交工单
export function addQuestion(data = {}) {
    return axios({
        url: `/question/add`,
        method: "post",
        data
    })
};

//获取技术支持人员
export function getTecPeople(data = {}) {
    return axios({
        url: `/support/get-tec-people`,
        method: "get",
        params: data
    })
};

//提交支持
export function addSupport(data = {}) {
    return axios({
        url: `/support/add`,
        method: "post",
        data
    })
};

//获取需求模块
export function needGetModel(data = {}) {
    return axios({
        url: `/need/get-model`,
        method: "get",
        params: data
    })
};


//提交需求
export function submitDemand(data = {}) {
    return axios({
        url: `/need/add`,
        method: "post",
        data
    })
};

//获取用户提交需求的联系方式
export function getUserContact(data = {}) {
    return axios({
        url: `/need/get-user-contact`,
        method: "get",
        params: data
    })
};