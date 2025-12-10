import { useToday } from '@/hooks/useTime'
import { format, differenceInDays, differenceInHours } from 'date-fns'
import { cn } from '@/lib/utils'
const list = [
    {
        title: '报名确认',
        startDate: new Date(2025, 11, 9, 0, 0, 0),
    },
    {
        title: '打印准考证',
        startDate: new Date(2025, 11, 24, 10, 0, 0),
    },
    {
        title: '笔试',
        startDate: new Date(2025, 11, 27, 9, 0, 0),
    },
]
// 倒数日
const Countdown = ({ className }) => {
    // 目标时间
    const today = useToday()
    return (
        <div className={cn(className, 'font-[黑体]')}>
            <ul>
                {list.map(({ title, startDate }) => {
                    let diff = differenceInDays(startDate, today)
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
                                {diff == 0 ? (
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
