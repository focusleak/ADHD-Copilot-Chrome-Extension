import { useState } from 'react'
import data from './data.json'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import img from './img'
function speak(text, rate = 1) {
    // 创建语音合成实例
    const synth = window.speechSynthesis
    synth.cancel()
    // 配置语音参数
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN' // 中文普通话
    utterance.rate = rate // 语速（0.1-10）
    utterance.pitch = 1.0 // 音高（0-2）
    utterance.volume = 1.0 // 音量（0-1）
    synth.speak(utterance)
}
const StructuredInterview = () => {
    const [active, setActive] = useState(0)
    const [rate, setRate] = useState(1)
    return (
        <div>
            <ul className="flex flex-wrap gap-4 p-4">
                {data.map(({ title, type }, no) => {
                    return (
                        <li key={no}>
                            <Button
                                onClick={() => setActive(no)}
                                variant={active === no ? 'default' : 'outline'}
                            >
                                {title}
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <RadioGroup
                    onValueChange={(value) => setRate(value)}
                    value={rate}
                    className="flex gap-6 p-4"
                >
                    语速：
                    <Label>
                        1倍
                        <RadioGroupItem value={1} />
                    </Label>
                    <Label>
                        1.5倍
                        <RadioGroupItem value={1.5} />
                    </Label>
                    <Label>
                        2倍
                        <RadioGroupItem value={2} />
                    </Label>
                    <Label>
                        2.5倍
                        <RadioGroupItem value={2.5} />
                    </Label>
                    <Label>
                        3倍
                        <RadioGroupItem value={3} />
                    </Label>
                    <Label>
                        4倍
                        <RadioGroupItem value={4} />
                    </Label>
                </RadioGroup>
            </div>
            <div>
                <div className="p-4">
                    {data[active].materials
                        ? data[active].materials.map((text, index) => (
                              <p key={index} className="mb-3">
                                  {text}
                              </p>
                          ))
                        : '请听题'}
                </div>
                <div className="flex items-center gap-4 p-4">
                    {data[active].questions.map(({ text }, index) => (
                        <Button
                            key={index}
                            onClick={() => {
                                speak(text, rate)
                            }}
                        >
                            第{index + 1}问
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                {data[active].questions
                    .filter(({ image }) => {
                        return image
                    })
                    .map(({ image }, index) => {
                        return (
                            <img
                                key={index}
                                src={img[image]}
                                className="max-w-[600px]"
                            />
                        )
                    })}
            </div>
        </div>
    )
}
export default StructuredInterview
