import React, { useState } from 'react'
import icon from './icon.jpeg'
import Checkbox from '@/components/ui/checkbox'
const TextProcessor = () => {
    const [raw, setRaw] = useState('')
    const [processed, setProcessed] = useState('')
    const handleChange = (e) => {
        const text = e.target.value
        setRaw(text)
        const processedText = text.toUpperCase()
        setProcessed(processedText)
    }
    return (
        <div className="p-4 font-sans">
            <h2 className="text-xl font-bold">Text Processor</h2>
            <div>
                <p>Control Panel</p>
            </div>
            <div>
                <textarea
                    className="w-full p-2"
                    value={raw}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <textarea className="w-full p-2" value={processed}></textarea>
            </div>
        </div>
    )
}

export default {
    Component: TextProcessor,
    name: 'Text Processor',
    icon,
}
