import { useState } from 'react'
import data from './data.json'
import { Button } from '@/components/ui/button'

function speak(text) {
    // 创建语音合成实例
    const synth = window.speechSynthesis
    synth.cancel()
    // 配置语音参数
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN' // 中文普通话
    utterance.rate = 1.0 // 语速（0.1-10）
    utterance.pitch = 1.0 // 音高（0-2）
    utterance.volume = 1.0 // 音量（0-1）
    synth.speak(utterance)
}
const StructuredInterview = () => {
    const [active, setActive] = useState(0)
    return (
        <div>
            <ul className="flex flex-wrap gap-4 p-4">
                {data.map(({ questions, title, materials, type }, no) => {
                    return (
                        <li key={no}>
                            <Button
                                onClick={() => setActive(no)}
                                variant={active === no ? 'default' : 'outline'}
                            >
                                {title}
                                {no + 1}
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <div>
                {data[active].materials ? (
                    <div className="p-4">
                        {data[active].materials.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>
                ) : null}
                <div className="flex items-center gap-4 p-4">
                    {data[active].questions.map(({ text }, index) => (
                        <Button
                            key={index}
                            onClick={() => {
                                speak(text)
                            }}
                        >
                            第{index + 1}问
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default StructuredInterview
