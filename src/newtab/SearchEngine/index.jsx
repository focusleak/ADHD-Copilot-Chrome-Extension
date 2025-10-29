// 需求：滚动鼠标滚轮，切换搜索引擎
import React, { useState, useEffect, useCallback } from 'react'

import Baidu from './Baidu'
import Google from './Google'
import Yandex from './Yandex'
import Youtube from './Youtube'
import DuckDuckGo from './DuckDuckGo'
import Zhihu from './Zhihu'
import Bilibili from './Bilibili'

const Engines = [
    { key: 'bilibili', name: 'BiliBili', component: Bilibili },
    { key: 'google', name: '谷歌', component: Google },
    { key: 'baidu', name: '百度', component: Baidu },
    // { key: 'yandex', name: 'Yandex', component: Yandex },
    // { key: 'youtube', name: 'Youtube', component: Youtube },
    // { key: 'duckduckgo', name: 'DuckDuckGo', component: DuckDuckGo },
    { key: 'zhihu', name: 'Zhihu', component: Zhihu },
]
// 搜索历史
const SearchEngine = () => {
    const [index, setIndex] = useState(0)
    const [queryString, setQueryString] = useState('')
    const handleInput = useCallback((event) => {
        setQueryString(event.target.value)
    }, [])
    const handleWheel = (event) => {
        const delta = event.deltaY
        if (delta > 0) {
            setIndex((index + 1) % Engines.length)
        } else {
            setIndex((index - 1 + Engines.length) % Engines.length)
        }
    }
    const Engine = Engines[index].component
    return (
        <>
            <div className="h-[200px] overflow-hidden" onWheel={handleWheel}>
                <Engine queryString={queryString} onInput={handleInput} />
            </div>
        </>
    )
}
export default SearchEngine
