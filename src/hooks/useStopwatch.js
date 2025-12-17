import { useCallback, useEffect, useRef, useState } from 'react'

export function useStopwatch() {
    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(false)

    const startTimeRef = useRef(null)
    const accumulatedRef = useRef(0)
    const rafIdRef = useRef(null)

    const loop = useCallback(() => {
        if (!running || startTimeRef.current === null) return

        const now = performance.now()
        setTime(accumulatedRef.current + (now - startTimeRef.current))

        rafIdRef.current = requestAnimationFrame(loop)
    }, [running])

    const start = useCallback(() => {
        if (running) return

        setRunning(true)
        startTimeRef.current = performance.now()
        rafIdRef.current = requestAnimationFrame(loop)
    }, [running, loop])

    const pause = useCallback(() => {
        if (!running || startTimeRef.current === null) return

        const now = performance.now()
        accumulatedRef.current += now - startTimeRef.current
        startTimeRef.current = null

        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current)
            rafIdRef.current = null
        }

        setRunning(false)
    }, [running])

    const reset = useCallback(() => {
        accumulatedRef.current = 0
        startTimeRef.current = running ? performance.now() : null
        setTime(0)
    }, [running])

    useEffect(() => {
        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current)
            }
        }
    }, [])

    return {
        time, // 毫秒
        start,
        pause,
        reset,
        running,
    }
}
