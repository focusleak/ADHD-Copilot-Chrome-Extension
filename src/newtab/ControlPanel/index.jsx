import React from 'react'

const ControlPanel = () => {
    return (
        <div className="absolute top-4 right-8 text-right">
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: 'chrome://downloads/' })
                }}
            >
                下载记录
            </p>
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: 'chrome://history/' })
                }}
            >
                历史记录
            </p>
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: 'chrome://extensions/' })
                }}
            >
                扩展程序
            </p>
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: './options.html' })
                }}
            >
                设置
            </p>
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: './popup.html' })
                }}
            >
                Popup
            </p>
            <p>
                <a className="cursor-pointer transition hover:text-green-500" href="https://leetcode.cn/studyplan/top-100-liked/">
                    LeetCode Hot 100
                </a>
            </p>
        </div>
    )
}
export default ControlPanel
