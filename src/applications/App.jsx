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
} from '@/applications'
const App = () => {
    const { Component, name, icon } = Reminders
    return (
        <>
            <h1>{name}</h1>
            <img width={32} height={32} src={icon} />
            <Component />
        </>
    )
}
export default App
