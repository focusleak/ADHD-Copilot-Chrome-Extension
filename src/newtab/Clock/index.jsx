import React, { useState, useRef, useEffect, memo } from 'react'
import icon from './clock.webp'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import notification from '@/lib/notification'

function ms2hms(ms) {
    ms = Math.floor(ms)
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = ms % 1000

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
}

const Stopwatch = memo(() => {
    const [milliseconds, setMilliseconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const requestId = useRef(null)
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
    }

    return (
        <div>
            <h2>Stopwatch</h2>
            <div className="text-center text-3xl">{ms2hms(milliseconds)}</div>
            <div className="flex justify-center">
                {isRunning ? (
                    <button className="m-4 h-12 w-12 rounded-full bg-gray-400 text-center text-white outline-0">
                        Lap
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="m-4 h-12 w-12 rounded-full bg-gray-400 text-center text-white outline-0"
                    >
                        Reset
                    </button>
                )}
                <button
                    onClick={handleClick}
                    className={cn(
                        'm-4 h-12 w-12 rounded-full text-center outline-0',
                        isRunning
                            ? 'bg-red-300/40 text-red-400'
                            : 'bg-green-300/40 text-green-400'
                    )}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    )
})
const Alarm = () => {
    return (
        <div>
            <h2>Alarm</h2>
            <Input
                type="time"
                step="1"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <br />
            <hr />
        </div>
    )
}

const Timers = () => {
    const presets = [
        { name: '30 s', value: 30 },
        { name: '1 min', value: 60 },
        { name: '2 min', value: 120 },
        { name: '3 min', value: 180 },
        { name: '5 min', value: 300 },
        { name: '10 min', value: 600 },
        { name: '15 min', value: 900 },
        { name: '30 min', value: 1800 },
        { name: '1 hr', value: 3600 },
    ]
    const handleClick = (value) => {
        const time = new Date()
    }
    return (
        <div>
            <h2>Timer</h2>
            <Input
                type="time"
                step="1"
                defaultValue="00:00:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <ul>
                {presets.map(({ name, value }) => (
                    <li key={value} onClick={() => handleClick(value)}>
                        {name}
                    </li>
                ))}
            </ul>
            <br />
            <hr />
        </div>
    )
}
const Clock = () => {
    // notification({ message: 'Clock' })
    const [time, setTime] = useState(format(new Date(), 'HH:mm:ss'))
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), 'HH:mm:ss'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="px-4 font-sans">
            <div className="text-center text-3xl">{time}</div>
            <div>
                <Stopwatch />
                <Alarm />
                <Timers />
            </div>
        </div>
    )
}
export default {
    Component: Clock,
    name: 'Clock',
    icon,
}
