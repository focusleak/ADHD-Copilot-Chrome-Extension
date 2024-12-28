(async function () {
    const LEISURE_MINUTES = 5; // 休息时间，单位为分钟
    // 检测当前时间是否为工作时间
    function isInWorkTime(begin = 8, end = 22) { // 开发阶段，暂时先设定为8点到22点
        const now = new Date();
        const hour = now.getHours();
        return hour >= begin && hour < end;
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
                    window.open("about:blank", "_self");// 打开空白页代替关闭标签页，window.close有时不生效
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

    class PageMask {
        constructor(text) {
            this.mask = document.createElement('div');
            this.mask.innerHTML = '<p>WARNING: Working Time.<br /> Please do not use this website during working hours.</p><br /><br />';
            this.setMaskStyle(this.mask);
            this.closeTips = document.createElement('p');

            // 摸鱼按钮
            const visitButton = document.createElement('span');
            visitButton.innerHTML = 'continue visit';
            visitButton.style.cursor = 'pointer';
            this.visitButton = visitButton;

            this.mask.appendChild(this.closeTips);
            this.mask.appendChild(document.createElement('br'));
            this.mask.appendChild(document.createElement('br'));
            this.mask.appendChild(visitButton);
            // 添加遮罩到页面
            document.body.appendChild(this.mask);
            this.timeoutId = null;
        }
        setButtonEvent(tabManager) {
            this.visitButton.addEventListener('click', (e) => {
                tabManager.cancelClose();
                this.mask.remove();
                // 开始计时，5分钟后再次提示 - 改为sessionStorage存储的方案，每分钟检查
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    document.body.appendChild(this.mask);
                    tabManager.closeAfter(5, {
                        handleTick: () => {
                            this.setCloseTips(`This page will be closed in ${tabManager.count} seconds.`);
                        }
                    });
                }, 1000 * 60 * 5);
            });
        }
        setMaskStyle(mask) {
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
        setCloseTips(tips) {
            this.closeTips.innerHTML = tips;
        }
        remove() {
            this.mask.remove();
        }
        setCloseTipsColor(color) {
            this.closeTips.style.color = color;
        }
    }

    if (isInWorkTime()) {
        // 获取存储的时间
        let { lastLeisureTime } = await getChromeStorage('lastLeisureTime');
        if (lastLeisureTime) {
            let before = new Date(lastLeisureTime);
            let now = new Date();
            let diff = now - before;
            // 小于10分钟，则不显示遮罩
            if (diff < 1000 * 60 * LEISURE_MINUTES) {
                console.log(`距离上次允许使用时间小于${LEISURE_MINUTES}分钟，不显示遮罩`);
                console.log(`剩余${LEISURE_MINUTES * 60 - Math.floor(diff / 1000)}秒可浏览`);
                // 开启定时
                setTimeout(() => {
                    main();
                }, LEISURE_MINUTES * 60 * 1000 - diff);
            } else {
                main();
            }
        } else {
            main();
        }
        function main() {
            let tabManager = new TabManager();
            let pageMask = new PageMask();
            tabManager.closeAfter(5, {
                handleTick: () => {
                    pageMask.setCloseTips(`This page will be closed in ${tabManager.count} seconds.`)
                },
                afterClose: () => {
                    console.log('关闭页面失败');
                    pageMask.setCloseTips('Failed to auto close the page, please close it manually.');
                    pageMask.setCloseTipsColor('red');
                }
            });
            pageMask.setButtonEvent(tabManager);
        }

        // 清空页面内容
        // document.body.innerHTML = '';

    } else {
        console.log('非工作时间，尽情摸鱼吧！');
    }
})()