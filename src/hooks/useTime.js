import { useState, useEffect } from 'react'
import {
    differenceInMilliseconds,
    startOfDay,
    addDays,
    startOfMonth,
    addMonths,
    startOfHour,
    addHours,
    startOfWeek,
    addWeeks,
    format,
} from 'date-fns'

export const useToday = () => {
    const [date, update] = useState(new Date())

    useEffect(() => {
        const now = new Date()
        const msUntilTomorrow = differenceInMilliseconds(
            startOfDay(addDays(now, 1)),
            now
        )

        const timer = setTimeout(() => {
            update(new Date())
        }, msUntilTomorrow)
        return () => clearTimeout(timer)
    }, [date])
    return date
}

export const useMonth = () => {
    const [date, update] = useState(new Date())
    useEffect(() => {
        const now = new Date()
        // 到下个月1号0点的毫秒数
        const msUntilNextMonth = differenceInMilliseconds(
            startOfMonth(addMonths(now, 1)),
            now
        )
        const timer = setTimeout(() => {
            update(new Date())
        }, msUntilNextMonth)
        return () => clearTimeout(timer)
    }, [date])
    return date
}
export const useHour = () => {
    const [date, update] = useState(new Date())
    useEffect(() => {
        const now = new Date()
        const msUntilNextHour = differenceInMilliseconds(
            startOfHour(addHours(now, 1)),
            now
        )
        const timer = setTimeout(() => {
            update(new Date())
        }, msUntilNextHour)
        return () => clearTimeout(timer)
    }, [date])
    return date
}

export const useWeek = ({ weekStartsOn = 1 }) => {
    const [date, update] = useState(new Date())
    useEffect(() => {
        const now = new Date()
        const msUntilNextWeek = differenceInMilliseconds(
            startOfWeek(addWeeks(now, 1), { weekStartsOn }),
            now
        )
        const timer = setTimeout(() => {
            update(new Date())
        }, msUntilNextWeek)
        return () => clearTimeout(timer)
    }, [date, weekStartsOn])
    return date
}
