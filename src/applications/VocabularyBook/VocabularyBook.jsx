import React, { useRef } from 'react'
import useStorage from '@/hooks/useStorage'
import { useEffect } from 'react'

const VocabularyBook = () => {
    const [vocabulary, setVocabulary] = useStorage('vocabulary', [])
    return (
        <div className="px-4 font-sans">
            <h3>Pronounce Control Panel</h3>
            <ul>
                <li>Play Speed</li>
                <li>英音</li>
                <li>美音</li>
            </ul>
            <ul>
                {vocabulary.map((word, index) => (
                    <Word key={index}>{word}</Word>
                ))}
            </ul>
        </div>
    )
}

const Word = ({ children }) => {
    const player = useRef(null)
    useEffect(() => {
        const audio = new Audio(
            `https://sensearch.baidu.com/gettts?lan=uk&spd=1&source=alading&text=${children}`
        )
        player.current = audio
    }, [])
    const handleClick = () => {
        // 播放
        player.current.play()
    }
    return <li onClick={handleClick}>{children}</li>
}

export default VocabularyBook
