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
        <div className={cn('relative w-[360px] mx-auto', className)}>
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
        </div>
    )
}
export default Reminders
