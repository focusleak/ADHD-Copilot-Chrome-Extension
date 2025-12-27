import React from 'react'

const data = [
    { name: 'DELL XPS 15 9560', price: '', time: '' },
    { name: 'Samsung T7 1TB', price: '', time: '' },
    { name: 'Dockcase', price: '', time: '' },
    { name: 'iPad Pro 2020', price: '', time: '' },
    { name: 'Apple Watch S8', price: '', time: '' },
    { name: 'iPhone 16 Pro', price: '', time: '' },
    { name: 'AirPods 4 ANC', price: '', time: '' },
    { name: 'Sony WH1000-XM4', price: '', time: '' },
    { name: '小米体重秤 S200', price: '', time: '' },
    { name: '小米LED智能台灯1s', price: '169', time: '2021-03-01' },
    { name: '小米智能除菌加湿器2', price: '', time: '' },
    { name: '小米空调伴侣', price: '', time: '' },
    { name: '小米立式冲牙器', price: '189', time: '' },
    { name: '小米电热水壶3', price: '', time: '' },
    { name: '小米口袋照片打印机 Pro', price: '', time: '' },
    { name: '酷态科CP13', price: '', time: '' },
    { name: '小米波轮洗衣机 8KG', price: '', time: '' },
    { name: 'XBox手柄', price: '', time: '' },
]
const ZhiLeMe = () => {
    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} {item.price} {item.time}</li>
                ))}
            </ul>
        </div>
    )
}

export default ZhiLeMe
