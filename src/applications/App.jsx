import React from 'react'

import {
    Reminders,
    Calculator,
    CheatSheet,
    Clock,
    VocabularyBook,
    Downloader,
    ImageClipper,
    TextProcessor,
    DailyTrace,
    Practice,
} from '@/applications'
const App = () => {
    const { Component, name } = Practice
    return (
        <>
            {/* <img width={32} height={32} src={icon} /> */}
            <div className="flex items-center justify-center w-full text-xl">
                <Component className={"absolute top-[20%]"} />
            </div>
        </>
    )
}
export default App
