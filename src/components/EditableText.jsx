import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

const EditableText = ({
    children,
    onChange,
    onDoubleClick,
    className,
}) => {
    const [mode, setMode] = useState(false)
    const [value, setValue] = useState(children)

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleDoubleClick = (event) => {
        setMode(true)
        // 获取p标签的高度
        onDoubleClick?.(event)
    }
    const handleBlur = (event) => {
        setMode(false)
        onChange?.(event)
    }
    return (
        <>
            {mode ? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className={cn('block w-full outline-0', className)}
                />
            ) : (
                <p onDoubleClick={handleDoubleClick} className={cn(className)}>
                    {children}
                </p>
            )}
        </>
    )
}

export default EditableText
