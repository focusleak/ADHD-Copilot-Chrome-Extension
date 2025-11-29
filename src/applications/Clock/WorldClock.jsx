import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

const WorldClock = () => {
    const [time, setTime] = useState(format(new Date(), 'HH:mm:ss'))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), 'HH:mm:ss'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <ul>
            <li className="flex justify-between text-center text-3xl">
                <span>Beijing</span>
                <span>{time}</span>
            </li>
        </ul>
    )
}
export default WorldClock
