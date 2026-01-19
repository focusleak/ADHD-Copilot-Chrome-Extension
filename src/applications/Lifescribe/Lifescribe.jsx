import data from './data.json'

// 时间管理
// 精力管理
// 资产管理
const Lifescribe = () => {
    console.log(data)
    return (
        <div>
            <p>开心点，多活一天都是赚到。</p>
            <p>购买时除了考虑商品本身的价值，更应考虑的是它能给自己带来多少价值</p>
            <p>使用价值包括情绪价值和实用价值</p>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {index + 1}. {item.name}
                        {item.price ? ' ¥' + item.price : ''} {item.time}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Lifescribe
