import { useState, useEffect } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { produce } from 'immer'
import { random, sample } from 'lodash'
// import { toast } from 'sonner'
import { cn } from '@/lib/utils'

import percentToFraction from './percentToFraction.json'
import Power from './Power.jsx'
const Anki = {
    混合增长率: '',
    间隔增长率: '',
    拉动增长率: '',
    增长贡献率: '',
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
            return <Power base={operands[0]} exponent={operands[1]} />
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
    // TODO 图形旋转&对称想象
    // anki
    // {
    //     type: 'Anki',
    //     solution: (operator, operands) => {
    //         return Anki[operands[0]]
    //     },
    //     generate: () => {
    //         const question = sample(Object.keys(Anki))
    //         return {
    //             operator: '',
    //             operands: [question],
    //             answer: Anki[question],
    //         }
    //     },
    //     render: (operator, operands) => {
    //         return <span>{operands[0]}</span>
    //     },
    // },
    // { type: '三位数除法' },
    // { type: '分数比大小' },
    // { type: '小数加减' },
    // { type: '分数' },
]

const ArithmeticPractice = ({ className }) => {
    return (
        <Tabs defaultValue={0} className={cn('text-center', className)}>
            <TabsList className="m-auto mb-6">
                <TabsTrigger value={0}>Practice</TabsTrigger>
                <TabsTrigger value={1}>History</TabsTrigger>
                <TabsTrigger value={2}>CheatSheet</TabsTrigger>
            </TabsList>
            <TabsContent value={0}>
                <Practice />
            </TabsContent>
            <TabsContent value={1}>
                <History />
            </TabsContent>
            <TabsContent value={2}>
                <CheatSheet className="mx-auto max-w-[800px]" />
            </TabsContent>
        </Tabs>
    )
}
// A4纸模式：一次出一页题，同时出答案，支持打印
const Practice = ({ className }) => {
    const [input, setInput] = useState('')

    const [status, setStatus] = useState(0)

    const [operands, setOperands] = useState([0, 0])
    const [operator, setOperator] = useState('+')
    const [answer, setAnswer] = useState(null)

    const [warn, setWarn] = useState(false)
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    const [type, setType] = useStorage('arithmetic-practice-type', 0)
    const [history, setHistory] = useStorage('arithmetic-practice-history', [])

    const [typeChecked, setTypeChecked] = useStorage(
        'arithmetic-practice-type-checked',
        Problems.map(() => true)
    )

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
        setHistory(
            produce(history, (draft) => {
                draft.push({
                    type: type,
                    operands,
                    operator,
                    input,
                    correct: answer == input,
                })
            })
        )
    }

    // useEffect(() => {
    //     const handleKeyDown = (e) => {

    //     }
    //     window.addEventListener('keydown', handleKeyDown)
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown)
    //     }
    // })
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
            {/* keyboard */}
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
                <span className="px-1 text-green-500">
                    Correct: {correctNum}
                </span>
                <span className="px-1 text-red-500">Wrong: {wrongNum}</span>
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

const History = ({ className }) => {
    const [history] = useStorage('arithmetic-practice-history', [])
    console.log(history)
    return (
        <div className={className}>
            <ul className="mx-auto max-w-[800px]">
                {history.map(
                    (
                        { type, correct, input, answer, operands, operator },
                        index
                    ) => (
                        <li key={index}>
                            {Problems[type].render(operator, operands)}
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}
const CheatSheet = ({ className }) => {
    const [status, setStatus] = useStorage(
        'arithmetic-practice-cheatsheet-status',
        {}
    )
    const numbers = Array.from({ length: 15 }, (_, i) => [i + 2])
    const percents = Array.from({ length: 50 }, (_, i) => (i + 1) / 1000).map(
        (decimal) => {
            return [decimal, 1 / (1 + decimal), 1 - decimal]
        }
    )
    // 勾股数
    const pythagoreanTriple = [
        [3, 4, 5],
        [5, 12, 13],
        [6, 8, 10],
        [7, 24, 25],
        [8, 15, 17],
        [9, 12, 15],
        [9, 40, 41],
        [10, 24, 26],
        [11, 60, 61],
        [12, 35, 37],
        [15, 36, 39],
        [20, 21, 29],
    ]
    const list = [
        {
            type: 0,
            key: (operand) => operand[0] + '=' + operand[1],
            operands: Object.entries(percentToFraction),
            render: (operand) => {
                return (
                    <>
                        {operand[0]} = {operand[1]}
                    </>
                )
            },
        },
        {
            type: 1,
            key: (operand) => operand[0] + '^2',
            operands: numbers,
            render: (operand) => {
                return (
                    <>
                        <Power base={operand[0]} exponent={2} /> ={' '}
                        {Math.pow(operand[0], 2)}
                    </>
                )
            },
        },
        {
            type: 2,
            key: (operand) => operand[0] + '^3',
            operands: numbers,
            render: (operand) => {
                return (
                    <>
                        <Power base={operand[0]} exponent={3} /> ={' '}
                        {Math.pow(operand[0], 3)}
                    </>
                )
            },
        },
        {
            type: 3,
            key: (operand) => '2^' + operand[0],
            operands: numbers,
            render: (operand) => {
                return (
                    <>
                        <Power base={2} exponent={operand[0]} /> ={' '}
                        {Math.pow(2, operand[0])}
                    </>
                )
            },
        },
        {
            type: 4,
            key: (operand) => {
                const [a, b, c] = operand
                return `${a}^2 + ${b}^2 = ${c}^2`
            },
            operands: pythagoreanTriple,
            render: (operand) => {
                const [a, b, c] = operand
                return (
                    <>
                        <Power base={a} exponent={2} /> +{' '}
                        <Power base={b} exponent={2} /> ={' '}
                        <Power base={c} exponent={2} />
                    </>
                )
            },
        },
    ]

    return (
        <>
            {list.map(({ render, type, key, operands }) => (
                <ul
                    key={type}
                    className={cn(
                        className,
                        'grid grid-cols-[repeat(auto-fill,100px)] justify-around px-2 text-left text-xs'
                    )}
                >
                    {operands.map((operand) => {
                        return (
                            <li
                                key={key(operand)}
                                className={cn('transition', {
                                    'text-black/20 dark:text-white/20':
                                        status[key(operand)],
                                    'hover:text-green-500':
                                        !status[key(operand)],
                                })}
                                onClick={() => {
                                    setStatus(
                                        produce((draft) => {
                                            draft[key(operand)] =
                                                !draft[key(operand)]
                                        })
                                    )
                                }}
                            >
                                {render(operand)}
                            </li>
                        )
                    })}
                </ul>
            ))}
            {/* <ul>
                {percents.map(([percent, raw, near]) => (
                    <li key={percent}>
                        {percent}% : {raw} - {near} = {(near - raw).toFixed(4)}
                    </li>
                ))}
            </ul> */}
        </>
    )
}

export default ArithmeticPractice
