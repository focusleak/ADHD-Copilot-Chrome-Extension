// 记录自己
// 日历
// 时间线

import React, { useState } from 'react'
import { useToday } from '@/hooks/useTime'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

import icon from './icon.jpeg'
const Activities = [
    { name: '起床', type: 0 },
    { name: '吃饭', type: 0 },
    { name: '喝水', type: 0 },
    { name: '喝咖啡', type: 1 },
    { name: '喝可乐', type: 1 },
    { name: '嘘嘘', type: 0 },
    { name: '拉屎', type: 0 },
    { name: '刷牙', type: 0 },
    { name: '散步', type: 0 },
    { name: '运动', type: 0 },
    { name: '洗澡', type: 0 },
    { name: '换床单', type: 2 },
    { name: '工作', type: 0 },
    { name: '学习', type: 0 },
    { name: 'LeetCode', type: 0 },
    { name: '娱乐', type: 0 },
    { name: '睡觉', type: 0 },
]

const DailyTrace = () => {
    const date = useToday()
    const [timeline, setTimeline] = useState([])
    const add = (activity) => {
        setTimeline([
            ...timeline,
            {
                ...activity,
                time: format(new Date(), 'HH:mm:ss'),
            },
        ])
    }

    return (
        <div className='px-2'>
            <div>{format(date, 'yyyy-MM-dd')}</div>
            <ul className="flex flex-wrap">
                {Activities.map((activity, index) => (
                    <li key={index}>
                        <Button
                            className="m-1"
                            onClick={() => {
                                add(activity)
                            }}
                        >
                            {activity.name}
                        </Button>
                    </li>
                ))}
                <li>
                    <Button>自定义</Button>
                </li>
            </ul>
            {/* TimeLine */}
            <div>TimeLine</div>
            <ul>
                {timeline.map((activity, index) => (
                    <li key={index}>
                        <span>{activity.name}</span>{' '}
                        <span>{activity.time}</span>
                        <span>edit</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default {
    Component: DailyTrace,
    name: 'Daily Trace',
    icon,
}
