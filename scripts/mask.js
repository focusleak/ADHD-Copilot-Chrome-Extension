// 检测当前时间是否为工作时间
function isWorkingHours(begin = 8, end = 21) {
    const now = new Date();
    const hour = now.getHours();
    return hour >= begin && hour < end;
}

function closeTab(count = 3) {
    // 倒计时关闭标签页
    const interval = setInterval(() => {
        count--;
        if (count <= 0) {
            clearInterval(interval);
            window.close();
        }
    }, 1000);
    return interval;
}

(function () {
    let interval;
    if (isWorkingHours()) {
        const mask = document.createElement('div');
        mask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><a>Visit anyway.</a><a>Close this page now.<a/>';
        mask.style.color = '#fff';
        mask.style.fontSize = '24px';
        mask.style.fontWeight = 'bold';
        mask.style.textAlign = 'center';
        mask.style.paddingTop = '20%';
        mask.style.position = 'fixed';
        mask.style.top = '0';
        mask.style.bottom = '0';
        mask.style.left = '0';
        mask.style.right = '0';
        mask.style.width = '100%';
        mask.style.height = '100%';
        mask.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        mask.style.zIndex = '99999999';
        document.body.appendChild(mask);
        // 关闭标签页
        interval = closeTab();
    }

})()