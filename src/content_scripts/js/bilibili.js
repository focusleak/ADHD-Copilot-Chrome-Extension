// 关闭搜索框placeholder
waitForElement('.nav-search-input').then(removePlaceholder);

// 自动关闭弹幕
(function () {
    waitForElement('.bui-danmaku-switch-input').then((checkbox) => {
        if (checkbox.checked) {
            checkbox.click();
        }
    })
})();

// 增加更多倍速选项
(function () {
    // 仅播放页需要 https://www.bilibili.com/video/
    if (!location.href.includes('www.bilibili.com/video/' || 
        !location.href.includes('www.bilibili.com/list/watchlater')
    )) return;
    function createItem(value) {
        const item = document.createElement('li');
        item.className = 'bpx-player-ctrl-playbackrate-menu-item';
        item.dataset.value = value;
        item.innerHTML = value + 'x';
        return item;
    }
    waitForElement('.bpx-player-ctrl-playbackrate-menu').then((menu) => {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(createItem('3.0'));
        fragment.appendChild(createItem('2.5'));
        menu.insertBefore(fragment, menu.firstElementChild);
        menu.appendChild(createItem('0.25'));
    })
})();

// 所有tab页间通信
// 统计总播放时长
// 统计总播放次数
// 所有页面只能有一个视频在播放，新开的视频开始播放，则自动关闭其他在播放的视频，支持关闭该功能


// 在右侧增加下载视频功能


// 阻止多个视频同时播放
(function () {
    const MESSAGE = 'bilibili-player-video-start'
    // 监测视频是否开始播放
    waitForElement('#bilibili-player video').then(player => {
        player.addEventListener('play', () => {
            bc.postMessage(MESSAGE);
        });
        const bc = new BroadcastChannel('bilibili');
        bc.addEventListener('message', function (e) {
            if (e.data === MESSAGE) {
                player.pause();
            }
        });
    })
})();