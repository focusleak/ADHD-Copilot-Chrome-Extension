import React from 'react'

import Favorites from './Favorites/index'
import SearchEngine from './SearchEngine/index'
import ControlPanel from './ControlPanel/index'
import Footer from './Footer/index'
import Sidebar from './SideBar'
import ErrorBoundary from '@/components/ErrorBoundary'
const App = () => {
    return (
        <>
            <SearchEngine />
            <Favorites />
            <ErrorBoundary>
                <Sidebar />
            </ErrorBoundary>
            <ControlPanel />
            <Footer />
        </>
    )
}
export default App
