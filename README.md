#

<https://developer.chrome.com/docs/extensions/get-started?hl=zh-cn>

<chrome://extensions/>

## 安装依赖

```bash
pnpm install webpack webpack-cli webpack-dev-server --save-dev
pnpm install babel-loader @babel/core @babel/preset-env @babel/preset-react css-loader style-loader postcss postcss-loader sass sass-loader astroturf tailwindcss @tailwindcss/postcss html-webpack-plugin --save-dev
pnpm install core-js
pnpm install prettier prettier-plugin-tailwindcss --save-dev
pnpm add react react-dom @types/react @types/react-dom classnames
```

## Features

* 简单的去广告功能
* 屏蔽网站上的推荐/热搜/热榜等内容
* `workTimeGuard` 针对指定网站，工作时间遮罩提示不要打开，有允许访问按钮 √
* `pageTimeTracker` -  统计浏览时长和次数，并可以查看 - TODO 不要用localStorage存储数据
* 自由编辑页面 - 加开关 `contenteditable="true"`
* 部分网页打印样式重定义

## TODO

* 网页已读标记
* 结点截屏/收藏HTML
* 多端同步
* 资源嗅探，直链增加下载按钮：mp3 jpg pdf等
* 文字快速收藏 - 选中+快捷键(ctrl+c) - 采集侧边栏 - 支持导出 - 支持markdown语法
* 去掉网站的页面跳转提示，直接跳转 <https://github.com/OldPanda/Open-the-F-king-URL-Right-Now>
* 解除复制限制，去掉复制增加文本
* 添加自定义屏蔽词
* 页面跳转统计
* 收藏管理
* 键盘/鼠标/手柄/屏幕/网络检测
* 在线标注
