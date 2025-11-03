import React, { useState, useRef, useEffect } from 'react'
import icon from './clock.webp'
import { format } from 'date-fns'

const Stopwatch = () => {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [milliseconds, setMilliseconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [intervalId, setIntervalId] = useRef(null)

    return (
        <div>
            <div></div>
            <div>
                <button onClick={() => {}}>Start</button>
            </div>
        </div>
    )
}

const Timers = () => {}
const Clock = () => {
    const [time, setTime] = useState(format(new Date(), 'HH:mm:ss'))
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), 'HH:mm:ss'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="p-4 font-sans">
            <div>{time}</div>
        </div>
    )
}
export default {
    Component: Clock,
    name: 'Clock',
    icon,
}
