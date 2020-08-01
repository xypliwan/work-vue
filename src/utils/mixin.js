<<<<<<< HEAD
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
const minxin = {
  computed: {
    ...mapGetters(['permissionBtn']),
    isDev() {
      return process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    _message(msg, type = 'error') {
      Message({
        type: type,
        dangerouslyUseHTMLString: true,
        showClose: true,
        message: msg
      })
    },
    getMappingVal(arr, valkey, val, labkey) {
      let target = arr.filter(el => el[valkey] == val)
      return target.length > 0 ? target[0][labkey] : ''
    },
    isDisabledBtn(status, arr) {
      let flag = true
      for (let i = 0; i < arr.length; i++) {
        if (status == arr[i]) {
          flag = false
          break
        } else {
          flag = true
        }
      }
      return flag
    },
    copyAddress(desc = '链接复制成功', address) {
      //复制文字链接
      let clipboard = new this.Clipboard('.copy-class', {
        text: () => address
      })
      clipboard.on('success', () => {
        this._message(desc, 'success')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        // 不支持复制
        alert('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    hasPermissionBtn(btnCode) {
      return this.permissionBtn.includes(btnCode)
    }
  }
}
export default minxin
=======
import { Message } from "element-ui";
import { mapGetters } from 'vuex';
const minxin = {
    computed: {
        ...mapGetters(['permissionBtn']),
        isDev() {
            return process.env.NODE_ENV === 'development'
        }
    },
    methods: {
        _message(msg, type = 'error') {
            Message({
                type: type,
                dangerouslyUseHTMLString: true,
                showClose: true,
                message: msg
            });
        },
        getMappingVal(arr, valkey, val, labkey) {
            let target = arr.filter(el => el[valkey] == val);
            return target.length > 0 ? target[0][labkey] : ''
        },
        isDisabledBtn(status, arr) {
            let flag = true;
            for (let i = 0; i < arr.length; i++) {
                if (status == arr[i]) {
                    flag = false;
                    break;
                } else {
                    flag = true;
                }
            }
            return flag;
        },
        copyAddress(desc = "链接复制成功", address) {      //复制文字链接
            let clipboard = new this.Clipboard('.copy-class', {
                text: () => address
            });
            clipboard.on('success', e => {
                this._message(desc, 'success');
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on('error', e => {
                // 不支持复制
                alert('该浏览器不支持自动复制');
                // 释放内存
                clipboard.destroy();
            });
        },
        hasPermissionBtn(btnCode) {
            return this.permissionBtn.includes(btnCode);
        }
    },

}
export default minxin;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
