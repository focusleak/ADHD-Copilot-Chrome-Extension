// url跳转

directJump('/link/?target=', 'target')

// 自动开始计时
// document.querySelector('[role=popover] svg.fa-play').parentElement.parentElement.parentElement.click()


if (isUrlIncluded('https://leetcode.cn/problems')) {
    // 
    // 判断当前计时状态
    // 感知当前是 准备做题 or 看题解
    waitForElement('svg.fa-stopwatch').then((element) => {
        element.parentElement.parentElement.click();
        return waitForElement('[role=popover] svg.fa-play');
    }).then((element) => {
        element.parentElement.parentElement.parentElement.click();
        toast('已自动开始计时');
    })
}