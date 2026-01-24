# ADHD-Copilot-Chrome-Extension

[Chrome Extensions 开发文档](https://developer.chrome.com/docs/extensions/get-started?hl=zh-cn)

## 项目搭建

1. `content_script`通常是注入到其他网页，直接使用原生js开发
2. 插件页面的开发使用`React` `shadcn/ui` `tailwindcss` 等现代前端技术来提高开发效率，需要`Webpack`等构建工具
3. 由于浏览器插件运行在现代浏览器中，因此不需要使用`Babel`转换，也不需要`core-js`，但出于学习`Webpack`的目的，本项目依然引入
4. 使用`pnpm`管理依赖
5. 配置webpack - `webpack.config.js`
6. 配置tailwindcss - `tailwind.config.js`
7. [配置shadcn/ui](https://ui.shadcn.com/docs/installation/manual) - `components.json` `jsconfig.json` `globals.css` `utils.js`
8. 配置eslint - `eslint.config.mjs`
9. 配置prettier - `.prettierrc`
10. 项目使用 `组件 components --> 应用 applications --> 页面 pages` 三级逻辑结构组织

```bash
pnpm add webpack webpack-cli webpack-dev-server webpack-dev-middleware --save-dev
pnpm add html-webpack-plugin copy-webpack-plugin --save-dev
pnpm add babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
pnpm add css-loader style-loader postcss postcss-loader sass sass-loader tailwindcss @tailwindcss/postcss --save-dev
pnpm add prettier prettier-plugin-tailwindcss --save-dev
pnpm add react react-dom @types/react @types/react-dom
pnpm add core-js chrome-types 
pnpm add clipboard crypto-js date-fns immer mathjs zustand
pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
pnpm add debug
```

## Features

* 隐藏可能影响注意力的页面元素
* 屏蔽主流网站上的推荐/热搜/热榜等内容
* 优化部分网页打印样式
* `workTimeGuard` 针对指定网站，工作时间遮罩提示不要打开，有允许访问按钮 √
* `pageTimeTracker` -  统计浏览时长和次数，并可以查看 - TODO 不要用localStorage存储数据
* 自由编辑页面 - 加开关 `contenteditable="true"`
* 添加自定义屏蔽词
* 网页标注

## TODO

* 休息提醒
* 网页访问标记
* 结点截屏/收藏HTML
* 资源嗅探，直链增加下载按钮：mp3 jpg pdf等
* 文字快速收藏 - 选中+快捷键(ctrl+c) - 采集侧边栏 - 支持导出 - 支持markdown语法
* 去掉网站的页面跳转提示，直接跳转 <https://github.com/OldPanda/Open-the-F-king-URL-Right-Now>
* 解除复制限制，去掉复制增加文本
* 页面跳转统计
* 收藏管理

## 项目结构

```tree
ADHD-Copilot-Chrome-Extension/
├── dist/                   # 构建输出目录
├── node_modules/           # 依赖包
├── src/
│   ├── api/                # api
│   │   └── request.js      # xxx
│   ├── applications/       # 应用
│   ├── backgroundServices/ # chrome插件 后台服务
│   ├── components/
│   │   └── ui/             # shadcn/ui 组件
│   ├── content_scripts/    # chrome插件 内容脚本
│   ├── data/               # 静态数据
│   ├── hooks/              # 自定义 hooks
│   ├── lib/                # 工具库
│   │   └── utils.js        # 工具函数（如 cn 函数）
│   ├── styles/
│   │   └── globals.css     # 全局样式文件，Tailwind CSS 在此文件中定义
│   │── pages/              # chrome插件 页面
│   └── manifest.json       # chrome插件 配置文件
├── .gitignore              # Git 忽略文件
├── .prettierrc             # Prettier 配置文件
├── components.json         # shadcn/ui 配置文件
├── eslint.config.mjs       # ESLint 配置文件
├── jsconfig.json           # JavaScript 配置文件，shadcn/ui依赖此文件
├── package.json            # 项目配置和依赖
├── pnpm-lock.yaml          # pnpm 锁定文件
├── postcss.config.js       # postcss CSS 配置文件，Tailwind CSS 在此文件中配置
├── webpack.config.js       # Webpack 配置文件
└── README.md               # 项目说明文档
```
