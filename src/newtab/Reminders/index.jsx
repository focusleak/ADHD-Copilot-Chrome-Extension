import React, { useEffect, useState, useRef } from 'react'

import useStorage from '@/hooks/useStorage'
import icon from './reminders.webp'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const Reminders = () => {
    // 识别输入
    // x点
    // x小时后
    // x天后
    // 解析时间
    // 创建提醒任务
    const [input, setInput] = useState('')
    const [reminders, setReminders] = useStorage('reminders', [])
    const handleKeyUp = (e) => {
        if (e.code == 'Enter' && input != '') {
            // 创建提醒任务
            const time = 11
            setReminders([
                ...reminders,
                {
                    content: input,
                    checked: false,
                    time: time,
                },
            ])
            setInput('')
        }
    }
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleBurl = (index, content) => {
        setReminders(
            reminders.map((reminder, i) => {
                if (i === index) {
                    return {
                        ...reminder,
                        content,
                    }
                }
                return reminder
            })
        )
    }
    const handleCheckboxChange = (index) => {
        setReminders(
            reminders.map((reminder, i) => {
                if (i === index) {
                    return {
                        ...reminder,
                        checked: !reminder.checked,
                    }
                }
                return reminder
            })
        )
    }
    return (
        <div className="px-4">
            <div>
                <Button
                    onClick={() => {
                        setReminders([])
                    }}
                >
                    Clear All
                </Button>
            </div>
            <div>
                <input
                    type="text"
                    className="w-full border-b p-2 text-4xl font-bold outline-0"
                    // placeholder="后天/明天/d天后/x点/提醒我xxx"
                    value={input}
                    onInput={handleInput}
                    onKeyUp={handleKeyUp}
                    autoFocus
                />
            </div>
            <ul>
                {reminders.map(({ checked, content }, key) => (
                    <li
                        key={key}
                        className="flex w-full border-b border-black/10 p-2 text-xl wrap-break-word"
                    >
                        <Checkbox
                            className="m-2"
                            checked={checked}
                            onCheckedChange={() => handleCheckboxChange(key)}
                        />
                        <Item onBurl={(content) => handleBurl(key, content)}>
                            {content}
                        </Item>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Item = ({ children, onBurl }) => {
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
        <>
            {mode ? (
                <p className="flex-1" onDoubleClick={() => setMode(false)}>
                    {children}
                </p>
            ) : (
                <input
                    className="flex-1 outline-0"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={value}
                    autoFocus
                />
            )}
        </>
    )
}

export default {
    name: 'Reminders',
    Component: Reminders,
    icon,
}
