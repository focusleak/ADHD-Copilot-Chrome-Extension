# 浏览器插件

<https://developer.chrome.com/docs/extensions/get-started?hl=zh-cn>

<chrome://extensions/>

## 项目搭建

1. content_script通常是注入到其他网页，因此不需要使用UI框架
2. 其他插件页面的开发可以使用React shadcn/ui tailwindcss 等现代前端开发技术来提高开发效率，因而需要Webpack等构建工具
3. 由于浏览器插件运行在现代浏览器中，因此不需要使用Babel转换，也不需要core-js

```bash
pnpm install webpack webpack-cli webpack-dev-server --save-dev
pnpm install babel-loader @babel/core @babel/preset-env @babel/preset-react css-loader style-loader postcss postcss-loader sass sass-loader astroturf tailwindcss @tailwindcss/postcss html-webpack-plugin --save-dev
pnpm install core-js
pnpm install prettier prettier-plugin-tailwindcss --save-dev
pnpm add react react-dom @types/react @types/react-dom classnames
```

## 配置webpack - webpack.config.js

## 配置tailwindcss - tailwind.config.js

## 配置shadcn/ui

<https://ui.shadcn.com/docs/installation/manual>

```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

jsconfig.json

```JavaScript
{
    "type": "setting",
    "settings": {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": [
                    "src/*"
                ]
            },
            "jsx": "react-jsx"
        }
    }
}
```

globals.css

```css

``

src/lib/utils.js
```JavaScript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

components.json

```JSON
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## 配置eslint - eslint.config.mjs

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
