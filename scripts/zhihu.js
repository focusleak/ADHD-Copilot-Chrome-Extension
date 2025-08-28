const BLOCK_WORDS = [
    "女", "男", "少妇",
    "诬告", "武大", "武汉大学", "肖同学", "女权", "好东西", "剖腹产", "樱花妹", "搭讪",
    "颜宁", "丁真", "江歌", "主理人", "尊界", "陈赫", "妻子", "丈夫",
    "时代少年团", "拳师", "打拳", "傅首尔", "张桂梅", "沈腾", "马丽", "亮亮丽君",
    "杨景媛", "张薇", "户晨风", "汪小菲", "罗永浩", "柯洁", "战鹰", "陈奕迅", "杨玉环", "张碧晨", "非处",
    "华为", "问界", "鸿蒙", "SU7", "su7", "小米", "雷军", "余承东", "雷总", "TFBOYS",
    "脱口秀", "辱华", "浪浪山小妖怪", "反诈老陈", "陈震", "老实人", "卖淫",
    "护肤", "中医",
    "MBTI", "INTP", 'intp', 'incel', "ADHD", "adhd"
]
window.addEventListener('load', function () {
    // Remove the placeholder of the search input box
    document.querySelectorAll('.SearchBar-input input').forEach(searchInput => {
        removePlaceholder(searchInput);
    });

    // 链接直接跳转
    document.body.addEventListener('click', function (event) {
        console.log(event.target)
        // a标签
        // https://www.zhihu.com/question/1894812005174596681/answer/1899217045603746530
        if (event.target.tagName === 'A') {
            console.log('直接跳转 Type 1')
            let url = event.target.href;
            if (url.includes('link.zhihu.com/?target')) {
                url = new URL(url).searchParams.get('target');
                event.preventDefault();
                event.stopImmediatePropagation()
                window.open(url, '_blank');
            }
        }

        // span标签
        // https://zhuanlan.zhihu.com/p/30400486089
        // https://www.zhihu.com/question/335623643
        // if (e.target.className === 'LinkCard-title two-line' && e.target.tagName === 'SPAN') {
        //     const span = e.target;
        //     const parent = span.parentElement;
        //     const grandparent = parent.parentElement;
        //     if (parent.className === 'LinkCard-contents' && grandparent.className === 'LinkCard new css-biylet') {
        //         console.log('直接跳转 Type 2')
        //         // 获取最近的祖先a节点
        //         let href = span.closest('a').href;
        //         if (href.includes('link.zhihu.com/?target')) {
        //             href = new URL(href).searchParams.get('target');
        //         }
        //         // 阻止其他点击事件
        //         e.stopPropagation();
        //         window.open(href, '_blank');
        //     }
        // } else if (e.target.className === 'visible' && e.target.tagName === 'SPAN') {

        // }
    });

    // 屏蔽词
    const observer = new MutationObserver(() => {
        console.log('mutation');
        [...document.querySelectorAll('.Card.TopstoryItem')].filter((element) => {
            return BLOCK_WORDS.some((word) => { return element.querySelector('.ContentItem-title')?.innerText.includes(word) })
        }).forEach((element) => {
            console.log('屏蔽:')
            console.log(element.innerText);
            element.remove();
        });
    });
    observer.observe(document.body, { childList: true, subtree: true })

    // TODO 解除复制限制

});