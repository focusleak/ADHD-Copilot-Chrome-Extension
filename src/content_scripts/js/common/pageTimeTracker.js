// {
//             "js": [
//                 "src/content_scripts/js/workTimeGuard.js",
//                 "src/content_scripts/js/pageTimeTracker.js"
//             ],
//             "css": [],
//             "matches": [
//                 "https://*.douyin.com/*",
//                 "https://*.v2ex.com/*",
//                 "https://*.weibo.com/*",
//                 "https://*.zhihu.com/*",
//                 "https://*.jd.com/*",
//                 "https://tieba.baidu.com/*"
//             ]
//         },
;(function () {
    const timeTracker = {
        time: 0,
        accu: 0,
        start() {
            this.time = new Date()
            this.accu = 0
        },
        pause() {
            this.accu += new Date() - this.time
        },
        resume() {
            this.time = new Date()
        },
        stop() {
            return this.accu + (new Date() - this.time)
        },
    }

    let site = location.host.split('.').at(-2)

    const KEY_TIME_SPENT = 'time_spent_on_' + site
    const KEY_VISIT_TIMES = 'visit_times_on_' + site

    // 统计页面浏览次数
    let date = new Date()
    let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    // 获取上次离开时间
    // 小于一定时间则不增加访问次数
    let visitTimes = JSON.parse(
        localStorage.getItem('_adhd_helper_page_visit_times') || '{}'
    )
    visitTimes[today] = visitTimes[today] ? visitTimes[today] + 1 : 1
    // console.log(`This page has been visited ${visitTimes[today]} times today.`)
    localStorage.setItem(
        '_adhd_helper_page_visit_times',
        JSON.stringify(visitTimes)
    )

    // 统计页面停留时间
    // let timeSpent = JSON.parse(
    //     localStorage.getItem('_adhd_helper_page_time_spent') || '[]'
    // )
    // console.log('======Time spent on this page======')
    // for (let date in timeSpent) {
    //     let x = (timeSpent[date] || []).reduce((a, b) => a + b, 0)
    //     let minute = Math.floor(x / 1000 / 60)
    //     let second = Math.floor((x / 1000) % 60)
    //     console.log(`${date}: ${minute} minutes ${second} second.`)
    // }

    // 统计今日页面停留时间
    // let x = (timeSpent[today] || []).reduce((a, b) => a + b, 0)
    // let minute = Math.floor(x / 1000 / 60)
    // let second = Math.floor((x / 1000) % 60)
    // console.log(
    //     `Time spent on this page today: ${minute} minutes ${second} second.`
    // )

    timeTracker.start()
    // 页面关闭
    window.addEventListener('beforeunload', () => {
        let timeSpent = JSON.parse(
            localStorage.getItem('_adhd_helper_page_time_spent') || '{}'
        )
        let x = timeTracker.stop()
        timeSpent[today] = timeSpent[today] ? timeSpent[today] : []
        timeSpent[today].push(x)
        localStorage.setItem(
            '_adhd_helper_page_time_spent',
            JSON.stringify(timeSpent)
        )
    })
    // 页面激活
    window.addEventListener('focus', () => {
        timeTracker.resume()
    })
    // 页面失焦
    window.addEventListener('blur', () => {
        timeTracker.pause()
    })
    // // 滚动
    // window.addEventListener('scroll', () => {
    //     // console.log('Page is scrolling.')
    // })
    // // 点击
    // window.addEventListener('click', () => {
    //     console.log('Page is clicked.')
    // })
    // // 右键
    // window.addEventListener('contextmenu', () => {
    //     console.log('Right click.')
    // })
    // // 键盘输入
    // window.addEventListener('keydown', () => {
    //     console.log('Key is pressed.')
    // })
})()
