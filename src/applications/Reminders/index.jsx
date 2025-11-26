import React, { useEffect, useState, useRef } from 'react'

import useStorage from '@/hooks/useStorage'
import icon from './reminders.webp'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'

// 解析文字
// 识别输入
// x点
// x小时后
// x天后
// 解析时间
const parseInput = (input) => {
    const content = input
    const remindTime = null
    return [content, remindTime]
}

const Reminders = () => {
    const [input, setInput] = useState('')
    const [reminders, setReminders] = useStorage('reminders', [])
    const handleKeyUp = (event) => {
        if (event.code == 'Enter' && input != '') {
            const createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            const [content, remindTime] = parseInput(input)
            setReminders([
                ...reminders,
                {
                    content,
                    checked: false,
                    remindTime,
                    createTime: createTime,
                    modifiedTime: createTime,
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
            reminders
                .map((reminder, i) => {
                    if (i === index) {
                        return {
                            ...reminder,
                            content,
                            modifiedTime: format(
                                new Date(),
                                'yyyy-MM-dd HH:mm:ss'
                            ),
                        }
                    }
                    return reminder
                })
                .filter((reminder) => reminder.content)
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
                <input
                    type="text"
                    className="w-full border-b p-2 text-xl font-bold outline-0"
                    // placeholder="后天/明天/d天后/x点/提醒我xxx"
                    value={input}
                    onInput={handleInput}
                    onKeyUp={handleKeyUp}
                    autoFocus
                />
            </div>
            <ul>
                {reminders.map(
                    ({ checked, content, createTime, modifiedTime }, key) => (
                        <li
                            key={key}
                            className="flex w-full border-b border-black/10 p-2 text-xs wrap-break-word"
                        >
                            <Checkbox
                                className="mx-2"
                                checked={checked}
                                onCheckedChange={() =>
                                    handleCheckboxChange(key)
                                }
                            />
                            <Item
                                onBurl={(content) => handleBurl(key, content)}
                            >
                                {content}
                            </Item>
                            <div className="text-xs text-gray-300">
                                {/* <p>{createTime}</p>
                                <p>{modifiedTime}</p> */}
                            </div>
                        </li>
                    )
                )}
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
