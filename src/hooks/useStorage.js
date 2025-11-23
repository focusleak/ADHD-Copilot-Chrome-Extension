import { useState, useEffect, useEffectEvent } from 'react'
import storage from '@/lib/storage'

const useStorage = (key, initialValue) => {
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

    const storeValue = (value, ...args) => {
        storage.set(key, value)
        setValue(value, ...args)
    }

    return [value, storeValue]
}

export default useStorage
