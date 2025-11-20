// 避免该文件多次执行

// const _addEventListener = EventTarget.prototype.addEventListener;
// EventTarget.prototype.addEventListener = function (type, listener, options) {
//     if (!this.eventListeners) {
//         this.eventListeners = {};
//     }
//     if (!this.eventListeners[type]) {
//         this.eventListeners[type] = new Set();
//     }
//     this.eventListeners[type].add(listener);
//     _addEventListener.call(this, type, listener, options);
// }
import { setSelectionStyles } from '@/lib/utils.js'

;(() => {
    const ICON_LINKS = Array.from(document.querySelectorAll('link'))
        .filter(({ rel }) => {
            return rel.includes('icon')
        })
        .map(({ href }) => href)
    console.log('ICON_LINKS', ICON_LINKS)
})()

const registerCombinedKeys = (() => {
    let list = []
    document.addEventListener('keydown', function (event) {
        list.map(([]) => {})
    })
    return (keys, callback) => {}
})()

// 组合键
document.addEventListener('keydown', function (event) {
    let selection = window.getSelection()
    let string = selection.toString().trim()
    if (!string) return
    if (event.altKey && event.key.toLowerCase() === 'c') {
        // 增加颜色
        setSelectionStyles(selection, { color: '#FC6A03' })
    }
    if (event.altKey && event.key.toLowerCase() === 'b') {
        // bold
        setSelectionStyles(selection, { fontWeight: 'bold' })
    }
    if (event.altKey && event.key.toLowerCase() === 'u') {
        setSelectionStyles(selection, { textDecoration: 'underline #FC6A03' })
    }
    if (event.altKey && event.key.toLowerCase() === 'h') {
        // highlight
        setSelectionStyles(selection, { backgroundColor: 'yellow' })
    }
    // ctrl + z
    if (event.ctrlKey && event.key.toLowerCase() === 'z') {
        // undo
    }

    // alt + s
    if (event.altKey && event.key.toLowerCase() === 's') {
        // save selection to note
        const text = selection.toString().trim()
        if (text) {
            //
        }
    }
})
