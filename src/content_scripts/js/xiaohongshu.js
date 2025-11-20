// 打开小红书视频时自动播放
import { waitForElement } from '@/lib/utils'
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
