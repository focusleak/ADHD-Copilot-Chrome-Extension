import React, { useState, useRef } from 'react'
import { produce } from 'immer'
import useStorage from '@/hooks/useStorage'
import EditableText from '@/components/EditableText'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AiTwotoneSound } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
let times = 0
const VocabularyBook = () => {
    const [vocabulary, setVocabulary] = useStorage('vocabulary', [])
    const audioRef = useRef(new Audio())

    const [playSpeed, setPlaySpeed] = useState(1)
    const [playMode, setPlayMode] = useState('uk')
    console.log(vocabulary)
    times++

    return (
        <div className="px-4 font-sans">
            <div className="grid grid-cols-2">
                {times}
                <div className="flex gap-2">
                    <Label>Speed</Label>
                    <Slider
                        defaultValue={[1]}
                        value={[playSpeed]}
                        onValueChange={(value) => setPlaySpeed(value[0])}
                        min={1}
                        max={4}
                        step={1}
                    />
                </div>
                <RadioGroup
                    onValueChange={(value) => setPlayMode(value)}
                    value={playMode}
                    className="flex p-2"
                >
                    <RadioGroupItem value="uk" id="uk" />
                    <Label htmlFor="uk">英音</Label>
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">美音</Label>
                </RadioGroup>
            </div>
            <ul className="py-4 text-sm">
                {vocabulary.map((word, index) => (
                    <li key={word + index} className="flex items-center gap-2">
                        <span>{index + 1}. </span>
                        <EditableText
                            className=""
                            onChange={(event) => {
                                const content = event.target.value
                                if (content != word) {
                                    setVocabulary(
                                        produce((draft) => {
                                            draft[index] = content
                                        })
                                    )
                                } else if (!content) {
                                    setVocabulary(
                                        produce((draft) => {
                                            draft.splice(index, 1)
                                        })
                                    )
                                }
                            }}
                        >
                            {word}
                        </EditableText>
                        <AiTwotoneSound
                            className="text-blue-500"
                            onClick={() => {
                                audioRef.current.pause()
                                audioRef.current.src = `https://sensearch.baidu.com/gettts?lan=${playMode}&spd=${playSpeed}&source=alading&text=${word}`
                                audioRef.current.play()
                            }}
                        />
                        <RiDeleteBin5Line
                            className="text-red-500"
                            onClick={() => {
                                setVocabulary(
                                    produce((draft) => {
                                        draft.splice(index, 1)
                                    })
                                )
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VocabularyBook
