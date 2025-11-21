import { useEffect, useRef } from 'react'

const useSound = (url, options) => {
    const player = useRef(null)
    const audio = new Audio(url)
    player.current = audio
    audio.loop = options?.loop
    audio.volume = options?.volume || 0.5
    return player
}
export default useSound
