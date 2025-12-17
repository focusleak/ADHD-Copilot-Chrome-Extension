// Calligraphy
// 需求 TODO
// 通过虚拟列表优化
// 双击弹窗，放大显示
// 懒加载
// 米字格 回字格
import { useState, useEffect, useRef, startTransition } from 'react'
import { cn } from '@/lib/utils.js'
import characters from '@/data/characters.js'
import styles from './styles.module.css'
// https://faculty.blcu.edu.cn/xinghb/zh_CN/article/167473/content/1437.htm
import { useVirtualizer } from '@tanstack/react-virtual'

const items = characters.filter(({ frequency }) => frequency)
const CalligraphyCopybook = () => {
    const ref = useRef(null)

    const COLS = 4
    const ROW_HEIGHT = 90

    const virtualizer = useVirtualizer({
        count: Math.ceil(items.length / COLS),
        getScrollElement: () => ref.current,
        estimateSize: () => ROW_HEIGHT,
    })
    return (
        <div ref={ref} className={'w-full h-full overflow-auto'}>
            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    position: 'relative',
                }}
                className={cn(styles.ziTie)}
            >
                {virtualizer.getVirtualItems().map((row) => {
                    const start = row.index * COLS
                    const rowItems = items.slice(start, start + COLS)
                    return rowItems.map((char, index) => (
                        <Character
                            style={{
                                top: 0,
                                left: index * ROW_HEIGHT,
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
    strokeStyle = { stroke: '#00000033', strokeWidth: 1 },
}) => {
    return (
        <div className={cn(styles.character, className)} style={style}>
            {/* 改用背景图方案 */}
            <svg width={gridSize - 2} height={gridSize - 2} style={strokeStyle}>
                <line x1="0" y1="0" x2="100%" y2="0" />
                <line x1="0" y1="0" x2="0" y2="100%" />
                <line x1="100%" y1="0" x2="100%" y2="100%" />
                <line x1="0" y1="100%" x2="100%" y2="100%" />
                <line x1="0" y1="50%" x2="100%" y2="50%" />
                <line x1="50%" y1="0" x2="50%" y2="100%" />
                <line x1="0" y1="0" x2="100%" y2="100%" />
                <line x1="100%" y1="0" x2="0" y2="100%" />
            </svg>
            <div
                className={`absolute top-0 left-0 z-10 h-[90px] w-[90px] text-center text-[48px] leading-[90px]`}
            >
                {character}
            </div>
        </div>
    )
}
export default CalligraphyCopybook
