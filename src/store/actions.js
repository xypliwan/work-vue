import { getEyesight } from '@/api/ycUniversity';
import { getUnreadNum } from '@/api/messageCenter';
import { getUserInfo, getOnlineList } from '@/api/common';
import { getChatListNum } from '@/api/conversation';
import { getSupportChatListNum } from '@/api/technicalConversation';
import { Message, Loading } from 'element-ui';
import { getNeedChatListNum } from '@/api/demandConversation';


const actions = {
    "getUserinfo": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let loadingInstance = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            });
            try {
                let { data } = await getUserInfo();
                commit('GET_MENULIST', data.menu);
                commit('SET_USERNAME', data.username);
                commit('SET_ONLINESTATUS', data.online_status);
                commit('SET_CHATSERVICE', data.chatService);
                commit('SET_SYSTEMLIST', data.product);
                commit('SET_ISTEC', data.isTec);
                commit('SET_USERID', data.user_id);
                commit('SET_PERMISSIONBTN', data.button);
                commit('SETPRODUCTOR', data.productor);
                commit('SETCOMPANYID', data.company_id);
                commit('SETCHECKALLNEED', data.checkAllNeed);
                commit('SETAVATAR', data.head_img);
                console.log(`账号身份chatService--${data.chatService}:${data.chatService == '0' ? '客户' : '客服'}`);
                console.log(`是否为技术人员isTec--${data.isTec}:${data.isTec == '0' ? '非技术人员' : '技术人员'}`);
                if (data.product.length) {
                    commit('SET_CURRENTSYSTEMIDX', data.product[0].product_id)
                }
                resolve(data)
            } catch (error) {
                Message({
                    message: error,
                    type: 'error'
                })
            }
            setTimeout(() => {
                loadingInstance.close();
            }, 20)
        })
    },
    "setStatusList": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let { data } = await getOnlineList();
            resolve(data);
            commit('SET_STATUSLIST', data)
        })
    },
    "setEyesightList": ({ commit }) => {      //获取视角
        return new Promise(async (resolve, reject) => {
            let { data } = await getEyesight();
            resolve(data);
            commit('SET_EYESIGHTLIST', data);
        })
    },
    "setCurrentSystemIdx": ({ commit }, i) => {
        return commit('SET_CURRENTSYSTEMIDX', i)
    },
    "setEyesightIndex": ({ commit }, i) => {
        return commit('SET_EYESIGHTINDEX', i)
    },
    "getKeyword": ({ commit }, keyword) => {
        return commit('GET_KEYWORD', keyword)
    },
    "setIsSearch": ({ commit }, status) => {
        return commit('SET_ISSEARCH', status)
    },
    "setSearchFlg": ({ commit }, flg) => {
        return commit('SET_SEARCHFLG', flg)
    },
    "setQuestion": ({ commit }, data) => {
        return commit('SET_QUESTION', data)
    },
    "setSupport": ({ commit }, data) => {
        return commit('SET_SUPPORT', data)
    },
    "setCancelAnswer": ({ commit }, data) => {
        return commit('SET_CANCELANSWER', data)
    },
    "setInfoCount": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let { data } = await getChatListNum();
            resolve(data);
            commit('SET_INFOCOUNT', data)
        })
    },
    "setDealStatusInfo": ({ commit }, status) => {
        return commit('SET_DEALSTATUSINFO', status)
    },
    "setDraftList": ({ commit }, item) => {
        return commit('SET_DRAFTLIST', item)
    },
    "delDraftList": ({ commit }, index) => {
        return commit('DEL_DRAFTLIST', index)
    },
    "setDraftDemandList": ({ commit }, item) => {
        return commit('SETDRAFTDEMANDLIST', item);
    },
    "delDraftDemandList": ({ commit }, index) => {
        return commit('DELDRAFTDEMANDLIST', index)
    },
    "setAnswerReadQuestion": ({ commit }, obj) => {
        return commit('SETANSWERREADQUESTION', obj)
    },
    "setAnswerReadSupport": ({ commit }, obj) => {
        return commit('SETANSWERREADSUPPORT', obj)
    },
    "setOnlineStatus": ({ commit }, code) => {
        return commit('SET_ONLINESTATUS', code)
    },
    "setOnlineStatusInfo": ({ commit }, obj) => {
        return commit('SETONLINESTATUSINFO', obj)
    },
    "setSupportInfoCount": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let { data } = await getSupportChatListNum();
            resolve(data);
            commit('SETSUPPORTINFOCOUNT', data)
        })
    },
    "setMsgCenter": ({ commit }, flg) => {
        return commit('SETMSGCENTER', flg)
    },
    "setMsgCount": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let { data } = await getUnreadNum();
            resolve(data.num);
            commit('SETMSGCOUNT', data.num);
        })
    },
    "setDemandInfoCount": ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            let { data } = await getNeedChatListNum();
            commit('SETDEMANDINFOCOUNT', data)
            resolve(data);
        })
    },
    "setDemand": ({ commit }, info) => {
        return commit('SETDEMAND', info);
    },
    "setDemandSocketInfoCount": ({ commit }, list) => {
        return commit('SETDEMANDINFOCOUNT', list);
    },
    "setAnswerReadMand": ({ commit }, info) => {
        return commit('SETANSWERREADEMAND', info);
    },
    "setWorkbenchType": ({ commit }, type) => {
        return commit('SET_WORKBENCHTYPE', type);
    }


}

export default actions;