import axios from '@/utils/axios'
//tapd


//获取成员
export function getTapdUsers(data = {}) {
    return axios({
        url: `/tapd/get-users`,
        method: "get",
        params: data
    })
};

//需求分类
export function getTapdCategorys(data = {}) {
    return axios({
        url: `/tapd/get-categorys`,
        method: "get",
        params: data
    })
};

//获取来源
export function getTapdSource(data = {}) {
    return axios({
        url: `/tapd/get-source`,
        method: "get",
        params: data
    })
};


//获取模块
export function getTapdModules(data = {}) {
    return axios({
        url: `/tapd/get-modules`,
        method: "get",
        params: data
    })
};

//提交到tapd
export function addTapdStories(data = {}) {
    return axios({
        url: `/tapd/add-stories`,
        method: "post",
        data
    })
};