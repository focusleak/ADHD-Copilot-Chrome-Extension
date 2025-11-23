const storage = {
    get: (key) =>
        new Promise((resolve) => {
            try {
                chrome.storage.local.get(key, (result) => {
                    resolve(result[key])
                })
            } catch (e) {
                // In non-extension environment (for dev) fall back to localStorage
                const raw = window.localStorage.getItem(key)
                resolve(raw ? JSON.parse(raw) : undefined)
            }
        }),
    set: (key, value) =>
        new Promise((resolve) => {
            try {
                chrome.storage.local.set({ [key]: value }, () => resolve(true))
            } catch (e) {
                window.localStorage.setItem(key, JSON.stringify(value))
                resolve(false)
            }
        }),
    on(key, callback) {
        try {
            const handle = (changes, area) => {
                if (area === 'local' && changes[key]) {
                    callback(changes[key].newValue)
                }
            }
            chrome.storage.onChanged.addListener(handle)
            return () => chrome.storage.onChanged.removeListener(handle)
        } catch (e) {
            const handle = (key, newValue, storageArea) => {
                if (storageArea === localStorage) {
                    callback(JSON.parse(newValue))
                }
            }
            window.addEventListener('storage', handle)
            return () => window.removeEventListener('storage', handle)
        }
    },
}
export default storage
