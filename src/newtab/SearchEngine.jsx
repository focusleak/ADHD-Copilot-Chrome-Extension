import React from 'react';

import { useState, useEffect, useCallback } from 'react';

// 需求：滚动鼠标滚轮，切换搜索引擎
// 搜索历史

// import baidu_logo_img from '../static/img/baidu_logo.png';
const search = (queryString) => {
    if (queryString) {
        window.open(`https://www.baidu.com/s?wd=${queryString}`, '_blank');
    }
};

const SearchEngine = () => {
    const [queryString, setQueryString] = useState('');
    const handleInput = useCallback((event) => {
        setQueryString(event.target.value);
    }, []);
    const handleSearch = useCallback(
        (event) => {
            search(queryString);
        },
        [queryString]
    );
    const handleKeyUp = useCallback(
        (event) => {
            if (event.code == 'Enter') {
                search(queryString);
            }
        },
        [queryString]
    );

    return (
        <div className="">
            <div className="flex justify-center">
                <img
                    width="270"
                    height="129"
                    src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                />
            </div>
            <div className="flex justify-center mt-[15px]">
                <input
                    type="search"
                    value={queryString}
                    onInput={handleInput}
                    onKeyUp={handleKeyUp}
                    className="outline-0 w-[546px] h-[44px] rounded-l-[10px] border-[2px] border-solid border-[#c4c7ce] border-r-0 focus:border-[#4e6ef2] transition"
                    style={{
                        padding: '12px 16px',
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="w-[108px] h-[44px] rounded-r-[10px] border-[2px] border-solid border-[#4e6ef2] border-l-0 text-[#fff] text-[17px] font-[500] transition"
                    style={{
                        width: 108,
                        height: 44,
                        fontSize: 17,
                        fontWeight: 500,
                        color: '#fff',
                        borderRadius: '0 10px 10px 0',
                        background: '#4e6ef2',
                        // "linear-gradient(136deg, #286aff, #4e6ef2, #7274f9, #9f66ff)",
                    }}
                >
                    百度一下
                </button>
            </div>
        </div>
    );
};
export default SearchEngine;
