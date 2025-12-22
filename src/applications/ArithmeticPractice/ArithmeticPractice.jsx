import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { produce } from 'immer'
import { random, sample } from 'lodash'
// import { toast } from 'sonner'

const operators = ['+', '-'] //, '×''÷']
const percentToFraction = {
    '33%': '1/3',
    '25%': '1/4',
    '16.7%': '1/6',
    '14.3%': '1/7',
    '28.6%': '2/7',
    '42.8%': '3/7',
    '12.5%': '1/8',
    '37.5%': '3/8',
    '11.1%': '1/9',
    '22.2%': '2/9',
    '9.1%': '1/11',
    '8.3%': '1/12',
    '8%': '1/12.5',
    '7.7%': '1/13',
    '7.1%': '1/14',
    '6.7%': '1/15',
    '6.3%': '1/16',
    '5.9%': '1/17',
    '5.6%': '1/18',
    '5.3%': '1/19',
}
const Problems = [
    {
        type: '两位数加减法',
        arity: 3, // 运算数个数
        range: [2, 99],
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
                operands.push(random(range[0], range[1]))
            }
            const operator = sample(operators)
            const answer = this.solution(operator, operands)
            return { operator, operands, answer }
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
        generate: () => {
            const base = random(2, 9)
            const exponent = random(2, 3)
            const answer = Math.pow(base, exponent)
            return { operator: '^', operands: [base, exponent], answer }
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
        range: [2, 9],
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
            const n = random(range[0], range[1])
            const m = random(1, n)
            const operator = sample(operators)
            const answer = this.solution(operator, [n, m])
            return { operator, operands: [n, m], answer }
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
    {
        type: '百分数化分数',
        arity: 1,
        range: [1, 100],
        operators: ['%'],
        solution: (operator, operands) => {
            return percentToFraction[operands[0]]
        },
        generate: () => {
            const percents = Object.keys(percentToFraction)
            const operand = sample(percents)
            return {
                operator: '%',
                operands: [operand],
                answer: percentToFraction[operand],
            }
        },
        render: (operator, operands) => {
            return <span>{operands[0]}</span>
        },
    },
    // { type: '分数比大小' },
    // { type: '小数加减' },
    // { type: '指数' },
    // { type: '分数' },
]
const ArithmeticPractice = ({ className }) => {
    const [input, setInput] = useState('')

    const [operands, setOperands] = useState([0, 0])
    const [operator, setOperator] = useState('+')
    const [answer, setAnswer] = useState(null)

    const [warn, setWarn] = useState(false)
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    const [type, setType] = useState(0)

    const [typeChecked, setTypeChecked] = useState(Problems.map(() => true))

    const generateProblem = () => {
        if (typeChecked.every((v) => v === false)) return
        const type = sample(
            typeChecked.map((v, i) => (v ? i : null)).filter((v) => v !== null)
        )
        const { operator, operands, answer } = Problems[type].generate()
        setType(type)
        setOperands(operands)
        setOperator(operator)
        setAnswer(answer)
        setInput('')
    }

    useEffect(() => {
        generateProblem()
    }, [])
    const checkAnswer = () => {
        if (answer == input) {
            setCorrectNum(correctNum + 1)
            generateProblem()
        } else {
            setInput('')
            setWrongNum(wrongNum + 1)
            setWarn(true)
            setTimeout(() => setWarn(false), 400)
        }
    }
    const startTimer = () => {}
    const stopTimer = () => {}

    return (
        <div className={cn(className, 'text-center')}>
            <p className="flex flex-wrap justify-center gap-4">
                {Problems.map(({ type }, index) => {
                    return (
                        <Label key={index}>
                            <Checkbox
                                checked={typeChecked[index]}
                                onCheckedChange={() => {
                                    setTypeChecked(
                                        produce(typeChecked, (draft) => {
                                            draft[index] = !draft[index]
                                        })
                                    )
                                }}
                            />
                            {type}
                        </Label>
                    )
                })}
                {/* <Label>
                    <Checkbox checked={showAnswer} />
                </Label> */}
            </p>
            <p
                className={cn('mt-8 text-4xl transition', {
                    'text-red-500': warn,
                })}
            >
                {Problems[type].render(operator, operands)}
                <span> = ?</span>
            </p>
            <input
                value={input}
                autoFocus
                className="mt-4 w-full text-center text-4xl outline-none"
                onChange={(e) => setInput(e.target.value.trim())}
                onKeyUp={(event) => {
                    // check
                    if (event.key === 'Enter') checkAnswer()
                }}
            />
            <p className="mt-4">
                <button
                    className="px-2 transition hover:text-green-400"
                    onClick={checkAnswer}
                >
                    Check
                </button>
                <button
                    className="px-2 transition hover:text-green-400"
                    onClick={generateProblem}
                >
                    Next
                </button>
                <button
                    className="px-2 transition hover:text-green-400"
                    onClick={() => setInput(answer)}
                >
                    Answer
                </button>
            </p>
            <p className="mt-4">
                Correct: {correctNum} , Wrong:{' '}
                <span className="text-red-500">{wrongNum}</span>
            </p>
            {/* <p className="mt-4">
                <button className="px-2" onClick={startTimer}>
                    Begin
                </button>
                <button className="px-2" onClick={stopTimer}>
                    End
                </button>
            </p> */}
        </div>
    )
}
export default ArithmeticPractice
