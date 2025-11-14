import React, { useState, useEffect } from 'react'
import useStorage from '@/hooks/useStorage'
import { Textarea } from '@/components/ui/textarea'

function getKey(url) {
    // 如果是bilibili
    if (url.includes('www.bilibili.com/video')) {
        return url.split('?')[0]
    }
    return url
}
const QuickNotes = () => {
    const key = getKey(window.location.href)
    const [notes, setNotes] = useStorage('quick-notes_' + key, '')
    return (
        <div className="p-2">
            <Textarea className="h-80 w-lg" value={notes} onChange={(e) => setNotes(e.target.value)}></Textarea>
        </div>
    )
}
export default QuickNotes
