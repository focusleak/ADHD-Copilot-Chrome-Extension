import { useToday } from '@/hooks/useTime'
import { format, differenceInDays, differenceInHours } from 'date-fns'
import { cn } from '@/lib/utils'
import data from './data.json'
import { Link } from '@/components'
import { useStorage } from '@/hooks'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
// 倒数日
const Countdown = ({ className }) => {
    // 目标时间
    // const data = useStorage('countdown', [])
    const today = useToday()
    return (
        <div className={cn(className, 'font-[黑体]')}>
            <Modal />
            {/* <button className='absolute right-1 top-1' onClick={openModal}>+</button> */}
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

const Modal = () => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <button className="absolute top-1 right-1">+</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Name</Label>
                            <Input name="name" defaultValue="" />
                        </div>
                        <div className="grid gap-3">
                            <Label>Date</Label>
                            <Input name="date" defaultValue="" />
                        </div>
                        <div className="grid gap-3">
                            <Label>URL</Label>
                            <Input
                                name="url"
                                type="url"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default Countdown
