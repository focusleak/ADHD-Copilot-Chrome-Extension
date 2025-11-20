import { useState, useEffect } from 'react'
import storage from '@/lib/storage'

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
