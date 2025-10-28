(async function () {

    const IS_ENABLE = false; // 是否启用
    const LEISURE_MINUTES = 5; // 休息时间，单位为分钟
    // 检测当前时间是否为工作时间
    function isInWorkTime(begin = 8, end = 22) { // 开发阶段，暂时先设定为8点到22点
        const now = new Date();
        const day = now.getDay();
        if (day === 0 || day === 6) {
            return false;
        }
        const hour = now.getHours();
        return hour >= begin && hour < end;
    }

    const MESSAGE = 'continue_visit'
    const bc = new BroadcastChannel('workTimeGuard');

    class TabManager {
        constructor(pageMask) {
            this.pageMask = pageMask;
            this.interval = null;
        }
        closeAfter(count, { handleTick, beforeClose, afterClose } = {}) {
            this.count = count;
            handleTick && handleTick();
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.count--;
                handleTick?.();
                if (this.count <= 0) {
                    beforeClose?.();
                    clearInterval(this.interval);
                    afterClose?.();
                    window.open("about:blank", "_self");// 打开空白页代替关闭标签页，window.close有时不生效
                }
            }, 1000);
        }
        cancelClose() {
            // 记录并存储当前时间
            let lastLeisureTime = new Date();
            Storage.set('lastLeisureTime', lastLeisureTime.toJSON());
            bc.postMessage(MESSAGE);
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    class PageMask {
        static tips = ['不幸的是，指针一直在转，', '时间在流失，过去在增加，未来在减少', '可能性变小，遗憾也在增加。', '你明白吗？']
        constructor() {
            this.mask = document.createElement('div');
            this.mask.innerHTML = `<p>${PageMask.tips.join('<br />')}<br /><br />`;
            this.setMaskStyle(this.mask);
            this.closeTips = document.createElement('p');

            // 摸鱼按钮
            const visitButton = document.createElement('span');
            // visitButton.innerHTML = 'continue visit';
            visitButton.innerHTML = '继续忽略';
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
                this.remove();
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

    if (IS_ENABLE && isInWorkTime()) {
        // 获取存储的时间
        let lastLeisureTime = await Storage.get('lastLeisureTime');
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
            let pageMask = new PageMask();
            let tabManager = new TabManager(pageMask);
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

            bc.addEventListener('message', function (e) {
                if (e.data === MESSAGE) {
                    tabManager.cancelClose();
                    pageMask.remove();
                }
            });
        }

        // 清空页面内容
        // document.body.innerHTML = '';

    } else {
        console.log('非工作时间，尽情摸鱼吧！');
    }
})()