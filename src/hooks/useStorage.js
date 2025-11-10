import { useState, useEffect } from 'react'

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
    // onchange(key,callback){
    //     chrome.storage.onChanged.addListener(callback,key)
    // }
}

const useStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        storage.get(key).then((val) => {
            console.log(val)
            val && setValue(val)
        })
    }, [])

    const syncValue = (value, ...args) => {
        storage.set(key, value)
        setValue(value, ...args)
    }

    return [value, syncValue]
}

export default useStorage
