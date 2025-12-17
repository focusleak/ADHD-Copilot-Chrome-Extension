import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import notification from '@/lib/notification'

const presets = [
    { label: '3 s', duration: 3 * 1000 },
    { label: '5 s', duration: 5 * 1000 },
    { label: '10 s', duration: 10 * 1000 },
    { label: '30 s', duration: 30 * 1000 },
    { label: '1 min', duration: 60 * 1000 },
    { label: '2 min', duration: 120 * 1000 },
    { label: '3 min', duration: 180 * 1000 },
    { label: '5 min', duration: 300 * 1000 },
    { label: '10 min', duration: 600 * 1000 },
    { label: '15 min', duration: 900 * 1000 },
    { label: '30 min', duration: 1800 * 1000 },
    { label: '1 hr', duration: 3600 * 1000 },
    { label: '1.5 hr', duration: 5400 * 3600 * 1000 },
    { label: '2 hr', duration: 7200 * 1000 },
]

const STATUS = { STOP: 0, RUN: 1, PAUSE: 2 }

const Timers = () => {
    const [duration, setDuration] = useState(3000)
    const [label, setLabel] = useState('3 s')
    const [remaining, setRemaining] = useState(3000)
    const [status, setStatus] = useState(STATUS.STOP)

    const workerRef = useRef(null)

    useEffect(() => {
        // 初始化 Worker
        workerRef.current = new Worker(
            new URL('./timerWorker.js', import.meta.url),
            { type: 'module' }
        )

        workerRef.current.onmessage = (e) => {
            const { type, remaining } = e.data

            if (type === 'TICK') {
                setRemaining(remaining)
            }

            if (type === 'DONE') {
                setRemaining(0)
                setStatus(STATUS.STOP)
                notification({ message: 'Time is up!' })
            }
        }

        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    // preset 选择
    const handlePreset = (p) => {
        workerRef.current.postMessage({ type: 'STOP' })
        setDuration(p.duration)
        setRemaining(p.duration)
        setLabel(p.label)
        setStatus(STATUS.STOP)
    }

    const start = () => {
        if (duration === 0) return
        workerRef.current.postMessage({
            type: 'START',
            payload: { remaining },
        })
        setStatus(STATUS.RUN)
    }

    const pause = () => {
        workerRef.current.postMessage({ type: 'PAUSE' })
        setStatus(STATUS.PAUSE)
    }

    const stop = () => {
        workerRef.current.postMessage({ type: 'STOP' })
        setRemaining(duration)
        setStatus(STATUS.STOP)
    }

    return (
        <div>
            <ul className="flex flex-wrap justify-center select-none">
                {presets.map((p) => (
                    <li
                        key={p.duration}
                        onClick={() => handlePreset(p)}
                        className="flex items-center justify-center p-2"
                    >
                        <button className="h-12 w-12 rounded-full border">
                            {p.label}
                        </button>
                    </li>
                ))}
            </ul>

            <CountdownRing
                progress={duration === 0 ? 0 : remaining / duration}
                remaining={remaining}
                label={label}
                className="mx-auto"
            />

            <p className="space-x-2 text-center mt-6">
                {status !== STATUS.STOP && <Button onClick={stop}>停止</Button>}
                {status !== STATUS.RUN ? (
                    <Button onClick={start}>启动</Button>
                ) : (
                    <Button onClick={pause}>暂停</Button>
                )}
            </p>
        </div>
    )
}

function CountdownRing({
    size = 180,
    stroke = 6,
    progress = 0,
    remaining,
    label,
    className,
}) {
    const radius = (size - stroke) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - progress)

    const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(
        2,
        '0'
    )
    const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(
        2,
        '0'
    )

    return (
        <svg width={size} height={size} className={className}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#ddd"
                strokeWidth={stroke}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#FF9500"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x="50%"
                y="50%"
                fontSize="40"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {minutes}:{seconds}
            </text>
            <text
                x="50%"
                y="70%"
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {label}
            </text>
        </svg>
    )
}

export default Timers
