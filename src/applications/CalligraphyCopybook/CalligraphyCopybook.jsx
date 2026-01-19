// Calligraphy
// TODO
// 双击弹窗，放大显示
// 米字格 回字格
import { useState, useEffect, useRef, startTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@/lib/utils.js'
import { getDayOfYear } from 'date-fns'

import { useToday } from '@/hooks/useTime'

import characters from '@/static/data/characters.js'
import styles from './styles.module.css'
// https://faculty.blcu.edu.cn/xinghb/zh_CN/article/167473/content/1437.htm

const items = characters.filter(({ frequency }) => frequency) //.slice(0, 10)

const CalligraphyCopybook = ({ className }) => {
    return (
        <Tabs
            defaultValue={0}
            className={cn('CalligraphyCopybook flex h-full', className)}
        >
            <TabsList className="m-auto mb-6">
                <TabsTrigger value={0}>每日一字</TabsTrigger>
                <TabsTrigger value={1}>Calligraphy Copybook</TabsTrigger>
            </TabsList>
            <TabsContent value={0}>
                <EverydayCharacter />
            </TabsContent>
            <TabsContent value={1} className={'min-h-0 flex-1'}>
                <Copybook />
            </TabsContent>
        </Tabs>
    )
}

const EverydayCharacter = ({ className }) => {
    const day = useToday()
    const dayOfYear = getDayOfYear(day)
    
    return (
        <div className={cn('relative flex justify-center', className)}>
            <Character
                character={characters[dayOfYear - 1].character}
                gridSize={360}
                fontSize={192}
            ></Character>
        </div>
    )
}

const Copybook = ({ className }) => {
    const ref = useRef(null)
    const [cols, setCols] = useState(4)
    const [offsetLeft, setOffsetLeft] = useState(0)
    const ROW_HEIGHT = 90

    useEffect(() => {
        const handleResize = () => {
            const cols = Math.floor(ref.current.offsetWidth / ROW_HEIGHT)
            setCols(cols)
            // setOffsetLeft((ref.current.offsetWidth - cols * ROW_HEIGHT) / 2)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // eslint-disable-next-line react-hooks/incompatible-library
    const virtualizer = useVirtualizer({
        count: Math.ceil(items.length / cols),
        getScrollElement: () => ref.current,
        estimateSize: () => ROW_HEIGHT,
    })
    return (
        <div
            ref={ref}
            className={cn('h-full w-full flex-1 overflow-auto', className)}
        >
            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    position: 'relative',
                }}
                className={cn(styles.ziTie)}
            >
                {virtualizer.getVirtualItems().map((row) => {
                    const start = row.index * cols
                    const rowItems = items.slice(start, start + cols)
                    return rowItems.map((char, index) => (
                        <Character
                            style={{
                                top: 0,
                                left: index * ROW_HEIGHT + offsetLeft,
                                transform: `translateY(${row.start}px)`,
                            }}
                            className={'absolute'}
                            key={start + index}
                            {...char}
                        />
                    ))
                })}
            </div>
        </div>
    )
}

const Character = ({
    character,
    className,
    style,
    gridSize = 90,
    fontSize = 48,
    strokeStyle = { strokeWidth: 1 },
}) => {
    return (
        <div className={cn(styles.character, className)} style={style}>
            {/* 改用背景图方案 */}
            <svg
                width={gridSize}
                height={gridSize}
                stroke="currentColor"
                fill="currentColor"
            >
                <g
                    style={{
                        ...strokeStyle,
                        stroke: 'currentColor',
                        opacity: 0.3,
                    }}
                >
                    <line x1="1" y1="1" x2={gridSize - 1} y2="1" />
                    <line x1="1" y1="1" x2="1" y2={gridSize - 1} />
                    <line
                        x1={gridSize - 1}
                        y1="1"
                        x2={gridSize - 1}
                        y2={gridSize - 1}
                    />
                    <line
                        x1="1"
                        y1={gridSize - 1}
                        x2={gridSize - 1}
                        y2={gridSize - 1}
                    />
                    <line x1="1" y1="50%" x2={gridSize - 1} y2="50%" />
                    <line x1="50%" y1="1" x2="50%" y2={gridSize - 1} />
                    <line x1="1" y1="1" x2={gridSize - 1} y2={gridSize - 1} />
                    <line x1={gridSize - 1} y1="1" x2="1" y2={gridSize - 1} />
                </g>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={fontSize}
                >
                    {character}
                </text>
            </svg>
        </div>
    )
}
export default CalligraphyCopybook
