import { useState, useEffect, useEffectEvent } from 'react'
import { isPlainObject } from 'lodash-es'
import storage from '@/lib/storage'

/**
 * 持久化state, Returns a stateful value, and a function to update it.
 * @param {string} key
 * @param {any} initialValue
 * @param {boolean} lazy 只持久化不同步到state
 */
export const useStorage = (key, initialValue, lazy = false) => {
    const [value, setValue] = useState(initialValue)

    // 获取初始值
    useEffect(() => {
        storage.get(key).then((val) => {
            val && setValue(val)
        })
    }, [key])

    const storageListener = useEffectEvent((newValue) => {
        !lazy && newValue != value && setValue(newValue)
    })
    // 监听storage变化，同步状态
    useEffect(() => {
        const unsubscribe = storage.on(key, storageListener)
        return () => unsubscribe()
    }, [key])

    const storeValue = (newValue, ...args) => {
        if (typeof newValue === 'function') {
            storage.set(key, newValue(value))
        } else if (isStorable(newValue)) {
            console.log('storeValue', newValue)
            storage.set(key, newValue)
        } else {
            console.error(
                'useStorage only supports storing objects and arrays.'
            )
        }
        !lazy && setValue(newValue, ...args)
    }

    return [value, storeValue]
}
/**
 * 判断变量是否可存储
 * @param {any} value
 */
const isStorable = function (value) {
    return (
        Array.isArray(value) ||
        isPlainObject(value) ||
        typeof value === 'string'
    )
}
