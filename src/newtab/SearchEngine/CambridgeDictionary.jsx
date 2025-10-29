// https://dictionary.cambridge.org/us/pronunciation/english

import React, { useCallback } from 'react'
import Logo from './CambridgeDictionary.svg'
const search = (queryString) => {
    if (queryString) {
        window.open(
            `https://dictionary.cambridge.org/us/pronunciation/english/${queryString}`,
            '_blank'
        )
    }
}
const CambridgeDictionary = ({ queryString, onInput }) => {
    const handleKeyUp = useCallback(
        (event) => {
            if (event.code == 'Enter') {
                search(queryString)
            }
        },
        [queryString]
    )
    const handleSearch = (event) => {
        search(queryString)
    }
    return (
        <div className="flex h-[100%] w-[100%] flex-col justify-end">
            <p className="flex justify-center font-[MicrosoftYaHei]">
                <img width={300} src={Logo} />
            </p>
            <div className="mt-[10px] flex justify-center">
                <p className="shadow-[0 1px 6px 0 #20212447] flex h-[40px] w-[650px] items-center rounded-[20px] border-[1px] border-solid border-[#ddd] p-[10px] pl-[15px] transition-[0.2s] ">
                    <input
                        type="text"
                        value={queryString}
                        onInput={onInput}
                        onKeyUp={handleKeyUp}
                        className="mr-[15px] flex-1 text-[18px] outline-0"
                        placeholder="Search English Pronunciation"
                    />
                </p>
            </div>
        </div>
    )
}
export default CambridgeDictionary
