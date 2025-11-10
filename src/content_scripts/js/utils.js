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

const Storage = {
    get(key) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.local.get([key], (result) => {
                    resolve(result[key])
                })
            } catch (error) {
                // reject(error);
            }
        })
    },
    set(key, value) {
        try {
            chrome.storage.local.set({ [key]: value })
        } catch (error) {
            console.log(error)
        }
    },
    remove(key) {},
    clear() {},
}

function removePlaceholder(searchInput) {
    // Remove the placeholder of the search input box
    if (searchInput) {
        console.log(searchInput.placeholder)
        searchInput.placeholder = ''
        const observer = new MutationObserver(() => {
            console.log(searchInput.placeholder)
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
function directJump(patten, urlParam) {
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

function waitForElement(selector, { test, timeout } = {}) {
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

// tab通信

// 判断url
function isUrlIncluded(pattern) {
    return window.location.href.includes(pattern)
}

// toast
function toast(message, duration = 3000) {
    const toast = document.createElement('div')
    toast.className = 'adhd-copilot-toast'
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => {
        toast.remove()
    }, duration)
}

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
})

function setSelectionStyles(selection, styles) {
    if (!selection) return
    if (!selection.rangeCount) return
    // TODO 判断是否已经被span包裹

    const range = selection.getRangeAt(0)
    if (range.toString().trim()) {
        const span = document.createElement('span')
        span.dataset.adhdMark = 'true'
        // span.style.backgroundColor = "yellow";
        Object.entries(styles).forEach(([key, value]) => {
            span.style[key] = value
        })
        try {
            range.surroundContents(span)
        } catch (e) {}
    }
}
