<template>
  <el-row v-loading="editLoading">
<<<<<<< HEAD
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
=======
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  </el-row>
</template>

<script>
<<<<<<< HEAD
import { commonUpload } from '@/api/common'
import { httpString } from '_u/utils'
=======
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import baseURL from '@/config/baseUrl';
import { commonUpload } from '@/api/common';
import { httpString } from '_u/utils';
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78

export default {
  data() {
    return {
      content: '',
      editorOption: {
        placeholder: '请输入您想说的话',
        theme: 'snow' // 主题
      },
      editLoading: false,
      isEditPage: true
<<<<<<< HEAD
    }
  },
  mounted() {
    this.isEditPage = true
    document.addEventListener('click', this.test)
    let doms = document.getElementsByClassName('ql-editor')[0]
    doms.addEventListener('paste', e => {
      this.pasteInfo(e)
    })
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
=======
    };
  },
  mounted() {
    this.isEditPage = true;
    document.addEventListener('click', this.test);
    let doms = document.getElementsByClassName('ql-editor')[0];
    doms.addEventListener('paste', e => {
      this.pasteInfo(e);
    });
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    }
  },
  methods: {
    setFoucsEdit() {
<<<<<<< HEAD
      this.editor.focus()
    },
    getHtml() {
      return httpString(this.content)
    },
    clearHtml() {
      this.content = ''
    },
    showHtml(val) {
      let quill = this.$refs.myQuillEditor.quill
      quill.focus()
      this.content = val
      let length = quill.getSelection().index
      quill.setSelection(length + 1)
    },
    concatVal(val) {
      let quill = this.$refs.myQuillEditor.quill
      quill.focus()
      let length = quill.getSelection().index
      quill.insertEmbed(length, 'image', val)
      quill.setSelection(length + 1)
    },
    pasteInfo(e) {
      const cbd = e.clipboardData
      const ua = window.navigator.userAgent
      // 如果是 Safari 直接 return
      if (!(e.clipboardData && e.clipboardData.items)) {
        return
=======
      this.editor.focus();
    },
    getHtml() {
      return httpString(this.content);
    },
    clearHtml() {
      this.content = '';
    },
    showHtml(val) {
      let quill = this.$refs.myQuillEditor.quill;
      quill.focus();
      this.content = val;
      let length = quill.getSelection().index;
      quill.setSelection(length + 1);
    },
    concatVal(val) {
      let quill = this.$refs.myQuillEditor.quill;
      quill.focus();
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', val);
      quill.setSelection(length + 1);
    },
    pasteInfo(e) {
      const cbd = e.clipboardData;
      const ua = window.navigator.userAgent;
      // 如果是 Safari 直接 return
      if (!(e.clipboardData && e.clipboardData.items)) {
        return;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      }
      if (
        cbd.items &&
        cbd.items.length === 2 &&
        cbd.items[0].kind === 'string' &&
        cbd.items[1].kind === 'file' &&
        cbd.types &&
        cbd.types.length === 2 &&
        cbd.types[0] === 'text/plain' &&
        cbd.types[1] === 'Files' &&
        ua.match(/Macintosh/i) &&
        Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49
      ) {
<<<<<<< HEAD
        return
      }
      for (let i = 0; i < cbd.items.length; i++) {
        let item = cbd.items[i]
        if (item.kind == 'file') {
          // blob 就是从剪切板获得的文件，可以进行上传或其他操作
          const blob = item.getAsFile()
          if (blob.size === 0) {
            return
          }
          let formData = new FormData()
          formData.append('upload_file', blob)
          this.commonUpload(formData)
=======
        return;
      }
      console.log(cbd,'cbd.items')
      for (let i = 0; i < cbd.items.length; i++) {
        let item = cbd.items[i];
        if (item.kind == 'file') {
          // blob 就是从剪切板获得的文件，可以进行上传或其他操作
          const blob = item.getAsFile();
          if (blob.size === 0) {
            return;
          }
          let formData = new FormData();
          formData.append('upload_file', blob);
          this.commonUpload(formData);
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
        }
      }
    },
    async commonUpload(params) {
<<<<<<< HEAD
      this.editLoading = true
      try {
        let { data } = await commonUpload(params)
        this.concatVal(data.url)

        //此处只为解决SB火狐浏览器，粘贴时会产生额外一张图片（base64形式）的处理
        this.$nextTick(() => {
          let editorDom = this.$refs.myQuillEditor.quill.root
          let imgs = editorDom.getElementsByTagName('img')
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.width = '100px!important'
            imgs[i].style.maxHeight = '50%!important'
            let content = imgs[i].attributes['src'].value
            if (content.search('base64') !== -1) {
              imgs[i].remove()
            }
          }
        })
=======
      this.editLoading = true;
      try {
        let { data } = await commonUpload(params);
        this.concatVal(data.url);

        //此处只为解决SB火狐浏览器，粘贴时会产生额外一张图片（base64形式）的处理
        let editorDom = this.$refs.myQuillEditor.quill.root;
        let imgs = editorDom.getElementsByTagName('img');
        console.log(imgs);
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].style.width = '100px!important';
          imgs[i].style.maxHeight = '50%!important';
          let content = imgs[i].attributes['src'].value;
          if (content.search('base64') !== -1) {
            imgs[i].remove();
          }
        }
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      } catch (error) {
        // console.log(error);
        // this._message(error);
      }
<<<<<<< HEAD
      this.editLoading = false
=======
      this.editLoading = false;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
    },
    keydownCallback(e) {
      //ctrl + enter  快捷键发送
      if (e.ctrlKey && e.keyCode == 13) {
<<<<<<< HEAD
        this.$emit('sendInfo')
      }
    },
    onmousedownCallback(e) {
      console.log(e)
    },
    test() {
=======
        this.$emit('sendInfo');
      }
    },
    onmousedownCallback(e){
      console.log(e)
    },
    test(e) {
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      if (this.isEditPage) {
        // console.log(e);
      }
    },
