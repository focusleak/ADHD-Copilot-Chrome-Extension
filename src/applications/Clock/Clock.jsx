import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import Stopwatch from './Stopwatch'
import Alarm from './Alarm'
import Timers from './Timers'
import WorldClock from './WorldClock'
import PomodoroTimer from './PomodoroTimer'

const Clock = ({ className }) => {
    const [value, setValue] = useState(0)
    const listener = useEffectEvent((event) => {
        if (event.code === 'ArrowLeft') {
            setValue((value + 4 - 1) % 4)
        }
        if (event.code === 'ArrowRight') {
            setValue((value + 1) % 4)
        }
    })
    useEffect(() => {
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [])
    return (
        <div className={cn('px-4 font-sans', className)}>
            <Tabs
                // activationMode="manual"
                // value={value}
                defaultValue={3}
                // onValueChange={(value) => {
                //     console.log('value change')
                //     setValue(value)
                // }}
            >
                <TabsList className="m-auto mb-6">
                    <TabsTrigger value={0}>Stopwatch</TabsTrigger>
                    {/* <TabsTrigger value={1}>Alarm</TabsTrigger> */}
                    <TabsTrigger value={2}>Timers</TabsTrigger>
                    {/* <TabsTrigger value={3}>World Clock</TabsTrigger> */}
                    <TabsTrigger value={4}>Pomodoro Timer</TabsTrigger>

                </TabsList>
                <TabsContent value={0} className={'flex-1'}>
                    <Stopwatch />
                </TabsContent>
                <TabsContent value={1}>
                    <Alarm />
                </TabsContent>
                <TabsContent value={2}>
                    <Timers />
                </TabsContent>
                <TabsContent value={3}>
                    <WorldClock />
                </TabsContent>
                <TabsContent value={4}>
                    <PomodoroTimer />
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Clock
