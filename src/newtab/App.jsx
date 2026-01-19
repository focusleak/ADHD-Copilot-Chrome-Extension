import React from 'react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary, Background, FrostedContainer } from '@/components'

import SiteMap from './SiteMap'
import SearchEngine from './SearchEngine'
import ControlPanel from './ControlPanel'
import Footer from './Footer'
import Sidebar from './SideBar/SideBar'
import TimeIndicator from '../applications/TimeIndicator/TimeIndicator.jsx'
import Weather from '../applications/Weather/Weather'
import Countdown from '../applications/Countdown/Countdown'
import DailyTrace from '@/applications/DailyTrace/DailyTrace'
import QuickNote from '@/applications/QuickNote/QuickNote'
const App = () => {
    return (
        <Background
            // src="https://bing.img.run/rand.php"
            src="https://picsum.photos/1920/1080"
            className="h-full w-full"
        >
            <SearchEngine />
            <FrostedContainer
                asChild
                rounded
                className={cn('mx-auto my-0 mt-8')}
            >
                <SiteMap rows={4} cols={8} />
            </FrostedContainer>

            <ErrorBoundary>
                <FrostedContainer asChild>
                    <Sidebar className="absolute top-0 left-0 h-full w-18" />
                </FrostedContainer>
            </ErrorBoundary>

            {/* <FrostedContainer
                asChild
                className="absolute top-[300px] left-22 h-[390px] w-[225px] overflow-auto p-4"
                rounded
            >
                <DailyTrace />
            </FrostedContainer> */}
            <FrostedContainer
                asChild
                className="absolute top-[140px] left-22 w-[160px] overflow-auto p-4"
                rounded
            >
                <QuickNote />
            </FrostedContainer>

            <FrostedContainer asChild rounded>
                <ControlPanel className="absolute bottom-4 left-22 p-4 opacity-0 transition hover:opacity-100" />
            </FrostedContainer>

            <FrostedContainer
                className="absolute top-2 left-22 p-4 text-right"
                asChild
                rounded
            >
                <Weather />
            </FrostedContainer>

            <FrostedContainer
                className="absolute top-[12px] right-[120px] p-4 text-right"
                asChild
                rounded
            >
                <Countdown className="" />
            </FrostedContainer>

            <FrostedContainer
                asChild
                className="absolute top-0 right-0 h-full w-[108px]"
            >
                <TimeIndicator />
            </FrostedContainer>

            <Footer />
            <Toaster />
        </Background>
    )
}

function WuXingDiagram() {
    const size = 500
    const center = size / 2
    const rOuter = 220
    const rInner = 140

    const polar = (r, deg) => {
        const rad = ((deg - 90) * Math.PI) / 180
        return {
            x: center + r * Math.cos(rad),
            y: center + r * Math.sin(rad),
        }
    }

    const sectors = [
        { name: '黑', color: '#000000', angle: 0 },
        { name: '青', color: '#2E335F', angle: 72 },
        { name: '红', color: '#8B2C2C', angle: 144 },
        { name: '黄', color: '#C9A227', angle: 216 },
        { name: '白', color: '#FFFFFF', angle: 288 },
    ]

    const elements = [
        { text: '水', angle: 0, fill: '#000' },
        { text: '木', angle: 72, fill: '#2E335F' },
        { text: '火', angle: 144, fill: '#8B2C2C' },
        { text: '土', angle: 216, fill: '#C9A227' },
        { text: '金', angle: 288, fill: '#FFFFFF', stroke: '#000' },
    ]

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* 外圆 */}
            <circle
                cx={center}
                cy={center}
                r={rOuter}
                fill="none"
                stroke="#111"
                strokeWidth="4"
            />

            {/* 五色扇区 */}
            {sectors.map((s, i) => {
                const p1 = polar(rInner, s.angle)
                const p2 = polar(rOuter, s.angle - 36)
                const p3 = polar(rOuter, s.angle + 36)

                return (
                    <g key={i}>
                        <path
                            d={`
                M ${p1.x} ${p1.y}
                L ${p2.x} ${p2.y}
                L ${p3.x} ${p3.y}
                Z
              `}
                            fill={s.color}
                        />
                        <text
                            x={polar((rInner + rOuter) / 2, s.angle).x}
                            y={polar((rInner + rOuter) / 2, s.angle).y}
                            fill={s.name === '白' ? '#000' : '#fff'}
                            fontSize="28"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {s.name}
                        </text>
                    </g>
                )
            })}

            {/* 五行点 */}
            {elements.map((e, i) => {
                const p = polar(rOuter + 25, e.angle)
                return (
                    <g key={i}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="22"
                            fill={e.fill}
                            stroke={e.stroke || 'none'}
                        />
                        <text
                            x={p.x}
                            y={p.y}
                            fill={e.fill === '#FFFFFF' ? '#000' : '#fff'}
                            fontSize="20"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {e.text}
                        </text>
                    </g>
                )
            })}

            {/* 中心方位 */}
            {[
                { t: '北', x: center, y: center - 40, c: '#000' },
                { t: '南', x: center, y: center + 40, c: '#8B2C2C' },
                { t: '东', x: center + 40, y: center, c: '#2E335F' },
                { t: '西', x: center - 40, y: center, c: '#fff', s: '#000' },
                { t: '中', x: center, y: center, c: '#C9A227' },
            ].map((d, i) => (
                <g key={i}>
                    <rect
                        x={d.x - 16}
                        y={d.y - 16}
                        width="32"
                        height="32"
                        transform={`rotate(45 ${d.x} ${d.y})`}
                        fill={d.c}
                        stroke={d.s || 'none'}
                    />
                    <text
                        x={d.x}
                        y={d.y}
                        fill={d.c === '#fff' ? '#000' : '#fff'}
                        fontSize="14"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {d.t}
                    </text>
                </g>
            ))}
        </svg>
    )
}

export default App
