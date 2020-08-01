import axios from 'axios'
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage'
import { Message } from 'element-ui'
import baseURL from '@/config/baseUrl'
import { formatMessage } from '_u/utils'

const service = axios.create({
  baseURL: baseURL.requestUrl,
  timeout: 60000
})

//请求拦截器
service.interceptors.request.use(
  config => {
    let token = getLocalStorage('Access-Token')

    if (token) {
      config.headers['Content-Type'] = 'application/json'
      config.headers['Access-Token'] = token
    }
    return config
  },
  error => {
    Message.error({
      message: JSON.stringify(error),
      showClose: true,
      type: 'error'
    })
    // return Promise.reject(error)
    return
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code == 200) {
      if (res.error == 1001) {
        removeLocalStorage('Access-Token')
        setTimeout(() => {
          window.open(baseURL.loginUrl, '_self')
        }, 800)
        return Promise.reject(formatMessage(res.message))
      } else if (res.error == 0) {
        return res
      } else {
        return Promise.reject(formatMessage(res.message))
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        Message.error({
          message: `服务端错误：${JSON.stringify(res)}`,
          showClose: true,
          type: 'error'
        })
      } else {
        Message.error({
          message: `服务器异常`,
          showClose: true,
          type: 'error'
        })
      }
    }
  },
  error => {
    if (process.env.NODE_ENV === 'development') {
      Message.error({
        message: `服务端错误：${JSON.stringify(error)}`,
        showClose: true,
        type: 'error'
      })
    } else {
      Message.error({
        message: `网络异常`,
        showClose: true,
        type: 'error'
      })
    }
  }
)
export default service
