import Vue from 'vue';
import '@babel/polyfill';
import App from './App.vue';

import store from './store/index.js'
import router from "./router/index";

import "./assets/font/iconfont.css";
import "./assets/styles/global.scss";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor)

import mixin from '@/utils/mixin';
Vue.mixin(mixin);

//复制粘贴
import Clipboard from 'clipboard';
Vue.prototype.Clipboard = Clipboard;

import moment from 'moment';
Vue.prototype.$moment = moment;

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

Vue.config.productionTip = false;

new Vue({
  data: {
    tableTitileStyle: {
      "background-color": "#f5f5f5",
      "color": "#333333",
      "font-weight": "bold",
      "font-size": "13px",
      "height": "40px",
    },
    tableContentStyle: {
      "font-size": "13px",
      "color": "#666666",
      "height": "60px",
    }
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app')
