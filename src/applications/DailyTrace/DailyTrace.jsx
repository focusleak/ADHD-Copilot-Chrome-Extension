// 记录自己
// 日历
// 时间线

import { useState } from 'react'
import { useToday, useStorage } from '@/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { produce } from 'immer'
import activities from './data.json'

const DailyTrace = ({ className }) => {
    const [timeline, setTimeline] = useStorage('daily-trace', [])
    const add = (activity) => {
        setTimeline([
            {
                ...activity,
                time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            },
            ...timeline,
        ])
    }

    return (
        <div className={cn('flex h-full flex-col px-2', className)}>
            <ul className="flex flex-wrap">
                {activities.map((activity, index) => (
                    <li key={index} className='mx-1'>
                        <span
                            onClick={() => {
                                add(activity)
                            }}
                        >
                            {activity.name}
                        </span>
                    </li>
                ))}
            </ul>
            {/* TimeLine */}
            <div className="py-2 text-center">
                TimeLine {format(new Date(), 'yyyy-MM-dd')}
            </div>
            <ul className="flex-1 overflow-auto">
                {timeline.map((activity, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{activity.name}</span>
                        <span>{activity.time}</span>
                        <span
                            onClick={() => {
                                setTimeline(
                                    produce(timeline, (draft) => {
                                        draft.splice(index, 1)
                                    })
                                )
                            }}
                        >
                            delete
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DailyTrace
