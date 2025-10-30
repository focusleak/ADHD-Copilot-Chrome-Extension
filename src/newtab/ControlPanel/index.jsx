import React from 'react'

const ControlPanel = () => {
    return (
        <div className='absolute right-8 top-4 text-right'>
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
            <p className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: 'chrome://extensions/' })
                }}>
                扩展程序
            </p>
            <p className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: './options.html' })
                }}>
                设置
            </p>
            <p className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: './popup.html' })
                }}>
                Popup
            </p>
        </div>
    )
}
export default ControlPanel
