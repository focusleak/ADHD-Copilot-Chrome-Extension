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

function waitForElement(selector, timeout = 10000) {
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