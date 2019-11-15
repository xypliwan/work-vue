import axios from '@/utils/axios'
//快捷回复

//添加板块分类
export function addTemplate(data = {}) {
    return axios({
        url: `/reply-template/add-category`,
        method: "post",
        data
    })
};

//获取模板板块列表
export function getTemplateList(data = {}) {
    return axios({
        url: `/reply-template/get-category`,
        method: "get",
        params: data
    })
};


//更新模板板块分类
export function updateTemplate(data = {}) {
    return axios({
        url: `/reply-template/update-category`,
        method: "post",
        data
    })
};


//删除模板板块分类
export function deleteTemplate(data = {}) {
    return axios({
        url: `/reply-template/del-category`,
        method: "post",
        data
    })
};

//添加模板
export function addTemplateCont(data = {}) {
    return axios({
        url: `/reply-template/add-template`,
        method: "post",
        data
    })
};

//获取模板列表
export function getTemplateContList(data = {}) {
    return axios({
        url: `/reply-template/get-template-list`,
        method: "get",
        params: data
    })
};

//跟新模板内容
export function updateTemplateCont(data = {}) {
    return axios({
        url: `/reply-template/update-template`,
        method: "post",
        data
    })
};

//删除模板内容
export function delTemplateCont(data = {}) {
    return axios({
        url: `/reply-template/del-template`,
        method: "post",
        data
    })
};


//获取模板列表，返回数组格式
export function getTemplateFormat(data = {}) {
    return axios({
        url: `/reply-template/get-template-list-format-arr`,
        method: "get",
        params: data
    })
};