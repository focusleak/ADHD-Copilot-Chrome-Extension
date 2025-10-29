import React from 'react'
import { useState } from 'react'

const search = (queryString) => {
    if (queryString) {
        window.open(`https://www.zhihu.com/search?q=${queryString}`, '_blank')
    }
}

const Logo = () => (
    <svg
        viewBox="0 0 64 30"
        fill="#1772F6"
        width="64"
        height="30"
        className="css-1hlrcxk"
    >
        <path d="M29.05 4.582H16.733V25.94h3.018l.403 2.572 4.081-2.572h4.815V4.582zm-5.207 18.69l-2.396 1.509-.235-1.508h-1.724V7.233h6.78v16.04h-2.425zM14.46 14.191H9.982c0-.471.033-.954.039-1.458v-5.5h5.106V5.935a1.352 1.352 0 0 0-.404-.957 1.378 1.378 0 0 0-.968-.396H5.783c.028-.088.056-.177.084-.255.274-.82 1.153-3.326 1.153-3.326a4.262 4.262 0 0 0-2.413.698c-.57.4-.912.682-1.371 1.946-.532 1.453-.997 2.856-1.31 3.693C1.444 8.674.28 11.025.28 11.025a5.85 5.85 0 0 0 2.52-.61c1.119-.593 1.679-1.502 2.054-2.883l.09-.3h2.334v5.5c0 .5-.045.982-.073 1.46h-4.12c-.71 0-1.39.278-1.893.775a2.638 2.638 0 0 0-.783 1.874h6.527a17.717 17.717 0 0 1-.778 3.649 16.796 16.796 0 0 1-3.012 5.273A33.104 33.104 0 0 1 0 28.74s3.13 1.175 5.425-.954c1.388-1.292 2.631-3.814 3.23-5.727a28.09 28.09 0 0 0 1.12-5.229h5.967v-1.37a1.254 1.254 0 0 0-.373-.899 1.279 1.279 0 0 0-.909-.37z"></path>
        <path d="M11.27 19.675l-2.312 1.491 5.038 7.458a6.905 6.905 0 0 0 .672-2.218 3.15 3.15 0 0 0-.28-2.168l-3.118-4.563zM51.449 15.195V5.842c4.181-.205 7.988-.405 9.438-.483l.851-.05c.387-.399.885-2.395.689-3.021-.073-.25-.213-.666-.638-.555a33.279 33.279 0 0 1-4.277.727c-2.766.321-3.97.404-7.804.682-6.718.487-12.709.72-12.709.72a2.518 2.518 0 0 0 .788 1.834 2.567 2.567 0 0 0 1.883.706c2.278-.095 5.598-.25 8.996-.41v9.203h-12.78c0 .703.281 1.377.783 1.874a2.69 2.69 0 0 0 1.892.777h10.105v7.075c0 .887-.464 1.192-1.231 1.214h-3.92a4.15 4.15 0 0 0 .837 1.544 4.2 4.2 0 0 0 1.403 1.067 6.215 6.215 0 0 0 2.71.277c1.36-.066 2.967-.826 2.967-3.57v-7.607h11.28c.342 0 .67-.135.91-.374.242-.239.378-.563.378-.902v-1.375H51.449z"></path>
        <path d="M42.614 8.873a2.304 2.304 0 0 0-1.508-.926 2.334 2.334 0 0 0-1.727.405l-.376.272 4.255 5.85 2.24-1.62-2.884-3.98zM57.35 8.68l-3.125 4.097 2.24 1.663 4.517-5.927-.375-.277a2.32 2.32 0 0 0-1.722-.452 2.327 2.327 0 0 0-1.536.896z"></path>
    </svg>
)

const Zhihu = ({ queryString, onInput }) => {
    const handleSearch = (event) => {
        search(queryString)
    }
    const handleKeyUp = (event) => {
        if (event.code == 'Enter') {
            search(queryString)
        }
    }

    return (
        <div className="flex h-[100%] w-[100%] items-end justify-center">
            <div className="flex h-[52px] items-center justify-center gap-[20px]">
                <Logo />
                <div className="flex h-[34px] w-[385px] items-center justify-between rounded-[999px] border-[1px] border-[#ebebec] bg-[#f8f8fa] transition focus-within:bg-white">
                    <input
                        type="search"
                        value={queryString}
                        onInput={onInput}
                        onKeyUp={handleKeyUp}
                        className="h-[34px] w-[311px] p-[10px] outline-0"
                        style={{
                            padding: 10,
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        className="p-[12px] text-[#8491a5]"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="ZDI ZDI--Search24 SearchBar-searchIcon css-1dlt5yv"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.8 2.425a9.075 9.075 0 1 0 5.62 16.201l2.783 2.783a.875.875 0 1 0 1.238-1.237l-2.758-2.758A9.075 9.075 0 0 0 11.8 2.425ZM4.475 11.5a7.325 7.325 0 1 1 14.65 0 7.325 7.325 0 0 1-14.65 0Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Zhihu
