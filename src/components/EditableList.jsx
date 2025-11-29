import React from 'react'
import EditableText from './EditableText'
import { produce } from 'immer'

// 可拖拽 可双击编辑
const EditableList = ({ list, onChange }) => {
    return (
        <ul>
            {list.map((item, index) => (
                <li key={index}>
                    <EditableText
                        onChange={(event) => {
                            const content = event.target.value
                            if (content) {
                                onChange(
                                    produce(list, (draft) => {
                                        draft[index] = content
                                    })
                                )
                            } else {
                                onChange(
                                    produce(list, (draft) => {
                                        draft.splice(index, 1)
                                    })
                                )
                            }
                        }}
                    >
                        {item}
                    </EditableText>
                </li>
            ))}
        </ul>
    )
}

export default EditableList
