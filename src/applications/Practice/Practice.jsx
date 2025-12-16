import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useState } from 'react'
// import { toast } from 'sonner'

const operators = ['+', '-'] //, '×''÷']
const Practice = ({ className }) => {
    const [a, setA] = useState(1)
    const [b, setB] = useState(1)
    const [answer, setAnswer] = useState(null)
    const [operator, setOperator] = useState('+')
    const [warn, setWarn] = useState(false)
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    useEffect(() => {
        setA(Math.ceil(Math.random() * 19))
        setB(Math.ceil(Math.random() * 19))
        setOperator(operators[Math.floor(Math.random() * operators.length)])
    }, [])

    const generateQuestion = () => {
        setA(Math.ceil(Math.random() * 19))
        setB(Math.ceil(Math.random() * 19))
        setOperator(operators[Math.floor(Math.random() * operators.length)])
        setAnswer('')
    }

    const handleCorrect = () => {
        setCorrectNum(correctNum + 1)
        generateQuestion()
    }
    const handleWrong = () => {
        setAnswer('')
        setWrongNum(wrongNum + 1)
        setWarn(true)
        setTimeout(() => {
            setWarn(false)
        }, 400)
    }

    const checkAnswer = () => {
        if (operator === '+') {
            if (a + b == answer) {
                handleCorrect()
            } else {
                handleWrong()
            }
        } else if (operator === '-') {
            if (a - b == answer) {
                handleCorrect()
            } else {
                handleWrong()
            }
        } else if (operator === '×') {
            if (a * b == answer) {
                handleCorrect()
            } else {
                handleWrong()
            }
        } else if (operator === '/') {
            if (a / b == answer) {
                handleCorrect()
            } else {
                handleWrong()
            }
        }
    }
    const startTimer = () => {}
    const stopTimer = () => {}

    return (
        <div className={cn(className, 'text-center')}>
            <p className={cn('transition', { 'text-red-500': warn })}>
                <span>{a}</span> <span>{operator}</span> <span>{b}</span> ={' '}
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
export default Practice
