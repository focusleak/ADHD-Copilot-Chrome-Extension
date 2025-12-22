
const ControlPanel = ({ className }) => {
    return (
        <div className={className}>
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
            <p
                className="cursor-pointer transition hover:text-green-500"
                onClick={() => {
                    chrome.tabs.create({ url: './applications.html' })
                }}
            >
                Applications
            </p>
            <p>
                <a
                    className="cursor-pointer transition hover:text-green-500"
                    href="https://leetcode.cn/studyplan/top-100-liked/"
                >
                    LeetCode Hot 100
                </a>
            </p>
            <p>
                <a
                    className="cursor-pointer transition hover:text-green-500"
                    href="https://developer.chrome.com/docs/extensions/get-started?hl=zh-cn"
                >
                    Chrome Extensions - Get started
                </a>
            </p>
        </div>
    )
}

export default ControlPanel
