import { useToday } from "@/hooks"

const data = [
    {
        type: '0',
        frequency: 'monthly',
        date: 1,
        name: '统计资产负债',
    },
    {
        type: '1',
        frequency: 'daily',
        name: 'LeetCode',
    },
    {
        type: '1',
        frequency: 'daily',
        name: '微信读书',
    },
    {
        type: '1',
        frequency: 'daily',
        name: '运动',
    },
    {
        type: '1',
        frequency: 'daily',
        name: '背单词',
    },
    {
        type: '1',
        frequency: 'daily',
        name: '练字',
    },
    // 锻炼身体 = 有氧 + 无氧 daily
    // 抗衰老 = 护肤 + 减脂 daily
    // 提升认知 = 阅读 + 思考复盘 + 输出
    // 学英语 daily
    // 理财 weekly
    // 写作 weekly
    // 学算法 weekly
    // 速读技巧
]
const Routine = () => {
    return (
        <ul>
            {data.map(({ name, frequency, date }, index) => {
                return <li key={index}>{name}</li>
            })}
        </ul>
    )
}

export default Routine
