import axios from '@/utils/exportAxios';
import { Loading, Message } from 'element-ui';
//获取地址栏参数
export function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export function isPone(phone) {
    let phones = Number(phone)
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phones)) {
        return false;
    } else {
        return true;
    }
}


export function formatMessage(data) {
    let message = '';
    if (Array.isArray(data)) {
        data.forEach(el => {
            message += `<p>${el}</p>`
        })
    } else {
        message = `<p>${data}</p>`
    }
    return message
}


//根据数组的某个key值去重
export function arrDeWeight(arr, key) {
    let result = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i][key]]) {
            result.push(arr[i]);
            obj[arr[i][key]] = true;
        }
    }
    return result
}


export function formateExcl(url, methods, data = {}, title) {
    let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    });
    axios({
        method: methods,
        url, // 请求地址
        params: data,
        data, // 参数
        responseType: 'blob' //  表明返回服务器返回的数据类型  这里注意要加上responseType
    })
        .then(res => {
            loadingInstance.close();
            // 处理返回的文件流
            const content = res;
            const blob = new Blob([content]);
            const fileName = title + '.csv';
            const alink = document.createElement('a');
            alink.download = fileName;
            alink.style.display = 'none';
            alink.href = URL.createObjectURL(blob); // 这里是将文件流转化为一个文件地址
            document.body.appendChild(alink);
            alink.click();
            URL.revokeObjectURL(alink.href); // 释放URL 对象
            document.body.removeChild(alink);
        })
        .catch(error => {
            loadingInstance.close();
            Message({
                message: formatMessage(error),
                type: 'error'
            })
        });
}


//去除字符串中dhtml标签
export function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, '');
};

//给定的时间是否超过一小时
export function isCanCancel(times) {
    // console.log(times.split(' '))
    let time = new Date(times).getTime();
    let nowTimestamp = new Date().getTime(); //当前时间戳
    let frontOneHour = new Date(new Date().getTime() - 1 * 60 * 60 * 1000); //距离当前时间一小时前
    let frontOneHourTimestamp = new Date(frontOneHour).getTime(); //距离当前时间一小时前的时间戳
    let timeDifference = nowTimestamp - frontOneHourTimestamp; //一个小时的时间戳
    return nowTimestamp - time < timeDifference;
}

export function getHoursMinutes(times) {
    let snapTime = new Date(times);
    let hours = snapTime.getHours() < 10 ? `0${snapTime.getHours()}` : snapTime.getHours();
    let minutes = snapTime.getMinutes() < 10 ? `0${snapTime.getMinutes()}` : snapTime.getMinutes();
    return `${hours}:${minutes}`;
}

//匹配字符串中是否含有url
export function httpString(str) {
    if (str.length > 0) {
        let regAll = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        let snapArr = [];
        let allUrl = str.match(regAll); //匹配所有的
        str.replace(/[^>]*=['"]([^'"]+)[^>]*>/gi, (match, capture) => {     //匹配像img a的url
            snapArr.push(capture);
        });
        if (allUrl) {
            let res = allUrl.filter(item => snapArr.indexOf(item) == -1);
            if (res) {
                res.forEach(el => {
                    str = str.replace(el, `<a href='${el}' target='_blank'>${el}</a>`);
                });
            } else {
                str = str
            }

        } else {
            str = str
        }
    } else {
        str = ''
    }
    return str
}


//判断当前是上午、下午、还是晚上  
//上午0  下午1  晚上2
export function isMorAorN() {
    let index = null
    let nowHours = new Date().getHours();
    if (nowHours > 6 && nowHours < 12) {
        index = 0;
    } else if (nowHours >= 12 && nowHours < 18) {
        index = 1;
    } else {
        index = 2;
    }
    return index;
}


