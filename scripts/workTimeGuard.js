(function () {
    const LEISURE_MINUTES = 5; // 休息时间，单位为分钟
    // 检测当前时间是否为工作时间
    function isInWorkTime(begin = 8, end = 23) { // 开发阶段，暂时先设定为8点到23点
        const now = new Date();
        const hour = now.getHours();
        return hour >= begin && hour < end;
    }

    function setMaskStyle(mask) {
        mask.style.color = '#fff';
        mask.style.fontSize = '24px';
        mask.style.fontWeight = 'bold';
        mask.style.textAlign = 'center';
        mask.style.alignContent = 'center';
        // mask.style.paddingTop = '20%';
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
        closeAfter(count, { handleTick, beforeClose, afterClose } = {}) {
            this.count = count;
            handleTick && handleTick();
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.count--;
                handleTick && handleTick();
                if (this.count <= 0) {
                    clearInterval(this.interval);
                    beforeClose && beforeClose();
                    afterClose && afterClose();
                    window.close();
                    history.back();// 关闭有时候不成功，返回上一个页面
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

    if (isInWorkTime()) {
        // 获取存储的时间
        chrome.storage.local.get(['lastLeisureTime'], ({ lastLeisureTime }) => {
            if (lastLeisureTime) {
                let before = new Date(lastLeisureTime);
                console.log(before);
                let now = new Date();
                let diff = now - before;
                // 小于10分钟，则不显示遮罩
                if (diff < 1000 * 60 * LEISURE_MINUTES) {
                    console.log(`距离上次允许使用时间小于${LEISURE_MINUTES}分钟，不显示遮罩`);
                    return;
                }
            }
            let tabManager = new TabManager();
            const pageMask = document.createElement('div');
            pageMask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><br />';
            setMaskStyle(pageMask);

            const closeTips = document.createElement('p');
            tabManager.closeAfter(5, {
                handleTick: () => {
                    closeTips.innerHTML = `This page will be closed in ${tabManager.count} seconds.`;
                },
                afterClose: () => {
                    console.log('关闭页面失败');
                    closeTips.innerHTML = 'Failed to auto close the page, please close it manually.';
                    closeTips.style.color = 'red';
                }
            });

            // 摸鱼按钮
            const visitButton = document.createElement('span');
            visitButton.innerHTML = 'continue visit';
            visitButton.style.cursor = 'pointer';
            let timeoutId = null;
            visitButton.addEventListener('click', () => {
                tabManager.cancelClose();
                pageMask.remove();
                // 开始计时，5分钟后再次提示 - 改为sessionStorage存储的方案，每分钟检查
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    document.body.appendChild(pageMask);
                    tabManager.closeAfter(5, {
                        handleTick: () => {
                            closeTips.innerHTML = `This page will be closed in ${tabManager.count} seconds.`;
                        }
                    });
                }, 1000 * 60 * 5);
            });

            pageMask.appendChild(closeTips);
            pageMask.appendChild(document.createElement('br'));
            pageMask.appendChild(document.createElement('br'));
            pageMask.appendChild(visitButton);

            // 添加遮罩到页面
            document.body.appendChild(pageMask);
        })
    } else {
        console.log('非工作时间，尽情摸鱼吧！');
    }
})()