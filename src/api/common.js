import axios from '@/utils/axios'
//公共接口--

//上传图片
export function commonUpload(data = {}) {
  return axios({
    url: `/common/upload`,
    method: 'post',
    data
  })
}

//获取状态值
export function getUserInfo() {
  return axios({
    url: `/user/get-user-info`,
    method: 'get'
  })
}

//获取用户在线状态列表
export function getOnlineList() {
  return axios({
    url: `/user/get-online-status-list`,
    method: 'get'
  })
}

//更改在线状态
export function setOnlineStatus(data = {}) {
  return axios({
    url: `/user/change-online-status`,
    method: 'post',
    data
  })
}

//易仓大学知识板块基础数据

//易仓大学知识板块获取一级模块
export function getFirstKnowledgeModel(data = {}) {
  return axios({
    url: `/common/get-first-knowledge-model`,
    method: 'get',
    params: data
  })
}

//易仓大学知识板块获取二级模块
export function getSecondKnowledgeModel(data = {}) {
  return axios({
    url: `/common/get-second-knowledge-model`,
    method: 'get',
    params: data
  })
}

//客户服务平台---提交工单----获取问题/支持 分类
export function getQuestionSupportCategory(data = {}) {
  return axios({
    url: `/common/get-question-support-category`,
    method: 'get',
    params: data
  })
}

//客户服务平台---提交工单----获取提交工单/技术支持 影响范围
export function getQuestionRange(data = {}) {
  return axios({
    url: `/common/get-question-range`,
    method: 'get',
    params: data
  })
}

//获取某个产品下的用户
export function getProductUser(data = {}) {
  return axios({
    url: `/common/get-product-user`,
    method: 'get',
    params: data
  })
}

//获取标签 客户/客服/技术支持
export function getTags(data = {}) {
  return axios({
    url: `/common/get-tags`,
    method: 'get',
    params: data
  })
}

//查询新工单系统对应旧工单系统的id
export function checkOldQuestionId(data = {}) {
  return axios({
    url: `/question/check-old-question-id`,
    method: 'get',
    params: data
  })
}

//获取所有公司
export function getCompany(data = {}) {
  return axios({
    url: `/common/get-company`,
    method: 'get',
    params: data
  })
}

//获取公司下的人员
export function getCompanyUser(data = {}) {
  return axios({
    url: `/common/get-company-user`,
    method: 'get',
    params: data
  })
}

//获取tapd项目
export function getTapdWorkspace(data = {}) {
  return axios({
    url: `/common/get-tapd-workspace`,
    method: 'get',
    params: data
  })
}

//获取优先级
export function getPriority(data = {}) {
  return axios({
    url: `/tapd/get-priority`,
    method: 'get',
    params: data
  })
}

//获取用户通过关键词
export function getUserBySearch(data = {}) {
  return axios({
    url: `/common/get-user-by-search`,
    method: 'get',
    params: data
  })
}

//获取公司名字通过关键字
export function getCompanyBySearch(data = {}) {
  return axios({
    url: `/common/get-company-by-search`,
    method: 'get',
    params: data
  })
}

//获取技术支持的项目
export function getSupportProject(data = {}) {
  return axios({
    url: `/common/get-support-project`,
    method: 'get',
    params: data
  })
}

//内容搜索
export function getSearchPageList(data = {}) {
  return axios({
    url: `/es/search`,
    method: 'get',
    params: data
  })
}

//获取转交原因模板 ceshi
export function getRemark() {
  return axios({
    url: `/common/get-remark`,
    method: 'get'
  })
}

//获取eccang官网的token
export function getEccangToken() {
  return axios({
    url: `/common/get-eccang-token`,
    method: 'get'
  })
}
