import React from 'react'

import Favorites from './Favorites/index'
import SearchEngine from './SearchEngine/index'
import ControlPanel from './ControlPanel/index'
import Footer from './Footer/index'
import Sidebar from './SideBar'
import ErrorBoundary from '@/components/ErrorBoundary'
import TimeIndicator from './TimeIndicator/TimeIndicator.jsx'
import { Toaster } from '@/components/ui/sonner'
const App = () => {
    return (
        <>
            <SearchEngine />
            <Favorites />
            <TimeIndicator className="absolute top-0 right-0 h-full w-[108px]" />
            <ErrorBoundary>
                <Sidebar className="absolute top-0 left-0 h-full" />
            </ErrorBoundary>
            <ControlPanel />
            <Footer />
            <Toaster />
        </>
    )
}
export default App
