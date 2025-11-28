import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Stopwatch from './Stopwatch'
import Alarm from './Alarm'
import Timers from './Timers'

const Clock = () => {
    const [time, setTime] = useState(format(new Date(), 'HH:mm:ss'))
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(format(new Date(), 'HH:mm:ss'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="px-4 font-sans">
            <div className="text-center text-3xl">{time}</div>
            <Tabs defaultValue="3" className="mt-6">
                <TabsList className="m-auto">
                    <TabsTrigger value="1">Stopwatch</TabsTrigger>
                    <TabsTrigger value="2">Alarm</TabsTrigger>
                    <TabsTrigger value="3">Timers</TabsTrigger>
                </TabsList>
                <TabsContent value="1">
                    <Stopwatch />
                </TabsContent>
                <TabsContent value="2">
                    <Alarm />
                </TabsContent>
                <TabsContent value="3">
                    <Timers />
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Clock
