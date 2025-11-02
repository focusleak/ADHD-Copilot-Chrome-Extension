// 打开小红书视频时自动播放
waitForElement('video').then((video) => {
    video.addEventListener(
        'play',
        () => {
            document
                .querySelector('.xgplayer-volume .xgplayer-icon-large')
                .click()
        },
        {
            once: true,
        }
    )
})
