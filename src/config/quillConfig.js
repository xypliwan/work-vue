
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['sourceEditor'],     //新添加的工具
    ['image'],
    
];

const titleConfig = {
    'ql-image': '图片',
    'ql-sourceEditor': '表情'
};
 const selectExpression = {
    shadeBox: null,
    sourceEditor(cb) {     //添加工具方法
        // alert('我新添加的工具方法');
        // console.log(this.quill.getSelection())
        // // this.visible = true
        // console.log(this.visible)
        // cb()
        // console.log(this)
    }
};

export const defaultConfig = {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: selectExpression  // 事件重写
        }
    },
    initButton() {      //在使用的页面中初始化按钮样式
        const sourceEditorButton = document.querySelector('.ql-sourceEditor');
        sourceEditorButton.innerHTML = '<i class="iconfont icon-biaoqing1"></i>'
    }
}

export function addQuillTitle() {
    const oToolBar = document.querySelector('.ql-toolbar'),
        aButton = oToolBar.querySelectorAll('button'),
        aSelect = oToolBar.querySelectorAll('select');
    aButton.forEach(function (item) {
        if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标';
        } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进';
        } else {
            item.title = titleConfig[item.classList[0]];
        }
    });
    aSelect.forEach(function (item) {
        item.parentNode.title = titleConfig[item.classList[0]];
    });
}