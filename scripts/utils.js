var addEventListener = EventTarget.prototype.addEventListener;
console.log('utils.js loaded');
EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (!this.eventListeners) {
        this.eventListeners = {};
    }
    if (!this.eventListeners[type]) {
        this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener);
    console.log(`Add event listener: ${type}`);
    addEventListener.call(this, type, listener, options);
}

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