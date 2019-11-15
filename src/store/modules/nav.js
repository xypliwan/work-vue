const nav = {
    state: {
        menuNav: [],            //所有的导航栏列表
    },
    mutations: {
        "GET_MENULIST": (state, list) => {
            state.menuNav = list
        },

    },
    
}

export default nav;