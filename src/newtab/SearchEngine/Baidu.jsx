import React from 'react';

import { useState, useEffect, useCallback } from 'react';

// import baidu_logo_img from '../static/img/baidu_logo.png';
const search = (queryString) => {
    if (queryString) {
        window.open(`https://www.baidu.com/s?wd=${queryString}`, '_blank');
    }
};

const Baidu = ({ queryString, onInput }) => {
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
        <div className="w-[100%] h-[100%] flex justify-center items-end">
            <div>
                <p className="flex justify-center">
                    <img
                        width="270"
                        height="129"
                        src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                    />
                </p>
                <p className="flex justify-center mt-[15px]">
                    <input
                        type="search"
                        value={queryString}
                        onInput={onInput}
                        onKeyUp={handleKeyUp}
                        className="outline-0 w-[546px] h-[44px] px-[12px] py-[16px] rounded-l-[10px] border-[2px] border-solid border-[#c4c7ce] border-r-0 focus:border-[#4e6ef2] transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-[108px] h-[44px] rounded-r-[10px] border-[2px] border-solid border-[#4e6ef2] bg-[#4e6ef2] border-l-0 text-[#fff] text-[17px] font-[500] transition"
                        style={{
                            borderRadius: '0 10px 10px 0',
                            // "linear-gradient(136deg, #286aff, #4e6ef2, #7274f9, #9f66ff)",
                        }}
                    >
                        百度一下
                    </button>
                </p>
            </div>
        </div>
    );
};
export default Baidu;
