// indexed DB
// Chrome Storage

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const StorageManagement = () => {
    const [storage, setStorage] = useState([])
    useEffect(() => {
        chrome.storage.local.get(null, function (items) {
            // items 是一个对象，key 是存储的 key，value 是对应的值
            const storages = Object.keys(items).map((key) => {
                return {
                    key: key,
                    value: Array.isArray(items[key])
                        ? items[key]
                        : [items[key]],
                }
            })
            setStorage(storages)
        })
    }, [])
    return (
        <div>
            {storage.map(({ key, value }, index) => (
                <div key={key} className="border p-1">
                    <div>
                        <span>{key}</span>
                        <Button
                            className="mr-2 ml-2"
                            onClick={() => chrome.storage.local.remove(key)}
                        >
                            Clear
                        </Button>
                    </div>
                    <ul>
                        {value.map((item) => {
                            return (
                                <li key={item}>
                                    {JSON.stringify(item)}
                                    <Button className="mr-2 ml-2">
                                        Delete
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default StorageManagement
