import { useToday } from '@/hooks/useTime'
import { format, differenceInDays, differenceInHours } from 'date-fns'
import { cn } from '@/lib/utils'
const data = [
    {
        title: '报名确认',
        url: 'https://hrss.sz.gov.cn/gzryzk/content/post_12516345.html',
        startDate: new Date(2025, 11, 9, 0, 0, 0),
        type: 0,
    },
    // {
    //     title: '打印准考证',
    //     url: 'http://hrss.sz.gov.cn/szksy',
    //     startDate: new Date(2025, 11, 24, 10, 0, 0),
    //     type: 0,
    // },
    {
        title: '笔试',
        startDate: new Date(2025, 11, 27, 9, 0, 0),
        type: 0,
    },
    {
        title: '分数线公布',
        startDate: new Date(2026, 0, 26, 9, 0, 0),
        type: 0,
    },
    // {
    //     title: '换牙套',
    //     startDate: new Date(2025, 11, 12, 23, 0, 0),
    //     type: 1,
    //     cycle: 10,
    // },
]
// 倒数日
const Countdown = ({ className }) => {
    // 目标时间
    const today = useToday()
    return (
        <div className={cn(className, 'font-[黑体]')}>
            <ul>
                {data.map(({ title, startDate }) => {
                    let diff = differenceInDays(
                        new Date(startDate).setHours(23, 59, 59),
                        today
                    )
                    return diff >= 0 ? (
                        <li key={title} className="py-4">
                            <p>
                                距离
                                <span title={format(startDate, 'yyyy-MM-dd')}>
                                    {title}
                                </span>
                            </p>
                            <p>
                                还有
                                {diff < 3 ? (
                                    <>
                                        <span
                                            className={cn(
                                                'mx-1 text-5xl font-bold text-red-500'
                                            )}
                                        >
                                            {differenceInHours(
                                                startDate,
                                                today
                                            )}
                                        </span>
                                        小时
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className={cn(
                                                'mx-1 text-5xl font-bold',
                                                {
                                                    'text-red-500': diff < 3,
                                                }
                                            )}
                                        >
                                            {diff}
                                        </span>
                                        天
                                    </>
                                )}
                            </p>
                        </li>
                    ) : null
                })}
            </ul>
        </div>
    )
}

export default Countdown
