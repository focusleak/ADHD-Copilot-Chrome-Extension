import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { Button } from '@/components/ui/button'
import notification from '@/lib/notification'
const presets = [
    { name: '3 s', value: 3 * 1000 },
    { name: '5 s', value: 5 * 1000 },
    { name: '10 s', value: 10 * 1000 },
    { name: '30 s', value: 30 * 1000 },
    { name: '1 min', value: 60 * 1000 },
    { name: '2 min', value: 120 * 1000 },
    { name: '3 min', value: 180 * 1000 },
    { name: '5 min', value: 300 * 1000 },
    { name: '10 min', value: 600 * 1000 },
    { name: '15 min', value: 900 * 1000 },
    { name: '30 min', value: 1800 * 1000 },
    { name: '1 hr', value: 3600 * 1000 },
]
const Timers = memo(() => {
    const [duration, setDuration] = useState(0) // 倒计时总时长 - 毫秒数
    const [name, setName] = useState('')
    const [remaining, setRemaining] = useState(duration) // 剩余时间 - 毫秒数
    const [status, setStatus] = useState(0)
    const resumeTimerRef = useRef(null) // 暂停后恢复时保存的剩余时间
    const lastRemainingRef = useRef(duration)
    const timerRef = useRef(null)

    // duration变化时同步remaining
    useEffect(() => {
        setRemaining(duration)
        lastRemainingRef.current = duration
    }, [duration])

    // isRunning变化时同步 resumeTimerRef 和 lastRemainingRef
    useEffect(() => {
        if (status == 1) {
            resumeTimerRef.current = Date.now()
            lastRemainingRef.current = remaining

            timerRef.current = setInterval(() => {
                const remaining =
                    lastRemainingRef.current -
                    (Date.now() - resumeTimerRef.current)
                if (remaining > 0) {
                    setRemaining(remaining)
                } else {
                    setRemaining(0)
                    notification({
                        message: 'Time is up!',
                    })
                    setStatus(0)
                    clearInterval(timerRef.current)
                }
            }, 100)
        }
        return () => clearInterval(timerRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])
    return (
        <div>
            <p>
                {remaining.toFixed(0)} / {duration.toFixed(0)}
            </p>
            <ul className="flex flex-wrap select-none">
                {presets.map(({ name, value }) => (
                    <li
                        key={value}
                        onClick={() => {
                            setDuration(value)
                            setName(name)
                        }}
                        className="flex items-center justify-center p-2"
                    >
                        <button className="h-12 w-12 rounded-full border outline-0">
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
            <CountdownRing
                progress={remaining / duration}
                remaining={remaining}
                name={name}
                className="mx-auto"
            />
            <p>
                {status !== 0 ? (
                    <Button onClick={() => setStatus(0)}>停止</Button>
                ) : null}
                {status !== 1 ? (
                    <Button onClick={() => setStatus(1)}>启动</Button>
                ) : (
                    <Button onClick={() => setStatus(2)}>暂停</Button>
                )}
            </p>
        </div>
    )
})

function CountdownRing({
    size = 180,
    stroke = 6,
    progress = 0,
    remaining,
    name,
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
            <g>
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
                />
            </g>
            <g>
                <text
                    x="50%"
                    y="50%"
                    font-size="40"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="black"
                >
                    {minutes}:{seconds}
                </text>
                <text
                    x="50%"
                    y="70%"
                    font-size="16"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="black"
                >
                    {name}
                </text>
            </g>
        </svg>
    )
}

function useCountdown(duration) {
    const [remaining, setRemaining] = useState(duration) // ms
    const [isRunning, setIsRunning] = useState(false)

    const endTimeRef = useRef(null)
    const timerRef = useRef(null)

    useEffect(() => {
        if (isRunning) {
            // 结束时间 = 当前时间 + 剩余时间
            endTimeRef.current = Date.now() + remaining

            timerRef.current = setInterval(() => {
                const left = endTimeRef.current - Date.now()
                if (left <= 0) {
                    setRemaining(0)
                    setIsRunning(false)
                    notification({
                        message: 'Time is up!',
                    })
                    clearInterval(timerRef.current)
                } else {
                    setRemaining(left)
                }
            }, 100)
        } else {
            clearInterval(timerRef.current)
        }
        return () => clearInterval(timerRef.current)
    }, [isRunning, duration])

    const start = () => {
        if (isRunning) return
        setIsRunning(true)
    }

    const pause = () => {
        setIsRunning(false)
        clearInterval(timerRef.current)
    }

    const reset = () => {
        pause()
        setRemaining(duration)
    }

    return { remaining, isRunning, start, pause, reset }
}

export default Timers
