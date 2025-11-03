import React from 'react'
import list from './data.json'
import Image from '@/components/Image'
// 按时间显示不同的导航
const Favorites = () => {
    return (
        <div className="mt-4">
            <div className="mx-auto my-0 flex w-[800px] flex-wrap rounded-sm bg-white/20 shadow-lg backdrop-blur-md">
                {list.map((item) => {
                    return (
                        <a
                            href={item.url}
                            target="_self"
                            key={item.name}
                            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-sm hover:bg-white/10"
                        >
                            <Image src={item.icon} width={32} height={32} cache={true} />
                            <span className="mt-2 text-center">
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
