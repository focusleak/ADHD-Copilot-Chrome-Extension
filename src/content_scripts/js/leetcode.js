// url跳转

directJump('/link/?target=', 'target')

// 自动开始计时
// document.querySelector('[role=popover] svg.fa-play').parentElement.parentElement.parentElement.click()

// 判断元素是否被遮挡
function isUnobstructed(element) {
    const rect = element.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const topEl = document.elementFromPoint(x, y)
    return element === topEl || element.contains(topEl)
}
function getStatus(container) {
    let playButton = container.querySelector('svg.fa-play')
    if (playButton && isUnobstructed(playButton)) {
        return ['paused', playButton]
    }
    let startButton = container.querySelector('svg.fa-stopwatch')
    if (startButton && isUnobstructed(startButton)) {
        return ['init', startButton]
    }
    let pauseButton = container.querySelector('svg.fa-pause')
    if (pauseButton && isUnobstructed(pauseButton)) {
        return ['running', pauseButton]
    }
}

if (isUrlIncluded('https://leetcode.cn/problems')) {
    // 题目页面
    // document.querySelector('.monaco-editor').classList.contains('focused')
    waitForElement('.relative.flex.flex-1.items-center.justify-end').then(
        (container) => {
            let [status, button] = getStatus(container)
            if (status === 'init') {
                // 初始状态，自动开始计时
                button.parentElement.parentElement.click()
                waitForElement('[role=popover] svg.fa-play').then((element) => {
                    let startButton =
                        element.parentElement.parentElement.parentElement
                    startButton.click()
                    toast('已自动开始计时')
                })
            } else if (status === 'running') {
                // // 已经在计时了，提示正在计时即可
                toast('正在计时')
            } else if (status === 'paused') {
                // 暂停中，提示恢复计时
                toast('已暂停，请恢复计时')
            }

            // window.addEventListener('blur', () => {
            //     // 短暂离开不暂停
            //     // 暂停计时
            //     toast('已暂停计时');
            //     document.querySelector('svg.fa-pause').parentElement.parentElement.click()
            // });
            // window.addEventListener('focus', () => {
            //     // 恢复计时
            //     fa-play
            //     startButton.click()
            //     // toast('已自动开始计时');
            // });
        }
    )
}
console.log('test')
// 判断今天是否已经解答
waitForElement('h3.text-lg.font-medium', {
    test: (element) => {
        console.log('test')
        return element.innerHTML.includes('恭喜完成今日打卡任务')
    },
}).then(() => {
    console.log('today target done')
    Storage.set('LeetCode', true)
    toast('已完成今日打卡任务')
})
