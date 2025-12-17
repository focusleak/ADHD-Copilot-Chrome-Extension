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
            return <span>{operands.join(` ${operator} `)}=</span>
        },
    },
    {
        type: '排列数 & 组合数',
        arity: 2,
        range: [1, 9],
        operators: ['A', 'C'],
        solution: (operator, operands) => {},
        generate: () => {
            // operands
            // operator
        },
        render: (operator, operands) => {},
    },
    { type: '指数' },
    { type: '分数' },
]
const ArithmeticPractice = ({ className }) => {
    const [operands, setOperands] = useState([0, 0])
    const [answer, setAnswer] = useState('')
    const [operator, setOperator] = useState('+')
    const [warn, setWarn] = useState(false)
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    useEffect(() => {
        const { operator, operands } = Problems[0].generate()
        setOperands(operands)
        setOperator(operator)
    }, [])

    const generateProblem = () => {
        const { operator, operands } = Problems[0].generate()
        setOperands(operands)
        setOperator(operator)
        setAnswer('')
    }

    const checkAnswer = () => {
        if (Problems[0].solution(operator, operands) == answer) {
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
            <p className={cn('transition', { 'text-red-500': warn })}>
                {Problems[0].render(operator, operands)}
                <span>?</span>
            </p>
            <input
                value={answer}
                autoFocus
                className="text-center outline-none"
                onChange={(e) => setAnswer(e.target.value)}
                onKeyUp={(event) => {
                    // check
                    if (event.key === 'Enter') checkAnswer()
                }}
            />
            {/* <p>
                <button className="px-2" onClick={checkAnswer}>
                    Check
                </button>
                <button className="px-2" onClick={generateQuestion}>
                    Next
                </button>
            </p> */}
            <p>
                <button className="px-2" onClick={startTimer}>
                    Begin
                </button>
                <button className="px-2" onClick={stopTimer}>
                    End
                </button>
            </p>
            <p>
                Correct: {correctNum} , Wrong: {wrongNum}
            </p>
        </div>
    )
}
export default ArithmeticPractice
