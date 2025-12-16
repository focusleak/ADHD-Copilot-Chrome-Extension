import React from 'react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import ErrorBoundary from '@/components/ErrorBoundary'
import FrostedContainer from '@/components/FrostedContainer'

import Favorites from './Favorites'
import SearchEngine from './SearchEngine'
import ControlPanel from './ControlPanel'
import Footer from './Footer'
import Sidebar from './SideBar/SideBar'
import TimeIndicator from './TimeIndicator/TimeIndicator.jsx'
import Weather from './Weather/Weather'
import Countdown from './Countdown/Countdown'
const App = () => {
    return (
        <>
            <SearchEngine />
            <FrostedContainer
                asChild
                rounded
                className={cn('mx-auto my-0 mt-8 h-[300px] w-[1000px]')}
            >
                <Favorites />
            </FrostedContainer>

            <ErrorBoundary>
                <FrostedContainer asChild>
                    <Sidebar className="absolute top-0 left-0 h-full w-18" />
                </FrostedContainer>
            </ErrorBoundary>

            <ControlPanel />

            <FrostedContainer
                className="absolute top-2 right-[120px] p-4 text-right"
                asChild
                rounded
            >
                <Weather />
            </FrostedContainer>

            <FrostedContainer
                className="absolute top-[190px] right-[120px] p-4 text-right"
                asChild
                rounded
            >
                <Countdown className="" />
            </FrostedContainer>
            <FrostedContainer
                asChild
                className="absolute top-0 right-0 h-full w-[108px]"
            >
                <TimeIndicator />
            </FrostedContainer>
            <Footer />
            <Toaster />
        </>
    )
}
export default App
