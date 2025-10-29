import React from 'react'
import list from './data.json'
// 按时间显示不同的导航
const Favorites = () => {
    return (
        <div className="mt-4">
            <div className="mx-auto my-0 flex w-[800px] flex-wrap">
                {list.map((item) => {
                    return (
                        <a
                            href={item.url}
                            target="_self"
                            key={item.name}
                            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-sm hover:bg-[#E8E8E9]"
                        >
                            <img src={item.icon} width={32} height={32} />
                            <span className="mt-2">{item.name}</span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
export default Favorites
