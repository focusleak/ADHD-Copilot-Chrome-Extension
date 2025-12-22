import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// for shadcn/ui
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function isURL(text) {
    return /^https?:\/\//.test(text)
}

// 去除搜索框placeholder
export function removePlaceholder(searchInput) {
    // Remove the placeholder of the search input box
    if (searchInput) {
        searchInput.placeholder = ''
        const observer = new MutationObserver(() => {
            if (searchInput.placeholder != '') {
                searchInput.placeholder = ''
            }
        })
        observer.observe(searchInput, {
            attributes: true,
            attributeFilter: ['placeholder'],
        })
    }
}

// 直接跳转
export function directJump(patten, urlParam) {
    document.body.addEventListener('click', function (e) {
        // 代理a标签
        if (e.target.tagName === 'A') {
            let href = e.target.href
            if (href.includes(patten)) {
                href = new URL(href).searchParams.get(urlParam)
                window.open(href, '_blank')
                e.preventDefault()
                return false
            }
        }
    })
}

// 等待元素出现
export function waitForElement(
    selector,
    { test, timeout } = { test: () => true }
) {
    return new Promise((resolve, reject) => {
        const target = document.querySelector(selector)
        if (target) return resolve(target)

        const observer = new MutationObserver((mutationsList, observer) => {
            const target = document.querySelector(selector)
            if (target && test?.(target)) {
                observer.disconnect()
                timer ?? clearTimeout(timer)
                resolve(target)
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
        const timer = timeout
            ? setTimeout(() => {
                  observer.disconnect()
                  console.log(
                      'Timeout: Element "${selector}" not found in ${timeout} ms.'
                  )

                  // reject(new Error(`Timeout: Element "${selector}" not found in ${timeout} ms.`));
              }, timeout)
            : null
    })
}

// 判断url
export function isUrlIncluded(pattern) {
    return window.location.href.includes(pattern)
}

// toast
export function toast(message, duration = 3000) {
    const toast = document.createElement('div')
    toast.className = 'adhd-copilot-toast'
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => {
        toast.remove()
    }, duration)
}

export function setSelectionStyles(selection, styles) {
    if (!selection) return
    if (!selection.rangeCount) return
    // TODO 判断是否已经被span包裹

    const range = selection.getRangeAt(0)
    if (range.collapsed) return null
    const fragment = range.extractContents()
    console.log(fragment)
    wrapTextNodes(fragment, (text) => {
        const span = document.createElement('span')
        span.dataset.adhdMark = 'true'
        // span.style.backgroundColor = "yellow";
        Object.entries(styles).forEach(([key, value]) => {
            span.style[key] = value
        })
        span.textContent = text
        return span
    })

    range.insertNode(fragment)
}

function wrapTextNodes(node, wrapFn) {
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    )

    const textNodes = []
    while (walker.nextNode()) {
        const textNode = walker.currentNode
        if (textNode.nodeValue.trim() !== '') {
            textNodes.push(textNode)
        }
    }

    textNodes.forEach((textNode) => {
        const wrapper = wrapFn(textNode.nodeValue)
        textNode.parentNode.insertBefore(wrapper, textNode)
        textNode.remove()
    })
}
