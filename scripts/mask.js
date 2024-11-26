(function () {
    const LEISURE_MINUTES = 5; // 休息时间，单位为分钟
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
        closeAfter(count, handleTick, beforeClose) {
            this.count = count;
            handleTick();
            this.interval = setInterval(() => {
                this.count--;
                handleTick();
                if (this.count <= 0) {
                    clearInterval(this.interval);
                    beforeClose && beforeClose();
                    console.log('关闭页面');
                    window.close();
                }
            }, 1000);
        }
        cancelClose() {
            // 记录并存储当前时间
            let lastLeisureTime = new Date();
            chrome.storage.local.set({ lastLeisureTime: lastLeisureTime.toJSON() });
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    if (isWorkingHours()) {
        // 获取存储的时间
        chrome.storage.local.get(['lastLeisureTime'], (result) => {
            if (result.lastLeisureTime) {
                let lastLeisureTime = new Date(result.lastLeisureTime);
                console.log(lastLeisureTime);
                let now = new Date();
                let diff = now - lastLeisureTime;
                // 小于10分钟，则不显示遮罩
                if (diff < 1000 * 60 * LEISURE_MINUTES) {
                    console.log(`距离上次允许摸鱼时间小于${LEISURE_MINUTES}分钟，不显示遮罩`);
                    return;
                }
            }
            let tabManager = new TabManager();
            const pageMask = document.createElement('div');
            pageMask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><br />';
            setMaskStyle(pageMask);

            const closeTips = document.createElement('p');
            tabManager.closeAfter(3, () => {
                closeTips.innerHTML = `This page will be closed in ${tabManager.count} seconds.`;
            });

            // 摸鱼按钮
            const visitButton = document.createElement('a');
            visitButton.href = 'javascript:void(0)';
            visitButton.innerHTML = '我想摸会儿鱼';
            visitButton.addEventListener('click', () => {
                tabManager.cancelClose();
                pageMask.remove();
            });

            pageMask.appendChild(closeTips);
            pageMask.appendChild(visitButton);

            // 添加遮罩到页面
            document.body.appendChild(pageMask);
        })
    } else {
        console.log('非工作时间，尽情摸鱼吧！');
    }
})()