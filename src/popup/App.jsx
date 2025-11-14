import React from 'react'

import ErrorBoundary from '@/components/ErrorBoundary'

import QuickNotes from '@/popup/QuickNotes'
const App = () => {
    return (
        <>
            <ErrorBoundary>
                <QuickNotes />
            </ErrorBoundary>
        </>
    )
}
export default App
