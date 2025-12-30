import React from 'react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import ErrorBoundary from '@/components/ErrorBoundary'
import FrostedContainer from '@/components/FrostedContainer'
import Background from '@/components/Background'

import SiteMap from './SiteMap'
import SearchEngine from './SearchEngine'
import ControlPanel from './ControlPanel'
import Footer from './Footer'
import Sidebar from './SideBar/SideBar'
import TimeIndicator from '../applications/TimeIndicator/TimeIndicator.jsx'
import Weather from '../applications/Weather/Weather'
import Countdown from '../applications/Countdown/Countdown'
import ToDos from '@/applications/ToDos/ToDos'
import DailyTrace from '@/applications/DailyTrace/DailyTrace'
import QuickNote from '@/applications/QuickNote/QuickNote'
const App = () => {
    return (
        <Background
            src="https://bing.img.run/rand.php"
            className="h-full w-full"
        >
            <SearchEngine />
            <FrostedContainer
                asChild
                rounded
                className={cn('mx-auto my-0 mt-8 h-[300px] w-[1000px]')}
            >
                <SiteMap />
            </FrostedContainer>

            <ErrorBoundary>
                <FrostedContainer asChild>
                    <Sidebar className="absolute top-0 left-0 h-full w-18" />
                </FrostedContainer>
            </ErrorBoundary>

            <FrostedContainer asChild rounded>
                <ToDos className={cn('absolute top-4 left-22')} />
            </FrostedContainer>

            {/* <FrostedContainer
                asChild
                className="absolute top-[300px] left-22 h-[390px] w-[225px] overflow-auto p-4"
                rounded
            >
                <DailyTrace />
            </FrostedContainer> */}
            <FrostedContainer
                asChild
                className="absolute top-[330px] left-22 w-[160px] overflow-auto p-4"
                rounded
            >
                <QuickNote />
            </FrostedContainer>

            <FrostedContainer asChild rounded>
                <ControlPanel className="absolute bottom-4 left-22 p-4 opacity-0 transition hover:opacity-100" />
            </FrostedContainer>

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
        </Background>
    )
}
export default App
