// Calculator
import React, { useState, useRef } from 'react'
import { evaluate, parse } from 'mathjs'
import icon from './calculator.webp'

// history

const Calculator = () => {
    const [expression, setExpression] = useState('')
    const [history, setHistory] = useState([])
    const ref = useRef(null)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 固定结果
            setHistory([...history, expression + '=' + answer])
            setExpression('')
        }
        // 上键
        if (event.key === 'ArrowUp' && history.length > 0) {
            setExpression(history.at(-1).split('=')[0])

        }
    }
    const handleInput = (event) => {
        setExpression(event.target.value)
    }
    let answer = ''
    try {
        answer = evaluate(expression)
        console.log(typeof answer)
        if (typeof answer == 'object') {
            answer = ''
        }
    } catch (e) {
        answer = ''
    }
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Calculator</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={item}>
                        <p className="w-full px-2 py-0 text-right text-xl text-black/80">
                            {item}
                        </p>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={expression}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                ref={ref}
                className="text-18 w-full p-2 text-right text-4xl font-bold outline-0"
                autoFocus
            />
            <p className="text-18 w-full p-2 text-right text-4xl font-bold wrap-break-word text-black/50">
                {answer}
            </p>
        </div>
    )
}

export default {
    name: 'Calculator',
    Component: Calculator,
    icon,
}
