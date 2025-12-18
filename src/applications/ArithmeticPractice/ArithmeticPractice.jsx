import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useState } from 'react'
// import { toast } from 'sonner'

const operators = ['+', '-'] //, '×''÷']
const Problems = [
    {
        type: '整数加减法',
        arity: 3, // 运算数个数
        range: [1, 20],
        operators: ['+', '-'],
        solution: (operator, operands) => {
            if (operator === '+') {
                return operands.reduce((accu, curr) => accu + curr, 0)
            } else if (operator === '-') {
                return operands.reduce((accu, curr) => accu - curr)
            } else if (operator === '×') {
                return operands.reduce((accu, curr) => accu * curr, 1)
            } else if (operator === '/') {
                return operands.reduce((accu, curr) => accu / curr, 1)
            } else {
                throw new Error('Invalid operator')
            }
        },
        generate(arity = this.arity) {
            const { operators, range } = this
            const operands = []
            for (let i = 0; i < arity; i++) {
                operands.push(Math.ceil(Math.random() * range[1]))
            }
            const operator =
                operators[Math.floor(Math.random() * operators.length)]
            return { operator, operands }
        },
        render: (operator, operands) => {
            return <span>{operands.join(` ${operator} `)}</span>
        },
    },
    {
        type: '幂',
        arity: 2,
        range: [1, 10],
        operators: ['^'],
        solution: (operator, operands) => {
            console.log(Math.pow(operands[0], operands[1]))
            return Math.pow(operands[0], operands[1])
        },
        generate: () => {
            const base = Math.ceil(Math.random() * 8) + 1
            const exponent = Math.ceil(Math.random() * 2) + 1
            return { operator: '^', operands: [base, exponent] }
        },
        render: (operator, operands) => {
            return (
                <span>
                    {operands[0]}
                    <sup>{operands[1]}</sup>
                </span>
            )
        },
    },
    {
        type: '排列数 & 组合数',
        arity: 2,
        range: [1, 9],
        operators: ['A', 'C'],
        solution: (operator, operands) => {
            const [n, m] = operands
            if (operator === 'A') {
                let result = 1
                for (let i = n - m + 1; i <= n; i++) {
                    result *= i
                }
                return result
            } else if (operator === 'C') {
                let result = 1
                for (let i = 1; i <= m; i++) {
                    result *= (n - m + i) / i
                }
                return Math.round(result)
            }
        },
        generate() {
            const { operators, range } = this
            const n = Math.ceil(Math.random() * range[1])
            const m = Math.ceil(Math.random() * n)
            const operator =
                operators[Math.floor(Math.random() * operators.length)]
            return { operator, operands: [n, m] }
            // operands
            // operator
        },
        render: (operator, operands) => {
            return (
                <span>
                    {operator}
                    <sup>{operands[1]}</sup>
                    <sub className="left-[-0.55em]">{operands[0]}</sub>
                </span>
            )
        },
    },
    // { type: '小数加减' },
    // { type: '指数' },
    // { type: '分数' },
]
const ArithmeticPractice = ({ className }) => {
    const [operands, setOperands] = useState([0, 0])
    const [answer, setAnswer] = useState('')
    const [operator, setOperator] = useState('+')
    const [warn, setWarn] = useState(false)
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    const [type, setType] = useState(0)

    const generateProblem = () => {
        const type = Math.floor(Math.random() * Problems.length)
        const { operator, operands } = Problems[type].generate()
        setType(type)
        setOperands(operands)
        setOperator(operator)
        setAnswer('')
    }

    useEffect(() => {
        generateProblem()
    }, [])
    const checkAnswer = () => {
        if (Problems[type].solution(operator, operands) == answer) {
            setCorrectNum(correctNum + 1)
            generateProblem()
        } else {
            setAnswer('')
            setWrongNum(wrongNum + 1)
            setWarn(true)
            setTimeout(() => setWarn(false), 400)
        }
    }
    const startTimer = () => {}
    const stopTimer = () => {}

    return (
        <div className={cn(className, 'text-center')}>
            <p className={cn('text-4xl transition', { 'text-red-500': warn })}>
                {Problems[type].render(operator, operands)}
                <span> = ?</span>
            </p>
            <input
                value={answer}
                autoFocus
                className="mt-4 w-full text-center text-4xl outline-none"
                onChange={(e) => setAnswer(e.target.value)}
                onKeyUp={(event) => {
                    // check
                    if (event.key === 'Enter') checkAnswer()
                }}
            />
            <p className="mt-4">
                <button className="px-2" onClick={checkAnswer}>
                    Check
                </button>
                <button className="px-2" onClick={generateProblem}>
                    Next
                </button>
            </p>
            <p className="mt-4">
                Correct: {correctNum} , Wrong: {wrongNum}
            </p>
            <p className="mt-4">
                <button className="px-2" onClick={startTimer}>
                    Begin
                </button>
                <button className="px-2" onClick={stopTimer}>
                    End
                </button>
            </p>
        </div>
    )
}
export default ArithmeticPractice
