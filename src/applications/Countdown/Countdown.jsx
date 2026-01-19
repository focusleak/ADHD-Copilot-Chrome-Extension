import { useToday } from '@/hooks/useTime'
import { format, differenceInDays, differenceInHours } from 'date-fns'
import { cn } from '@/lib/utils'
import data from './data.json'
import { Link } from '@/components'
// 倒数日
const Countdown = ({ className }) => {
    // 目标时间
    const today = useToday()
    return (
        <div className={cn(className, 'font-[黑体]')}>
            <ul>
                {data.map(({ title, date, url }) => {
                    let diff = differenceInDays(
                        new Date(date).setHours(23, 59, 59),
                        today
                    )
                    return diff >= 0 ? (
                        <li key={title} className="py-4">
                            <p>
                                距离
                                <span title={format(date, 'yyyy-MM-dd')}>
                                    {url ? (
                                        <Link href={url}>{title}</Link>
                                    ) : (
                                        title
                                    )}
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
                                            {differenceInHours(date, today)}
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
