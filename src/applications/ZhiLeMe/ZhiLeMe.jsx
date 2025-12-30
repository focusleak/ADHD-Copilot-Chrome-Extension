import React from 'react'
import data from './data.json'
const ZhiLeMe = () => {
    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} ￥{item.price} {item.time}</li>
                ))}
            </ul>
        </div>
    )
}

export default ZhiLeMe
