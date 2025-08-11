// 打开小红书视频时自动播放
waitForElement('.xgplayer-start').then((startButton) => {
    startButton.addEventListener('click', () => {
        document.querySelector('.xgplayer-volume .xgplayer-icon-large').click();
        console.log('start')
    }, {
        once: true
    })
})