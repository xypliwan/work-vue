const socketInfo = {
  state: {
    question: {}, //问题的消息
    infoCount: [], //新消息条数(工单的)
    answerReadQuestion: {}, // 设置已读 问题的答案

    support: {}, //技术支持的消息
    supportInfoCount: [], //新消息条数(技术支持的)
    answerReadSupport: {}, // 设置已读 支持的答案

    demand: {}, //需求的消息
    demandInfoCount: [], //需求新消息条数
    answerReadDemand: {}, //设置已读，需求的答案

    draftList: [], //工单/支持 草稿消息列表
    /**
     * id:   //问题id
     * supportId:   //支持id
     * cont: //草稿内容
     */
    draftDemandList: [], //需求  草稿箱列表
    /**
     * id:      //需求id
     * cont:    内容
     */

    cancelAnswer: {}, //消息测回的
    dealStatusInfo: {}, //技术支持是否解决
    /**
     *  deal_status:'',  0未处理 1处理中 2已解决 3未解决
     *  deal_status_name:'',  未处理  处理中   已解决   未解决
     * support_id:'',       //支持id
     * msg_type:'',             //消息类型
     */

    onlineStatusInfo: {}, //修改用户在线状态
    msgCenter: {}, //消息中心
    msgCount: null, //消息中心数量

    questionList: [], //工单会话的新列表
    documentTitleFlg: false, // true有新消息  false 没有新消息
    questionRemind: {}, //工单系统提醒
    supportRemind: {}, //技术系统提醒
    needRemind: {} //需求系统提醒
  },
  mutations: {
    SETQUESTIONREMIND: (state, obj) => {
      state.questionRemind = obj
    },
    SETSUPPORTREMIND: (state, obj) => {
      state.supportRemind = obj
    },
    SETNEEDREMIND: (state, obj) => {
      state.needRemind = obj
    },
    SET_QUESTION: (state, data) => {
      state.question = data
    },
    SET_SUPPORT: (state, data) => {
      state.support = data
    },
    SET_CANCELANSWER: (state, data) => {
      state.cancelAnswer = data
    },
    SET_INFOCOUNT: (state, list) => {
      state.infoCount = list
    },
    SET_DEALSTATUSINFO: (state, info) => {
      state.dealStatusInfo = info
    },
    SET_DRAFTLIST: (state, item) => {
      state.draftList.push(item)
    },
    DEL_DRAFTLIST: (state, index) => {
      state.draftList.splice(index, 1)
    },
    SETDRAFTDEMANDLIST: (state, item) => {
      state.draftDemandList.push(item)
    },
    DELDRAFTDEMANDLIST: (state, index) => {
      state.draftDemandList.splice(index, 1)
    },

    SETANSWERREADQUESTION: (state, obj) => {
      state.answerReadQuestion = obj
    },
    SETANSWERREADSUPPORT: (state, obj) => {
      state.answerReadSupport = obj
    },
    SETONLINESTATUSINFO: (state, obj) => {
      state.onlineStatusInfo = obj
    },
    SETSUPPORTINFOCOUNT: (state, info) => {
      state.supportInfoCount = info
    },
    SETMSGCENTER: (state, flg) => {
      state.msgCenter = flg
    },
    SETMSGCOUNT: (state, num) => {
      state.msgCount = num
    },
    SETDEMANDINFOCOUNT: (state, list) => {
      state.demandInfoCount = list
    },
    SETDEMAND: (state, info) => {
      state.demand = info
    },
    SETANSWERREADEMAND: (state, info) => {
      state.answerReadDemand = info
    },
    ADDQUESTIONLIST: (state, list) => {
      state.questionList = list
    },
    SETDOCUMENTTITLEFLG: (state, flg) => {
      state.documentTitleFlg = flg
    }
  }
}

export default socketInfo
