// 在右侧增加下载视频功能

// 关闭搜索框placeholder
const searchInput = document.querySelector('.nav-search-input');
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
