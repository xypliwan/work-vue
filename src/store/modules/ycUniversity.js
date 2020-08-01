const menuNav = {
<<<<<<< HEAD
  state: {
    eyesightList: [], //视角列表
    eyesightIndex: '', //当前选中的视角
    keyword: '', //搜索关键词
    isSearch: false, //触发搜索时
    searchFlg: false,
    workbenchType: 'all' //工作台类型
  },
  mutations: {
    SET_EYESIGHTLIST: (state, list) => {
      state.eyesightList = list
    },
    SET_EYESIGHTINDEX: (state, i) => {
      state.eyesightIndex = i
    },
    GET_KEYWORD: (state, keyword) => {
      state.keyword = keyword
    },
    SET_ISSEARCH: (state, status) => {
      state.isSearch = status
    },
    SET_SEARCHFLG: (state, flg) => {
      state.searchFlg = flg
    },
    SET_WORKBENCHTYPE: (state, type) => {
      state.workbenchType = type
    }
  }
}

export default menuNav
=======
    state: {
        eyesightList: [],        //视角列表
        eyesightIndex: '',       //当前选中的视角
        keyword: '',             //搜索关键词
        isSearch: false,          //触发搜索时
        searchFlg: false,
        workbenchType: 'all',        //工作台类型
    },
    mutations: {
        "SET_EYESIGHTLIST": (state, list) => {
            state.eyesightList = list;
        },
        "SET_EYESIGHTINDEX": (state, i) => {
            state.eyesightIndex = i;
        },
        "GET_KEYWORD": (state, keyword) => {
            state.keyword = keyword;
        },
        "SET_ISSEARCH": (state, status) => {
            state.isSearch = status;
        },
        "SET_SEARCHFLG": (state, flg) => {
            state.searchFlg = flg;
        },
        "SET_WORKBENCHTYPE": (state, type) => {
            state.workbenchType = type;
        }
    },

}

export default menuNav;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
