import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { cn } from '@/lib/utils'
function ms2hms(ms) {
    ms = Math.floor(ms)
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = ms % 1000

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
}
const Stopwatch = memo(({ className }) => {
    const [milliseconds, setMilliseconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState([])
    const requestId = useRef(null)
    useEffect(() => {
        const listener = (event) => {
            if (event.code === 'Enter') setIsRunning((isRunning) => !isRunning)
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [])
    useEffect(() => {
        if (isRunning) {
            const start = performance.now()
            const step = () => {
                const now = performance.now()
                setMilliseconds(now - start + milliseconds)
                requestId.current = requestAnimationFrame(step)
            }
            requestId.current = requestAnimationFrame(step)
        } else {
            cancelAnimationFrame(requestId.current)
        }
        return () => {
            cancelAnimationFrame(requestId.current)
        }
    }, [isRunning])

    const handleClick = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setMilliseconds(0)
        setLaps([])
    }

    const handleLap = () => {
        setLaps([
            ...laps,
            {
                milliseconds: milliseconds,
                timestamp: new Date(),
            },
        ])
    }

    return (
        <div className={cn('flex flex-col', className)}>
            <div className="text-center text-3xl">{ms2hms(milliseconds)}</div>
            <div className="flex justify-center">
                {isRunning ? (
                    <button
                        onClick={handleLap}
                        className="m-4 h-12 w-12 rounded-full bg-gray-400 text-center text-sm text-white outline-0"
                    >
                        Lap
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="m-4 h-12 w-12 rounded-full bg-gray-400 text-center text-sm text-white outline-0"
                    >
                        Reset
                    </button>
                )}
                <button
                    onClick={handleClick}
                    className={cn(
                        'm-4 h-12 w-12 rounded-full text-center text-sm outline-0',
                        isRunning
                            ? 'bg-red-300/40 text-red-400'
                            : 'bg-green-300/40 text-green-400'
                    )}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </button>
            </div>
            <ul className="overflow-auto flex-1 text-center text-sm">
                {laps.map((lap, index) => (
                    <li key={index}>
                        {ms2hms(lap.milliseconds)}{' '}
                        {lap.timestamp.toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default Stopwatch
