import data from './data.json'
const Lifescribe = () => {
    console.log(data)
    return (
        <div>
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
