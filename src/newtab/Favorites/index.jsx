import React, { useEffect } from 'react'
import list from './data.json'
import Image from '@/components/Image'
import { cn } from '@/lib/utils'
import useStorage from '@/hooks/useStorage'

const page = Math.ceil(list.length / 30)
// TODO 按最近时间、点击频率显示不同的导航
const Favorites = () => {
    const [index, setIndex] = React.useState(0)
    let [favorites, setFavorites] = useStorage('favorites_freq', {})

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
    return (
        <div
            className={cn(
                'mx-auto my-0 mt-8 h-[300px] w-[1000px] overflow-hidden rounded-sm bg-white/20 shadow-lg backdrop-blur-md'
            )}
            onWheel={handleWheel}
        >
            <div
                className="transition duration-500 flex flex-wrap"
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
                            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-sm hover:bg-white/10"
                        >
                            <Image
                                src={item.icon}
                                width={32}
                                height={32}
                                cache={true}
                            />
                            <span className="mt-2 text-center">
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