<<<<<<< HEAD
    onEditorReady() {
=======
    onEditorReady(editor) {
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
      // 准备编辑器
    },
    onEditorBlur() {
      // 失去焦点事件
<<<<<<< HEAD
      document.removeEventListener('keydown', this.keydownCallback)
      let doms = document.getElementsByClassName('ql-editor')[0]
      doms.removeEventListener('paste', this.pasteInfo(2))
    },
    onEditorFocus() {
      document.addEventListener('keydown', this.keydownCallback)
      document.addEventListener('onmousedown', this.onmousedownCallback)
    }, // 获得焦点事件
    onEditorChange() {
      // 内容改变事件
      this.$emit('changeVal', this.content)
    }
  },
  destroyed() {
    this.isEditPage = false
    window.removeEventListener('click', this.test)
  }
}
=======
      document.removeEventListener('keydown', this.keydownCallback);
      let doms = document.getElementsByClassName('ql-editor')[0];
      doms.removeEventListener('paste', this.pasteInfo(2));
    },
    onEditorFocus() {
      document.addEventListener('keydown', this.keydownCallback);
      document.addEventListener('onmousedown', this.onmousedownCallback);
    }, // 获得焦点事件
    onEditorChange() {
      // 内容改变事件
      this.$emit('changeVal', this.content);
    }
  },
  destroyed() {
    this.isEditPage = false;
    window.removeEventListener('click', this.test);
  }
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
</script>

<style lang="scss" scoped>
/deep/ .ql-editor {
<<<<<<< HEAD
  // min-height: 120px !important;
=======
  min-height: 90px !important;
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
  // max-height: 115px !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
  text-align: justify;
  overflow-y: auto;

  /deep/ p {
    word-wrap: break-word !important;
    word-break: break-all !important;
  }
  /deep/ img {
    max-width: 100px !important;
    max-height: 80px !important;
  }
  img {
    max-width: 100px;
    max-height: 80px;
  }
  /deep/ .file-type {
    display: inline-block;
    i {
      float: left;
      font-size: 15px;
    }
    p {
      font-size: 12px;
    }
  }
}
/deep/ .ql-toolbar {
  display: none !important;
}
/deep/ .ql-container.ql-snow {
  border: none;
}
</style>
