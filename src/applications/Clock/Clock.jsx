import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Stopwatch from './Stopwatch'
import Alarm from './Alarm'
import Timers from './Timers'
import WorldClock from './WorldClock'

const Clock = () => {
    return (
        <div className="px-4 font-sans">
            <Tabs defaultValue="3">
                <TabsList className="m-auto mb-6">
                    <TabsTrigger value="1">Stopwatch</TabsTrigger>
                    <TabsTrigger value="2">Alarm</TabsTrigger>
                    <TabsTrigger value="3">Timers</TabsTrigger>
                    <TabsTrigger value="4">World Clock</TabsTrigger>
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
                <TabsContent value="4">
                    <WorldClock />
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Clock
