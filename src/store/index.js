import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import user from './modules/user'
import ycUniversity from './modules/ycUniversity'
import socketInfo from './modules/socketInfo'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nav,
    user,
    ycUniversity,
    socketInfo
  },
  getters,
  actions
})
<<<<<<< HEAD
=======

>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
