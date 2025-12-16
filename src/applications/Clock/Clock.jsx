import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Stopwatch from './Stopwatch'
import Alarm from './Alarm'
import Timers from './Timers'
import WorldClock from './WorldClock'

const Clock = () => {
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
        <div className="h-full px-4 font-sans">
            <Tabs
                // activationMode="manual"
                // value={value}
                defaultValue={3}
                className={'h-full'}
                // onValueChange={(value) => {
                //     console.log('value change')
                //     setValue(value)
                // }}
            >
                <TabsList className="m-auto mb-6">
                    <TabsTrigger value={0}>Stopwatch</TabsTrigger>
                    <TabsTrigger value={1}>Alarm</TabsTrigger>
                    <TabsTrigger value={2}>Timers</TabsTrigger>
                    <TabsTrigger value={3}>World Clock</TabsTrigger>
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
            </Tabs>
        </div>
    )
}
export default Clock
