<<<<<<< HEAD
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

const menuNav = {
  state: {
    username: '',
    avatar: '', //头像链接
    userId: '', //用户id
    companyId: '', //所属公司id
    onlineStatus: '', //在线状态id
    chatService: null, //用户身份   0客户   1客服
    isTec: null, //0非技术人员   1技术人员
    statusList: [], //在线状态列表
    systemList: [], //系统列表
    currentSystemIdx: getLocalStorage('systemIdx') || '', //选中的系统index
    permissionBtn: [], //权限按钮
    productor: '', //1产品人员
    checkAllNeed: '', //查看所有需求和提交需求的按钮权限  1 /  0,
    homeTab: [], //首页tab
    checkRemind: 1, //聊天栏的系统提醒是否显示  后台提供
    showSystemRemind: false //聊天栏系统提醒是否显示（箭头控制，前端自己提供）
  },
  mutations: {
    SET_USERNAME: (state, name) => {
      state.username = name
    },
    SETAVATAR: (state, img) => {
      state.avatar = img
    },
    SET_ONLINESTATUS: (state, status) => {
      state.onlineStatus = status
    },
    SET_STATUSLIST: (state, list) => {
      state.statusList = list
    },
    SET_SYSTEMLIST: (state, list) => {
      state.systemList = list
    },
    SET_CURRENTSYSTEMIDX: (state, index) => {
      state.currentSystemIdx = index
      setLocalStorage('systemIdx', index)
    },
    SET_CHATSERVICE: (state, index) => {
      state.chatService = index
    },
    SET_ISTEC: (state, status) => {
      state.isTec = status
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_PERMISSIONBTN: (state, btnArr) => {
      state.permissionBtn = btnArr
    },
    SETPRODUCTOR: (state, status) => {
      state.productor = status
    },
    SETCOMPANYID: (state, id) => {
      state.companyId = id
    },
    SETCHECKALLNEED: (state, flg) => {
      state.checkAllNeed = flg
    },
    SETHOMETAB: (state, list) => {
      state.homeTab = list
    },
    SETCHECKREMIND: (state, num) => {
      state.checkRemind = num
    },
    SETSYSTEMREMIND: state => {
      state.showSystemRemind = !state.showSystemRemind
    }
  }
}

export default menuNav
=======
const menuNav = {
    state: {
        username: '',
        avatar: '',              //头像链接
        userId: '',              //用户id       
        companyId: '',           //所属公司id
        onlineStatus: '',       //在线状态id
        chatService: null,         //用户身份   0客户   1客服
        isTec: null,                 //0非技术人员   1技术人员
        statusList: [],         //在线状态列表
        systemList: [],          //系统列表
        currentSystemIdx: '',        //选中的系统index
        permissionBtn: [],           //权限按钮
        productor: '',                   //1产品人员 
        checkAllNeed: '',            //查看所有需求和提交需求的按钮权限  1 /  0
    },
    mutations: {
        "SET_USERNAME": (state, name) => {
            state.username = name;
        },
        "SETAVATAR": (state, img) => {
            state.avatar = img;
        },
        "SET_ONLINESTATUS": (state, status) => {
            state.onlineStatus = status;
        },
        "SET_STATUSLIST": (state, list) => {
            state.statusList = list;
        },
        "SET_SYSTEMLIST": (state, list) => {
            state.systemList = list;
        },
        "SET_CURRENTSYSTEMIDX": (state, index) => {
            state.currentSystemIdx = index;
        },
        "SET_CHATSERVICE": (state, index) => {
            state.chatService = index;
        },
        "SET_ISTEC": (state, status) => {
            state.isTec = status;
        },
        "SET_USERID": (state, id) => {
            state.userId = id;
        },
        "SET_PERMISSIONBTN": (state, btnArr) => {
            state.permissionBtn = btnArr;
        },
        "SETPRODUCTOR": (state, status) => {
            state.productor = status;
        },
        "SETCOMPANYID": (state, id) => {
            state.companyId = id;
        },
        "SETCHECKALLNEED": (state, flg) => {
            state.checkAllNeed = flg;
        }





    },

}

export default menuNav;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
