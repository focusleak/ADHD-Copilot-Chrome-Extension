import React from 'react'

// 按时间显示不同的导航
const Favorites = () => {
    let list = [
        {
            name: 'ChatGPT',
            url: 'https://chat.openai.com/chat',
            icon: 'https://cdn.oaistatic.com/assets/favicon-l4nq08hd.svg',
        },
        {
            name: 'Gemini',
            url: 'https://gemini.google.com/app',
            icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg',
        },
        {
            name: 'Github',
            url: 'https://github.com/',
            icon: 'https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg',
        },
        {
            name: 'LeetCode',
            url: 'https://leetcode.cn/',
            icon: 'https://leetcode.cn/favicon.ico',
        },
        {
            name: 'Youtube',
            url: 'https://www.youtube.com/',
            icon: 'https://www.youtube.com/s/desktop/2aa21710/img/favicon_144x144.png',
        },
        {
            name: 'MDN',
            url: 'https://developer.mozilla.org/zh-CN/',
            icon: 'https://developer.mozilla.org/favicon.svg',
        },
        {
            name: 'Webpack',
            url: 'https://webpack.js.org/',
            icon: 'https://webpack.js.org/icon_512x512.png',
        },
        {
            name: 'tailwindcss',
            url: 'https://tailwindcss.com/',
            icon: 'https://tailwindcss.com/favicons/favicon-32x32.png?v=4',
        },
        {
            name: 'React',
            url: 'https://react.dev/',
            icon: 'https://react.dev/favicon.ico',
        },
        {
            name: 'Vue',
            url: 'https://vuejs.org/',
            icon: 'https://vuejs.org/images/logo.png',
        },
        {
            name: 'Vite',
            url: 'https://vitejs.dev/',
            icon: 'https://vitejs.dev/logo.svg',
        },
        {
            name: 'Svelte',
            url: 'https://svelte.dev/',
            icon: 'https://svelte.dev/favicon.png',
        },
        {
            name: 'Solid.js',
            url: 'https://www.solidjs.com/',
            icon: 'https://www.solidjs.com/img/favicons/favicon-32x32.png',
        },
        {
            name: 'Prettier',
            url: 'https://prettier.io/',
            icon: 'https://prettier.io/icon.png',
        },
    ]
    return (
        <div className="mt-4">
            <div className="mx-auto my-0 flex w-[800px] flex-wrap">
                {list.map((item) => {
                    return (
                        <a
                            href={item.url}
                            target="_self"
                            key={item.name}
                            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-sm hover:bg-[#E8E8E9]"
                        >
                            <img src={item.icon} width={32} height={32} />
                            <span className="mt-2">{item.name}</span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
export default Favorites
