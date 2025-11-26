import React, { useState, useEffect, useEffectEvent, useRef } from 'react'

const Chart = ({ width, height, ...props }) => {
    const ref = useRef()
    const ctx = useRef()
    const draw = useEffectEvent(() => {})
    useEffect(() => {
        const canvas = ref.current
        ctx.current = canvas.getContext('2d')
    }, [])
    useEffect(() => {
        //
    }, [width, height])
    return <canvas ref={ref} width={width} height={height} {...props}></canvas>
}

export default Chart
