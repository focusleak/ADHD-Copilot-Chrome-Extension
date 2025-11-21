import React from 'react'
import { getDayOfYear, isLeapYear } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

import { useToday } from '@/hooks/useTime'

const YearIndicator = ({ className }) => {
    const date = useToday()
    const dayOfYear = getDayOfYear(date)
    const year = date.getFullYear()

    const empty = Array.from(
        { length: (new Date(year, 0, 1).getDay() + 6) % 7 },
        (_, i) => i + 1
    )

    const pastDays = Array.from({ length: dayOfYear - 1 }, (_, i) => i + 1)
    const totalDays = isLeapYear(date) ? 366 : 365
    const futureDays = Array.from(
        { length: totalDays - dayOfYear },
        (_, i) => i + 1
    )

    return (
        <div
            className={cn(
                'bg-white/20 p-4 shadow-lg backdrop-blur-md',
                className
            )}
        >
            <ScrollArea className="h-full">
                <p className="mb-2 text-right text-white">
                    <span>{year}</span>
                    {/* <span>{dayOfYear} / 365 天</span> */}
                </p>
                <ul className="grid grid-cols-7 place-items-center gap-2">
                    {empty.map((key) => (
                        <Point key={key} />
                    ))}
                    {pastDays.map((key) => (
                        <Point key={key} className="bg-white/60" />
                    ))}
                    <Point className="animate-caret-blink bg-white" />

                    {futureDays.map((key) => (
                        <Point key={key} className="bg-white/10" />
                    ))}
                </ul>
            </ScrollArea>
        </div>
    )
}

const HourIndicator = ({ className }) => {}
const MonthIndicator = ({ className }) => {}
const WeekIndicator = ({ className }) => {}

const Point = React.memo(({ className }) => {
    return <li className={cn('h-1 w-1 rounded-full', className)}></li>
})


// year month week day
const TimeIndicator = ({ className, type }) => {
    return <YearIndicator className={className} />
}

export default TimeIndicator
