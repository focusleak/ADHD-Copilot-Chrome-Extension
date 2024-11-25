// 检测当前时间是否为工作时间
function isWorkingHours(begin = 8, end = 23) { // 开发阶段，暂时先设定为8点到23点
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

class TabManager {
    constructor() {
        this.interval = null;
    }
    closeAfter(count, handle) {
        this.count = count;

        handle();
        this.interval = setInterval(() => {
            this.count--;
            handle();
            if (this.count <= 0) {
                clearInterval(this.interval);
                console.log(this.interval)
                console.log('关闭页面');
                window.close();
            }
        }, 1000);
    }
    cancelClose() {
        clearInterval(this.interval);
        this.interval = null;
    }
}

(function () {
    if (isWorkingHours()) {
        let tabManager = new TabManager();


        const pageMask = document.createElement('div');
        pageMask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><br />';
        setMaskStyle(pageMask);

        const closeTips = document.createElement('p');
        tabManager.closeAfter(3, () => {
            closeTips.innerHTML = `This page will be closed in ${tabManager.count} seconds.`;
        });

        // 关闭按钮
        const closeButton = document.createElement('a');
        closeButton.href = 'javascript:void(0)';
        closeButton.innerHTML = 'Close this page now';
        closeButton.addEventListener('click', () => {
            window.close();
        });

        // 摸鱼按钮
        const visitButton = document.createElement('a');
        visitButton.href = 'javascript:void(0)';
        visitButton.innerHTML = '摸会儿鱼';
        visitButton.addEventListener('click', () => {
            tabManager.cancelClose();
            pageMask.remove();
        });

        // ESC 开始摸鱼
        window.onkeyup = (e) => {
            if (e.keyCode === 27) {
                tabManager.cancelClose();
                pageMask.remove();
            }
        }

        pageMask.appendChild(closeTips);
        pageMask.appendChild(closeButton);
        pageMask.appendChild(visitButton);

        // 添加遮罩到页面
        document.body.appendChild(pageMask);
    } else {
        console.log('非工作时间，尽情摸鱼吧！');
    }
})()