import axios from 'axios'
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { Message } from 'element-ui'
import baseURL from "@/config/baseUrl"
import router from '@/router/index'
import { formatMessage } from '_u/utils';

const service = axios.create({
    baseURL: baseURL.requestUrl,
    timeout: 40000
});

//请求拦截器
service.interceptors.request.use(
    config => {
        let token = getLocalStorage('Access-Token');
        if (token) {
            config.headers["Content-Type"] = "application/json";
            config.headers["Access-Token"] = token;
        }
        return config;
    },
    error => {
        Message.error({
            message: JSON.stringify(error),
            type: "error"
        });
        return Promise.reject(error);
    }
);
// 添加响应拦截器
service.interceptors.response.use(
    response => {

        let res = response.data;
        return res;

    },
    error => {
        Message.error({
            message: `服务端错误：${JSON.stringify(error)}`,
            type: "error"
        });
        return Promise.reject(error);
    }
);
export default service;

// 此请求方法只用来请求下载乱码的二进制流文件