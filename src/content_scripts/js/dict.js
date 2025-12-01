import { setSelectionStyles } from '@/lib/utils'
import storage from '@/lib/storage'
document.body.addEventListener('click', async (event) => {
    if (event.target.className == 'gtx-trans-icon') {
        const selection = window.getSelection()
        let string = selection.toString().trim()
        string.replaceAll('·', '')

        let words = (await storage.get('vocabulary')) || []
        if (isEnglish(string) && !words.includes(string)) {
            console.log('add', string)
            storage.set('vocabulary', [string, ...words])
        }
        setSelectionStyles(selection, { color: '#FC6A03' })
    }
})

function isEnglish(text) {
    return /^[a-zA-Z]+$/.test(text)
}
function highlightText(root, text) {
    if (!text) return
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
    )

    const nodes = []
    while (walker.nextNode()) {
        nodes.push(walker.currentNode)
    }

    nodes.forEach((node) => {
        const idx = node.nodeValue.indexOf(text)
        if (idx > -1) {
            const span = document.createElement('span')
            span.textContent = text
            span.style.background = 'yellow'
            span.style.color = 'red'

            const before = node.splitText(idx)
            before.nodeValue = before.nodeValue.slice(text.length)
            node.parentNode.insertBefore(span, before)
        }
    })
}
