(function () {
    // 统计页面浏览次数
    let date = new Date();
    let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // 获取上次离开时间
    // 小于一定时间则不增加访问次数
    let visitTimes = JSON.parse(localStorage.getItem('_adhd_helper_page_visit_times') || '{}');
    visitTimes[today] = visitTimes[today] ? visitTimes[today] + 1 : 1;
    console.log(`This page has been visited ${visitTimes[today]} times today.`)
    localStorage.setItem('_adhd_helper_page_visit_times', JSON.stringify(visitTimes));

    // 统计页面停留时间
    let timeSpent = JSON.parse(localStorage.getItem('_adhd_helper_page_time_spent') || '[]');
    let x = (timeSpent[today] || []).reduce((a, b) => a + b, 0);
    let minute = Math.floor(x / 1000 / 60);
    let second = Math.floor((x / 1000) % 60);
    console.log(`Time spent on this page today: ${minute} minutes ${second} second.`)


    let startTime = new Date();
    let accumulatedMS = 0;
    // 页面关闭
    window.addEventListener('beforeunload', () => {
        let timeSpent = JSON.parse(localStorage.getItem('_adhd_helper_page_time_spent') || '{}');
        let x = accumulatedMS + (new Date() - startTime);
        timeSpent[today] = timeSpent[today] ? timeSpent[today] : [];
        timeSpent[today].push(x);
        localStorage.setItem('_adhd_helper_page_time_spent', JSON.stringify(timeSpent));
    })
    // 页面激活
    window.addEventListener('focus', () => {
        startTime = new Date();// 重新开始计时
    })
    // 页面失焦
    window.addEventListener('blur', () => {
        accumulatedMS += new Date() - startTime; // 停止计时
        // let x = Math.floor((accumulatedMS + (new Date() - startTime)) / 1000);
        // let minute = Math.floor(x / 60);
        // let second = x % 60;
        // console.log(`Time spent on this page: ${minute} minutes ${second} second.`)
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
})();