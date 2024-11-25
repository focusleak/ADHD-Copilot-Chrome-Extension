// 检测当前时间是否为工作时间
function isWorkingHours(begin = 8, end = 21) {
    const now = new Date();
    const hour = now.getHours();
    return hour >= begin && hour < end;
}

function setMaskStyle(mask) {
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
}

function closeTab(count = 10) {
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
        interval = closeTab();

        const mask = document.createElement('div');
        mask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><br />';
        setMaskStyle(mask);

        // 关闭按钮
        const close = document.createElement('a');
        close.href = 'javascript:void(0)';
        close.innerHTML = 'Close this page now';
        close.addEventListener('click', () => {
            window.close();
        });

        // 摸鱼按钮
        const visit = document.createElement('a');
        visit.href = 'javascript:void(0)';
        visit.innerHTML = '摸会儿鱼';
        visit.addEventListener('click', () => {
            clearInterval(interval);
            mask.remove();
        });

        mask.appendChild(close);
        mask.appendChild(visit);

        // 添加遮罩到页面
        document.body.appendChild(mask);
    }
})()