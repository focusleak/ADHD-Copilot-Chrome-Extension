chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case 'edit':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/service/toggleEditPage.js"]
            });
            break;
        case 'searchByGoogle':
            chrome.tabs.create({
                url: 'https://www.google.com/search?q=' + info.selectionText
            });
            break;
        case 'searchByGoogleScholar':
            chrome.tabs.create({
                url: 'https://scholar.google.com/scholar?q=' + info.selectionText
            });
            break;
        case 'searchByBaidu':
            chrome.tabs.create({
                url: 'https://www.baidu.com/s?wd=' + info.selectionText
            });
            break;
        case 'searchByZhihu':
            chrome.tabs.create({
                url: 'https://www.zhihu.com/search?type=content&q=' + info.selectionText
            });
            break;
        case 'searchBySogou':
            chrome.tabs.create({
                url: 'https://www.sogou.com/web?query=' + info.selectionText
            });
            break;
        case 'searchByWexin':
            chrome.tabs.create({
                url: 'https://weixin.sogou.com/weixin?type=2&query=' + info.selectionText
            });
            break;
        case 'searchByWeibo':
            chrome.tabs.create({
                url: 'https://s.weibo.com/weibo/' + info.selectionText
            });
            break;
        case 'searchByXiaoHongShu':
            chrome.tabs.create({
                url: 'https://www.xiaohongshu.com/search_result?keyword=' + info.selectionText + '&source=web_explore_feed'
            });
            break;
        case 'searchByBiliBili':
            chrome.tabs.create({
                url: 'https://search.bilibili.com/all?keyword=' + info.selectionText
            });
            break;
        case 'clearCookiesLocalStorage':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/service/clearCookiesLocalStorage.js"]
            });
            break;
        case 'readLater':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/service/readLater.js"]
            });
            break;
        default:
            console.log('Standard context menu item clicked.');
            break;
    }
});
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: 'Edit this page(Press ESC to finish editing)',
        contexts: ['page'],
        id: 'edit'
    });
    chrome.contextMenus.create({
        title: '清除cookies和localStorage',
        contexts: ['page'],
        id: 'clearCookiesLocalStorage'
    });
    chrome.contextMenus.create({
        title: '使用谷歌搜索',
        contexts: ['selection'],
        id: 'searchByGoogle'
    });
    chrome.contextMenus.create({
        title: '使用百度搜索',
        contexts: ['selection'],
        id: 'searchByBaidu'
    });
    chrome.contextMenus.create({
        title: '使用知乎搜索',
        contexts: ['selection'],
        id: 'searchByZhihu'
    });
    chrome.contextMenus.create({
        title: '使用搜狗搜索',
        contexts: ['selection'],
        id: 'searchBySogou'
    });
    chrome.contextMenus.create({
        title: '使用微信搜索',
        contexts: ['selection'],
        id: 'searchByWexin'
    });
    chrome.contextMenus.create({
        title: '使用微博搜索',
        contexts: ['selection'],
        id: 'searchByWeibo'
    });
    chrome.contextMenus.create({
        title: '使用小红书搜索',
        contexts: ['selection'],
        id: 'searchByXiaoHongShu'
    });
    chrome.contextMenus.create({
        title: '使用哔哩哔哩搜索',
        contexts: ['selection'],
        id: 'searchByBiliBili'
    });
    chrome.contextMenus.create({
        title: '使用谷歌学术搜索',
        contexts: ['selection'],
        id: 'searchByGoogleScholar'
    });
    chrome.contextMenus.create({
        title: '稍后再看',
        contexts: ['page'],
        id: 'readLater'
    });
});
