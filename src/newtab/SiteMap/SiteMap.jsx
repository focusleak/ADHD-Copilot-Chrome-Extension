import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import Image from '@/components/Image'
import { cn } from '@/lib/utils'
import { useStorage } from '@/hooks/useStorage'
import { useToday } from '@/hooks/useTime'

import list from './data.json'

const STORAGE_KEY = 'NEW_TAB_FAVORITES_FREQUENCIES'
const page = Math.ceil(list.length / 30)
// TODO 按最近时间、点击频率显示不同的导航
const Favorites = ({ className }) => {
    const [index, setIndex] = React.useState(0)
    let [favorites, setFavorites] = useStorage(STORAGE_KEY, {})

    let sortedList = list.toSorted(
        (a, b) => (favorites[b.name] || 0) - (favorites[a.name] || 0)
    )

    // TODO 监听键盘
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            // 判断当前有无焦点
        })
    }, [])

    const handleClick = (name) => {
        setFavorites(
            produce(favorites, (draft) => {
                if (draft[name]) draft[name] += 1
                else draft[name] = 1
            })
        )
    }
    const handleWheel = (e) => {
        if (e.deltaY > 0 && index < page - 1) {
            setIndex(index + 1)
        } else if (e.deltaY < 0 && index > 0) {
            setIndex(index - 1)
        }
    }
    const date = useToday()
    // LeetCode
    const [leeCodeRecord, setLeetCodeRecord] = useStorage('LeetCode_Record', {})
    const leetCodeState = leeCodeRecord[date.toLocaleDateString()]
        ? false
        : true // false = 无特殊样式 = 已完成

    // 微信读书
    const [WereadRecord, setWereadRecord] = useStorage('WereadRecord', {})
    const WereadState = WereadRecord[date.toLocaleDateString()] ? false : true

    const EPICState = date.getDay() == 5 ? true : false
    return (
        <div className={cn('overflow-hidden', className)} onWheel={handleWheel}>
            <div
                className="flex flex-wrap transition duration-500"
                style={{
                    transform: `translateY(${-index * 300}px)`,
                }}
            >
                {sortedList.map((item, key) => {
                    return (
                        <a
                            href={item.url}
                            onClick={() => {
                                handleClick(item.name)
                            }}
                            target="_blank"
                            rel="noreferrer"
                            key={item.name}
                            className={cn(
                                'flex h-[100px] w-[100px] flex-col items-center justify-center rounded-sm hover:bg-white/10',
                                {
                                    'animate-bounce':
                                        item.name == 'LeetCode'
                                            ? leetCodeState
                                            : false,
                                },
                                // {
                                //     'animate-bounce':
                                //         item.name == '微信读书'
                                //             ? WereadState
                                //             : false,
                                // },
                                {
                                    'animate-bounce':
                                        item.name == 'Epic Games'
                                            ? EPICState
                                            : false,
                                }
                            )}
                        >
                            <Image
                                src={item.icon}
                                width={32}
                                height={32}
                                cache={true}
                            />
                            <span className={cn('mt-2 text-center')}>
                                {item.name}
                            </span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
export default Favorites
