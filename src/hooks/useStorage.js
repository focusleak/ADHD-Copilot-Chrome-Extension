import { useState, useEffect, useEffectEvent } from 'react'
import { isPlainObject } from 'lodash-es'
import storage from '@/lib/storage'
export const useStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        storage.get(key).then((val) => {
            val && setValue(val)
        })
    }, [key])

    const listener = useEffectEvent((newValue) => {
        newValue != value && setValue(newValue)
    })
    useEffect(() => {
        const unsubscribe = storage.on(key, listener)
        return () => unsubscribe()
    }, [key])

    const storeValue = (newValue, ...args) => {
        if (typeof newValue === 'function') {
            storage.set(key, newValue(value))
        } else if (Array.isArray(newValue) || isPlainObject(newValue)) {
            storage.set(key, newValue)
        } else {
            console.error(
                'useStorage only supports storing objects and arrays.'
            )
        }
        setValue(newValue, ...args)
    }

    return [value, storeValue]
}
