import React from 'react'

import { useState, useEffect, useCallback } from 'react'
import Favorites from './Favorites/index'
import SearchEngine from './SearchEngine/index'
import ControlPanel from './ControlPanel/index'
import Footer from './Footer/index'
const App = () => {
    return (
        <>
            <SearchEngine />
            <Favorites />
            <ControlPanel />
            <Footer />
        </>
    )
}
export default App
