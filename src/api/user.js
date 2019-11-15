import axios from '@/utils/axios'
//用户

//退出登录
export function loginout(data = {}) {
    return axios({
        url: `/login/loginout`,
        method: "get",
    })
};


export function getAccessToken(data = {}) {
    return axios({
        url: `/login/get-access-token`,
        method: "get",
        params: data
    })
};
