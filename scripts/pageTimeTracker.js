(function () {
    // 统计页面浏览次数和时间
    let visitTimes = parseInt(localStorage.getItem('_adhd_helper_page_visit_times'));
    visitTimes = visitTimes ? visitTimes + 1 : 1;
    console.log(`This page has been visited ${visitTimes} times.`)
    localStorage.setItem('_adhd_helper_page_visit_times', visitTimes);
    console.log(JSON.parse(localStorage.getItem('_adhd_helper_page_time_spent') || '[]'));


    let startTime = new Date();
    let accumulatedTime = 0;
    window.addEventListener('beforeunload', () => {
        let timeSpent = JSON.parse(localStorage.getItem('_adhd_helper_page_time_spent') || '[]');
        timeSpent.push(Math.round((accumulatedTime + new Date() - startTime) / 1000 / 60, 2));
        localStorage.setItem('_adhd_helper_page_time_spent', JSON.stringify(timeSpent));
    })
    // 页面激活
    window.addEventListener('focus', () => {
        console.log('Page is active.')
        console.log(accumulatedTime)
        startTime = new Date();// 重新开始计时
    })
    // 页面失焦
    window.addEventListener('blur', () => {
        console.log('Page is inactive.')
        accumulatedTime += new Date() - startTime; // 停止计时
        console.log(accumulatedTime)
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