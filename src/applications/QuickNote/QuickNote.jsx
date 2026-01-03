import React, { useEffect, useState, useRef } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import EditableText from '@/components/EditableText'
import { format } from 'date-fns'
import { produce } from 'immer'
import { useStorage } from '@/hooks'
// 解析文字
// 识别输入
// x点
// x小时后
// x天后
// TODO 解析时间
const STORAGE_KEY = 'quick_notes'
const QuickNote = ({ className }) => {
    const [input, setInput] = useState('')
    const [quickNotes, setQuickNotes] = useStorage(STORAGE_KEY, [])
    const add = () => {
        const createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        setQuickNotes([
            ...quickNotes,
            {
                content: input,
                checked: false,
                createTime: createTime,
                modifiedTime: createTime,
            },
        ])
    }
    const edit = (index, content) => {
        setQuickNotes(
            produce(quickNotes, (draft) => {
                if (content.trim() === '') {
                    draft.splice(index, 1)
                } else {
                    draft[index].content = content
                    draft[index].modifiedTime = format(
                        new Date(),
                        'yyyy-MM-dd HH:mm:ss'
                    )
                }
            })
        )
    }
    return (
        <div className={cn(className, 'px-4')}>
            <div>
                <input
                    type="text"
                    className="w-full border-b border-black/20 p-2 text-xl font-bold outline-0 dark:border-white/20"
                    // placeholder="后天/明天/d天后/x点/提醒我xxx"
                    value={input}
                    onInput={(e) => {
                        setInput(e.target.value)
                    }}
                    onKeyUp={(event) => {
                        if (event.code == 'Enter' && input != '') {
                            add()
                            setInput('')
                        }
                    }}
                    autoFocus
                />
            </div>
            <ul>
                {quickNotes.map(
                    ({ checked, content, createTime, modifiedTime }, index) => (
                        <li
                            key={index}
                            className="flex w-full border-b border-black/20 py-2 text-xs wrap-break-word dark:border-white/20"
                        >
                            <Checkbox
                                className="mx-2"
                                checked={checked}
                                onCheckedChange={() =>
                                    setQuickNotes(
                                        produce(quickNotes, (draft) => {
                                            draft[index].checked =
                                                !draft[index].checked
                                        })
                                    )
                                }
                            />
                            <EditableText
                                className="flex-1"
                                onChange={(event) => {
                                    const content = event.target.value
                                    edit(index, content)
                                }}
                            >
                                {content}
                            </EditableText>
                            <div className="text-xs text-black/20 dark:text-white/20">
                                <button
                                    onClick={() => {
                                        setQuickNotes(
                                            produce(quickNotes, (draft) => {
                                                draft.splice(index, 1)
                                            })
                                        )
                                    }}
                                >
                                    delete
                                </button>
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
export default QuickNote
