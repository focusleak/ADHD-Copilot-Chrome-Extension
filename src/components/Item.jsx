import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const Item = ({ className, children, onChange, onBurl, ...props }) => {
    const [mode, setMode] = useState(true)
    const [value, setValue] = useState(children)

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleBlur = (event) => {
        setMode(true)
        onBurl(event.target.value)
    }
    return (
        <li className={cn(className)} {...props}>
            {mode ? (
                { children }
            ) : (
                <input
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={value}
                    autoFocus
                />
            )}
        </li>
    )
}

export default Item
