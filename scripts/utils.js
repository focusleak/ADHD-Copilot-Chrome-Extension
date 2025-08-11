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

function getChromeStorage(key) {
    let keys = key;
    if (typeof key === 'string') {
        keys = [key];
    }
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            resolve(result);
        })
    })
}

function removePlaceholder(searchInput) {
    // Remove the placeholder of the search input box
    if (searchInput) {
        console.log(searchInput.placeholder);
        searchInput.placeholder = "";
        const observer = new MutationObserver(() => {
            console.log(searchInput.placeholder);
            if (searchInput.placeholder != "") {
                searchInput.placeholder = "";
            }
        });
        observer.observe(searchInput, {
            attributes: true,
            attributeFilter: ["placeholder"],
        });
    }
};

// 直接跳转
function directJump(patten, urlParam) {
    document.body.addEventListener('click', function (e) {
        // 代理a标签
        if (e.target.tagName === 'A') {
            let href = e.target.href;
            if (href.includes(patten)) {
                href = new URL(href).searchParams.get(urlParam);
                window.open(href, '_blank');
                e.preventDefault();
                return false;
            }
        }
    });
}

function waitForElement(selector, timeout = 1000 * 60) {
    return new Promise((resolve) => {
        const target = document.querySelector(selector);
        if (target) return resolve(target);

        const observer = new MutationObserver((mutationsList, observer) => {
            const target = document.querySelector(selector);
            if (target) {
                observer.disconnect();
                clearTimeout(timer);
                resolve(target);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        const timer = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout: Element "${selector}" not found in ${timeout} ms.`));
        }, timeout);

    });
}


// tab通信


// 判断url
function isUrlIncluded(pattern) {
    return window.location.href.includes(pattern);
}


// toast
function toast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'adhd-copilot-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
}