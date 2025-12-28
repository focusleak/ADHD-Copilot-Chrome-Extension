import React, { useState, useEffect } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Textarea } from '@/components/ui/textarea'

const STORAGE_KEY = 'POPUP_QUICK_NOTES'
const QuickNotes = () => {
    useEffect(() => {
        chrome.tabs
            .query({
                active: true,
                lastFocusedWindow: true,
            })
            .then(([tab]) => {
                console.log('当前页面 URL:', tab.url)
            })
    }, [])
    const [notes, setNotes] = useStorage(STORAGE_KEY)
    return (
        <div className="p-2">
            <Textarea
                className="h-120 w-sm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            ></Textarea>
        </div>
    )
}
export default QuickNotes
