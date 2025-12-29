// Calligraphy
// TODO
// 双击弹窗，放大显示
// 米字格 回字格
import { useState, useEffect, useRef, startTransition } from 'react'
import { cn } from '@/lib/utils.js'
import characters from '@/static/data/characters.js'
import styles from './styles.module.css'
// https://faculty.blcu.edu.cn/xinghb/zh_CN/article/167473/content/1437.htm
import { useVirtualizer } from '@tanstack/react-virtual'

const items = characters.filter(({ frequency }) => frequency)
const CalligraphyCopybook = ({ className }) => {
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
        <div ref={ref} className={cn('h-full w-full overflow-auto')}>
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
                width={gridSize - 2}
                height={gridSize - 2}
                style={{ ...strokeStyle, stroke: 'currentColor', opacity: 0.3 }}
            >
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
