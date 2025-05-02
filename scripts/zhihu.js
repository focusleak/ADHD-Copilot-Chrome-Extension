window.addEventListener('load', function () {
    // Remove the placeholder of the search input box
    document.querySelectorAll('.SearchBar-input input').forEach(searchInput => {
        if (searchInput) {
            searchInput.placeholder = '';
            const observer = new MutationObserver(() => {
                if (searchInput.placeholder != '') {
                    searchInput.placeholder = '';
                }
            });
            observer.observe(searchInput, {
                attributes: true,
                attributeFilter: ['placeholder']
            });
        }
    });

    // 链接直接跳转
    document.querySelector('body').addEventListener('click', function (e) {
        // a标签
        if (e.target.tagName === 'A') {
            const a = e.target;
            let href = a.href;
            if (href.includes('https://link.zhihu.com/?target')) {
                e.preventDefault();
                const url = new URL(href).searchParams.get('target');
                window.open(url, '_blank');
            }
        }

        // span标签
        // e.g. https://zhuanlan.zhihu.com/p/30400486089
        if (e.target.className === 'LinkCard-title two-line' && e.target.tagName === 'SPAN') {
            const span = e.target;
            const parent = span.parentElement;
            const grandparent = parent.parentElement;
            if (parent.className === 'LinkCard-contents' && grandparent.className === 'LinkCard new css-biylet') {
                // 获取最近的祖先a节点
                const url = span.closest('a').dataset.text;
                // 阻止其他点击事件
                e.stopPropagation();
                window.open(url, '_blank');
            }
        }
    });

    // 解除复制限制


});
