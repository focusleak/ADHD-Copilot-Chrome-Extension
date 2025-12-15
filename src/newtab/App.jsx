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
import { Reminders } from '@/applications'
import FrostedContainer from '@/components/FrostedContainer'
import { cn } from '@/lib/utils'
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

            <FrostedContainer
                asChild
                rounded
                className="absolute top-2 left-20 p-0"
            >
                <Reminders.Component />
            </FrostedContainer>

            <ErrorBoundary>
                <Sidebar className="absolute top-0 left-0 h-full" />
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
