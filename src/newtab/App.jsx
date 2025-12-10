import React from 'react'

import Favorites from './Favorites/index'
import SearchEngine from './SearchEngine/index'
import ControlPanel from './ControlPanel/index'
import Footer from './Footer/index'
import Sidebar from './SideBar/SideBar'
import ErrorBoundary from '@/components/ErrorBoundary'
import TimeIndicator from './TimeIndicator/TimeIndicator.jsx'
import Weather from './Weather/Weather'
import { Toaster } from '@/components/ui/sonner'
import Countdown from './Countdown/Countdown'
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
            <Weather className="absolute top-2 right-[120px] rounded-lg bg-white/20 p-4 text-right shadow-lg backdrop-blur-md" />
            <Countdown className="absolute top-[190px] right-[120px] rounded-lg bg-white/20 p-4 text-right shadow-lg backdrop-blur-md" />
            <Footer />
            <Toaster />
        </>
    )
}
export default App
