import React, { useState, useRef } from 'react'
import { produce } from 'immer'
import useStorage from '@/hooks/useStorage'
import EditableText from '@/components/EditableText'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const VocabularyBook = () => {
    const [vocabulary, setVocabulary] = useStorage('vocabulary', [])
    const audioRef = useRef(new Audio())

    const [playSpeed, setPlaySpeed] = useState(1)
    const [playMode, setPlayMode] = useState('uk')

    return (
        <div className="px-4 font-sans">
            <div className="flex gap-2 p-2">
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
            <ul>
                {vocabulary.map((word, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            audioRef.current.pause()
                            audioRef.current.src = `https://sensearch.baidu.com/gettts?lan=${playMode}&spd=${playSpeed}&source=alading&text=${word}`
                            audioRef.current.play()
                        }}
                    >
                        <EditableText
                            onChange={(event) => {
                                const content = event.target.value
                                if (content) {
                                    setVocabulary(
                                        produce(vocabulary, (draft) => {
                                            draft[index] = content
                                        })
                                    )
                                } else {
                                    setVocabulary(
                                        produce(vocabulary, (draft) => {
                                            draft.splice(index, 1)
                                        })
                                    )
                                }
                            }}
                        >
                            {word}
                        </EditableText>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VocabularyBook
