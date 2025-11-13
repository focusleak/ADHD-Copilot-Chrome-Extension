import React, { useEffect } from 'react'
import list from './data.json'
import Image from '@/components/Image'
import { cn } from '@/lib/utils'
import useStorage from '@/hooks/useStorage'

let group = []
for (let i = 0; i * 30 < list.length; i++) {
    group.push(list.slice(i * 30, Math.min((i + 1) * 30, list.length)))
}
// 按时间显示不同的导航
const Favorites = () => {
    const [index, setIndex] = React.useState(0)
    let [favorites, setFavorites] = useStorage('favorites_freq', {})

    const handleClick = (name) => {
        setFavorites({})
        favorites = { ...favorites }
        if (favorites[name]) favorites[name] += 1
        else favorites[name] = 1
        setFavorites(favorites)
        console.log(favorites)
    }
    const handleWheel = (e) => {
        if (e.deltaY > 0 && index < group.length - 1) {
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
                className="transition duration-500"
                style={{
                    transform: `translateY(${-index * 300}px)`,
                }}
            >
                {group.map((list, key) => {
                    return (
                        <div
                            key={key}
                            className={cn(
                                'flex h-[300px] flex-wrap content-start'
                            )}
                        >
                            {list.map((item) => {
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
                })}
            </div>
        </div>
    )
}
export default Favorites
