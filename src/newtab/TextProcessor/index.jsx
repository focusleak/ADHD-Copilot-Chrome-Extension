import React, { useState } from 'react'
import icon from './icon.jpeg'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
const TextProcessor = () => {
    const [raw, setRaw] = useState('')
    const [removeReturn, setRemoveReturn] = useState(false)
    const [removeSpace, setRemoveSpace] = useState(false)
    const [decodeFromBase64, setDecodeFromBase64] = useState(false)
    const [encodeToBase64, setEncodeToBase64] = useState(false)
    const handleChange = (e) => {
        const text = e.target.value
        setRaw(text)
    }
    const processText = () => {
        let processedText = raw
        if (removeReturn) {
            processedText = processedText.replace(/\n/g, '')
        }
        return processedText
    }
    return (
        <div className="px-4 font-sans">
            <div>
                <p>Control Panel</p>
                <ul>
                    <li className="flex">
                        <Checkbox
                            checked={removeReturn}
                            onCheckedChange={() => {
                                setRemoveReturn(!removeReturn)
                            }}
                        />
                        <p className="flex-1">移除换行</p>
                    </li>
                    <li>
                        <Checkbox
                            checked={decodeFromBase64}
                            onCheckedChange={() => {
                                setDecodeFromBase64(!decodeFromBase64)
                            }}
                        ></Checkbox>
                        Decode from Base64 format
                    </li>
                    <li>
                        <Checkbox
                            checked={encodeToBase64}
                            onCheckedChange={() => {
                                setEncodeToBase64(!encodeToBase64)
                            }}
                        ></Checkbox>
                        Encode to Base64 format
                    </li>
                    <li className="flex">查找</li>
                    <li>替换</li>
                    <li>大写</li>
                    <li>小写</li>
                </ul>
            </div>
            <div>
                <Textarea
                    className="w-full p-2"
                    value={raw}
                    onChange={handleChange}
                ></Textarea>
            </div>
            <div>
                <p className="p-2">{processText(raw)}</p>
            </div>
        </div>
    )
}

export default {
    Component: TextProcessor,
    name: 'Text Processor',
    icon,
}
