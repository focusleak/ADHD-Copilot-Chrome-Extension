import React, { useState, useRef, useEffect, useEffectEvent, memo } from 'react'
import { Input } from '@/components/ui/input'
const Alarm = memo(() => {
    return (
        <div>
            <Input
                type="time"
                step="1"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <br />
            <hr />
        </div>
    )
})

export default Alarm
