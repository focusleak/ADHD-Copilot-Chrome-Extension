import { cn } from '@/lib/utils.js'
import FourQuadrant from '@/components/FourQuadrant'

const Grid = ({ className, children }) => {
    return (
        <div
            className={cn(
                'flex h-[180px] w-[180px] items-center justify-center text-center',
                className
            )}
        >
            {children}
        </div>
    )
}
// 重要紧急四象限
const Reminders = ({ className }) => {
    return (
        <div className={cn('relative mx-auto w-[360px]', className)}>
            <FourQuadrant
                width={360}
                height={360}
                className={'absolute top-0 left-0'}
            />
            <div className="grid grid-cols-2 grid-rows-2">
                <Grid>
                    重要
                    <br />
                    不紧急
                </Grid>
                <Grid>
                    重要
                    <br />
                    紧急
                </Grid>
                <Grid>
                    不重要
                    <br />
                    不紧急
                </Grid>
                <Grid>
                    不重要
                    <br />
                    紧急
                </Grid>
            </div>

            <Tips></Tips>
        </div>
    )
}

const Tips = () => {
    const data = [
        '【健康生活】 充足睡眠，规律作息，适量运动，健康饮食',
        '【复利效应】 ',
        '【费曼学习法】 输入后一定要有输出，最好是文字输出',
        '【覆盖】用新直觉覆盖旧直觉，用新习惯覆盖旧习惯',
        '【执行力】 简单的事情赶紧做',
        '总结一套自己的方法论',
        '多思考为什么',
        '学习如何分析问题',
        '刻意练习',
        'diff',
        '重复 复习',
        '复杂的事情边做边想，容易的事情先想再做',
        '不要用战术上的勤奋掩盖战略上的懒惰：遇到频繁出现问题先考虑有无更好的方法去解决，而不是重复劳动',
        '关注精力分配，少做无意义的决策',
        '毕其功于一役 or 走一步看一步',
    ]
    return (
        <ol>
            {data.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ol>
    )
}
export default Reminders
