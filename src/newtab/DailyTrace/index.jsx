// 记录自己
// 日历
// 时间线

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

import React, { useState } from 'react'

const Activities = [
    { name: '起床', type: 0 },
    { name: '吃饭', type: 0 },
    { name: '喝水', type: 0 },
    { name: '喝咖啡', type: 1 },
    { name: '喝可乐', type: 1 },
    { name: '拉屎', type: 0 },
    { name: '刷牙', type: 0 },
    { name: '散步', type: 0 },
    { name: '运动', type: 0 },
    { name: '洗澡', type: 0 },
    { name: '换床单', type: 2 },
    { name: '工作', type: 0 },
    { name: '学习', type: 0 },
    { name: '娱乐', type: 0 },
    { name: '睡觉', type: 0 },
]

const DailyTrace = () => {
    const [date, setDate] = useState(format(new Date()))
    const [activities, setActivities] = useState([])

    return (
        <div>
            <div>{date}</div>
            <ul>
                {Activities.map((activity, index) => (
                    <li key={index}>
                        <Button
                            onClick={() => {
                                setActivities([...activities, activity])
                            }}
                        >
                            {activity}
                        </Button>
                    </li>
                ))}
            </ul>
            {/* TimeLine */}
            <div>TimeLine</div>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}

export default DailyTrace
