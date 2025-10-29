import React from 'react';

import { useState, useEffect, useCallback } from 'react';
import Favorites from './Favorites/index';
import SearchEngine from './SearchEngine/index';
const App = () => {
    return <>
        <SearchEngine />
        <Favorites />
    </>
};
export default App;
