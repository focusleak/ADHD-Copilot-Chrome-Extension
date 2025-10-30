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
                chrome.storage.local.set({ [key]: value }, () => resolve())
            } catch (e) {
                window.localStorage.setItem(key, JSON.stringify(value))
                resolve()
            }
        })
}

export default storage;