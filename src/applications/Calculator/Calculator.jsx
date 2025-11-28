// Calculator
import React, { useState, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { create, all } from 'mathjs'

const mathjs = create(all, {
    number: 'BigNumber',
    precision: 64, // 小数精度
})

const Calculator = () => {
    const [expression, setExpression] = useState('')
    const [history, setHistory] = useState([])
    const ref = useRef(null)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setHistory([...history, expression + '=' + answer])
            setExpression('')
        }
        if (event.key === 'ArrowUp' && history.length > 0) {
            setExpression(history.at(-1).split('=')[0])
        }
    }
    const handleInput = (event) => {
        setExpression(event.target.value)
    }
    let answer = ''
    try {
        answer = mathjs.evaluate(expression).toString()
        // if (!answer.test(/[0-9]+.?[0-9]+/)) {
        //     answer = ''
        // }
    } catch (e) {
        answer = ''
    }
    return (
        <div className="px-4">
            <ul>
                {history.map((item, index) => (
                    <li key={item}>
                        <p className="w-full px-2 py-0 text-right text-xl text-black/80">
                            {item}
                        </p>
                    </li>
                ))}
            </ul>
            <Textarea
                type="text"
                value={expression}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                ref={ref}
                className="w-full p-2 text-right text-4xl font-bold outline-0"
                autoFocus
            />
            <p className="w-full p-2 text-right text-4xl font-bold wrap-break-word text-black/50">
                {answer}
            </p>
        </div>
    )
}
export default Calculator
