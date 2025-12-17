// Calligraphy
// 需求 TODO
// 通过虚拟列表优化
// 双击弹窗，放大显示
// 懒加载
// 米字格 回字格
import { useState, useEffect, startTransition } from 'react'
import { cn } from '@/lib/utils.js'
import characters from '@/data/characters.js'
import styles from './styles.module.css'
// https://faculty.blcu.edu.cn/xinghb/zh_CN/article/167473/content/1437.htm

const ZiTie = () => {
    const [data, setData] = useState(characters.slice(0, 100))
    useEffect(() => {
        startTransition(() => {
            setData(characters)
        })
    }, [])
    return (
        <div
            className={cn(
                styles.ziTie,
                'grid justify-center gap-[10px] overflow-auto p-[10px]'
            )}
        >
            {data
                .filter(({ frequency }) => frequency)
                .map((char, index) => (
                    <Character key={index} {...char} />
                ))}
        </div>
    )
}

const Character = ({
    character,
    gridSize = 90,
    fontSize = 48,
    strokeStyle = { stroke: '#00000033', strokeWidth: 1 },
}) => {
    return (
        <div className={cn(styles.character, 'relative')}>
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
                className={`absolute top-0 left-0 z-10 h-full w-full text-center text-[48px] leading-[90px]`}
            >
                {character}
            </div>
        </div>
    )
}
export default ZiTie
