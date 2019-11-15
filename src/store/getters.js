const getters = {
    menuNav: state => state.nav.menuNav,

    username: state => state.user.username,
    userId: state => state.user.userId,
    companyId: state => state.user.companyId,
    onlineStatus: state => state.user.onlineStatus,
    chatService: state => state.user.chatService,
    statusList: state => state.user.statusList,
    systemList: state => state.user.systemList,
    isTec: state => state.user.isTec,
    currentSystemIdx: state => state.user.currentSystemIdx,
    permissionBtn: state => state.user.permissionBtn,
    productor: state => state.user.productor,
    checkAllNeed: state => state.user.checkAllNeed,
    avatar: state => state.user.avatar,

    eyesightList: state => state.ycUniversity.eyesightList,
    eyesightIndex: state => state.ycUniversity.eyesightIndex,

    keyword: state => state.ycUniversity.keyword,
    isSearch: state => state.ycUniversity.isSearch,
    searchFlg: state => state.ycUniversity.searchFlg,
    workbenchType: state => state.ycUniversity.workbenchType,

    question: state => state.socketInfo.question,
    support: state => state.socketInfo.support,
    cancelAnswer: state => state.socketInfo.cancelAnswer,
    infoCount: state => state.socketInfo.infoCount,
    dealStatusInfo: state => state.socketInfo.dealStatusInfo,
    draftList: state => state.socketInfo.draftList,
    answerReadQuestion: state => state.socketInfo.answerReadQuestion,
    answerReadSupport: state => state.socketInfo.answerReadSupport,
    onlineStatusInfo: state => state.socketInfo.onlineStatusInfo,
    supportInfoCount: state => state.socketInfo.supportInfoCount,
    msgCenter: state => state.socketInfo.msgCenter,
    msgCount: state => state.socketInfo.msgCount,
    demandInfoCount: state => state.socketInfo.demandInfoCount,
    demand: state => state.socketInfo.demand,
    answerReadDemand: state => state.socketInfo.answerReadDemand,
    draftDemandList: state => state.socketInfo.draftDemandList,






}

export default getters;