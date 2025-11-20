import React, { useEffect, useState } from 'react'
import list from './data.json'
import Image from '@/components/Image'
import { cn } from '@/lib/utils'
import storage from '@/lib/storage'
import useStorage from '@/hooks/useStorage'

const STORAGE_KEY = 'NEW_TAB_FAVORITES_FREQUENCIES'
const page = Math.ceil(list.length / 30)
// TODO 按最近时间、点击频率显示不同的导航
const Favorites = () => {
    const [index, setIndex] = React.useState(0)
    let [favorites, setFavorites] = useStorage(STORAGE_KEY, {})

    let sortedList = list.toSorted(
        (a, b) => (favorites[b.name] || 0) - (favorites[a.name] || 0)
    )

    const handleClick = (name) => {
        favorites = { ...favorites }
        if (favorites[name]) favorites[name] += 1
        else favorites[name] = 1
        setFavorites(favorites)
    }
    const handleWheel = (e) => {
        if (e.deltaY > 0 && index < page - 1) {
            setIndex(index + 1)
        } else if (e.deltaY < 0 && index > 0) {
            setIndex(index - 1)
        }
    }
    // LeetCode
    const [LeetCodeState, setLeetCodeState] = useState(false) // false = 无特殊样式 = 已完成
    useEffect(() => {
        // 读取chrome.storage
        storage.get('LeetCode_Record').then((record) => {
            if (!record[new Date().toLocaleDateString()]) {
                setLeetCodeState(true)
            }
        })
    })
    return (
        <div
            className={cn(
                'mx-auto my-0 mt-8 h-[300px] w-[1000px] overflow-hidden rounded-sm bg-white/20 shadow-lg backdrop-blur-md'
            )}
            onWheel={handleWheel}
        >
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
                                    'border-2 border-yellow-300':
                                        item.name == 'LeetCode'
                                            ? LeetCodeState
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
                            <span className={cn("mt-2 text-center ",{
                                'text-yellow-300': item.name == 'LeetCode' ? LeetCodeState : false
                            })}>
                                {item.name}
                            </span>
                        </a>
                    )
                })}
            </div>
            )
        </div>
    )
}
export default Favorites
