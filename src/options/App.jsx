import React from 'react'

import ErrorBoundary from '@/components/ErrorBoundary'

import StorageManagement from '@/options/StorageManagement'
const App = () => {
    return (
        <>
            <ErrorBoundary>
                <StorageManagement />
            </ErrorBoundary>
        </>
    )
}
export default App
