import React from 'react'

export default function FourQuadrant({
    width = 100,
    height = 100,
    className,
    stroke = 'black',
    fill = 'black',
    ...props
}) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            stroke={stroke}
            fill={fill}
            {...props}
        >
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="10"
                    refY="5"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>

            <g transform={`translate(${width / 2},${height / 2}) scale(1,-1)`}>
                {/* x 轴 */}
                <line
                    x1={-width / 2}
                    y1={0}
                    x2={width / 2}
                    y2={0}
                    markerEnd="url(#arrow)"
                />

                {/* y 轴 */}
                <line
                    x1={0}
                    y1={-height / 2}
                    x2={0}
                    y2={height / 2}
                    markerEnd="url(#arrow)"
                />
            </g>
        </svg>
    )
}
