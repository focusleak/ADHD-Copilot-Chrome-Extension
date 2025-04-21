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

async function getChromeStorage(key) {
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