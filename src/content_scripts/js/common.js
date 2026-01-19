import { setSelectionStyles } from '@/lib/utils.js'
import storage from '@/lib/storage'
import './autofill'
console.log('common.js')
;(() => {
    const ICON_LINKS = Array.from(document.querySelectorAll('link'))
        .filter(({ rel }) => {
            return rel.includes('icon')
        })
        .map(({ href }) => href)
    console.log('ICON_LINKS', ICON_LINKS)
})()

// 点击翻译图标，保存单词到生词本
document.body.addEventListener('click', async (event) => {
    if (event.target.className == 'gtx-trans-icon') {
        const selection = window.getSelection()
        let string = selection.toString().trim()
        string.replaceAll('·', '')

        let words = (await storage.get('vocabulary')) || []
        if (/^[a-zA-Z]+$/.test(string) && !words.includes(string)) {
            console.log('add', string)
            storage.set('vocabulary', [string, ...words])
        }
        setSelectionStyles(selection, { color: '#FC6A03' })
    }
})

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
