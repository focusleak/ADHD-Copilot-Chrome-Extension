import { BLOCK_WORDS } from '@/data/blockWords'
import { removePlaceholder } from '@/lib/utils'
window.addEventListener('load', function () {
    // Remove the placeholder of the search input box
    document
        .querySelectorAll('.SearchBar-input input')
        .forEach((searchInput) => {
            removePlaceholder(searchInput)
        })

    // 链接直接跳转
    document.body.addEventListener('click', function (event) {
        console.log(event.target)
        // a标签
        // https://www.zhihu.com/question/1894812005174596681/answer/1899217045603746530
        if (event.target.tagName === 'A') {
            console.log('直接跳转 Type 1')
            let url = event.target.href
            if (url.includes('link.zhihu.com/?target')) {
                url = new URL(url).searchParams.get('target')
                event.preventDefault()
                event.stopImmediatePropagation()
                window.open(url, '_blank')
            }
        }

        // span标签
        // https://zhuanlan.zhihu.com/p/30400486089
        // https://www.zhihu.com/question/335623643
        // if (e.target.className === 'LinkCard-title two-line' && e.target.tagName === 'SPAN') {
        //     const span = e.target;
        //     const parent = span.parentElement;
        //     const grandparent = parent.parentElement;
        //     if (parent.className === 'LinkCard-contents' && grandparent.className === 'LinkCard new css-biylet') {
        //         console.log('直接跳转 Type 2')
        //         // 获取最近的祖先a节点
        //         let href = span.closest('a').href;
        //         if (href.includes('link.zhihu.com/?target')) {
        //             href = new URL(href).searchParams.get('target');
        //         }
        //         // 阻止其他点击事件
        //         e.stopPropagation();
        //         window.open(href, '_blank');
        //     }
        // } else if (e.target.className === 'visible' && e.target.tagName === 'SPAN') {

        // }
    })

    // 屏蔽词
    const observer = new MutationObserver(() => {
        console.log('mutation')
        ;[...document.querySelectorAll('.Card.TopstoryItem')]
            .filter((element) => {
                return BLOCK_WORDS.some((word) => {
                    return element
                        .querySelector('.ContentItem-title')
                        ?.innerText.includes(word)
                })
            })
            .forEach((element) => {
                console.log('屏蔽:')
                console.log(element.innerText)
                element.remove()
            })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // TODO 解除复制限制
})
