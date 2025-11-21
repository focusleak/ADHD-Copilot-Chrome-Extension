import React, { useState, useId } from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import icon from './icon.jpeg'
const TextProcessor = () => {
    const [raw, setRaw] = useState('')
    const [removeReturn, setRemoveReturn] = useState(false)
    const [removeSpace, setRemoveSpace] = useState(false)
    const [decodeFromBase64, setDecodeFromBase64] = useState(false)
    const [encodeToBase64, setEncodeToBase64] = useState(false)
    const [isLowercase, setIsLowercase] = useState(false)
    const [isUppercase, setIsUppercase] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [addNumber, setAddNumber] = useState(false)
    const handleChange = (e) => {
        const text = e.target.value
        setRaw(text)
    }

    const process = [
        {
            name: 'Remove Return',
            order: 0,
            handle: (text) => text.replace(/\n/g, ''),
            state: removeReturn,
            setState: setRemoveReturn,
        },
        {
            name: 'Remove Space',
            order: 1,
            handle: (text) => text.replace(/ /g, ''),
            state: removeSpace,
            setState: setRemoveSpace,
        },
        // 去重
        {
            name: 'Unique',
            order: 4,
            handle: (text) => {
                const lines = text.split('\n')
                const uniqueLines = [...new Set(lines)]
                return uniqueLines.join('\n')
            },
            state: true,
            setState: () => {},
        },
        {
            name: 'Decode From Base64',
            order: 2,
            handle: (text) => atob(text),
            state: decodeFromBase64,
            setState: (state) => {
                setDecodeFromBase64(state)
                setEncodeToBase64(false)
            },
        },
        {
            name: 'Encode To Base64',
            order: 3,
            handle: (text) => btoa(text),
            state: encodeToBase64,
            setState: (state) => {
                setEncodeToBase64(state)
                setDecodeFromBase64(false)
            },
        },
        {
            name: 'Uppercase',
            order: 5,
            handle: (text) => text.toUpperCase(),
            state: isUppercase,
            setState: (state) => {
                setIsUppercase(state)
                setIsLowercase(false)
            },
        },
        {
            name: 'Lowercase',
            order: 6,
            handle: (text) => text.toLowerCase(),
            state: isLowercase,
            setState: (state) => {
                setIsLowercase(state)
                setIsUppercase(false)
            },
        },
        {
            name: 'Sort',
            order: 4,
            handle: (text) => text.split('\n').sort().join('\n'),
            state: isSort,
            setState: setIsSort,
        },
        {
            // 编号
            name: 'Number',
            order: 8,
            handle: (text) =>
                text
                    .split('\n')
                    .map((line, index) => `${index + 1}. ${line}`)
                    .join('\n'),
            state: addNumber,
            setState: setAddNumber,
        },
        {
            name: 'Find and Replace',
            order: 7,
            handle: (text) => text,
            state: false,
            setState: () => {},
        },
    ]

    const processText = () => {
        let processedText = raw
        process
            .toSorted((a, b) => a.order - b.order)
            .filter(({ state }) => state)
            .forEach(({ handle }) => {
                try {
                    processedText = handle(processedText)
                } catch (error) {
                    console.error(error)
                }
            })
        return processedText
    }
    return (
        <div className="px-4 font-sans">
            <div>
                <p>Control Panel</p>
                <ul className="grid grid-cols-2">
                    {process.map(({ name, state, setState }) => {
                        const id = useId()
                        return (
                            <li
                                className="flex items-center p-1 text-xs"
                                key={name}
                            >
                                <Checkbox
                                    id={id}
                                    className="mr-2"
                                    checked={state}
                                    onCheckedChange={() => {
                                        setState(!state)
                                    }}
                                ></Checkbox>
                                <Label htmlFor={id}>{name}</Label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <Textarea
                    className="my-2 w-full p-2"
                    value={raw}
                    onChange={handleChange}
                ></Textarea>
            </div>
            <div>
                <Textarea
                    className="my-2 w-full p-2"
                    value={processText(raw)}
                ></Textarea>
            </div>
        </div>
    )
}

export default {
    Component: TextProcessor,
    name: 'Text Processor',
    icon,
}
