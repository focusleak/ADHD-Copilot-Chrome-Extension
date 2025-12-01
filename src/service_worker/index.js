chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const queryString = encodeURI(info.selectionText)
    switch (info.menuItemId) {
        case 'edit':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['service_worker/toggleEditPage.js'],
            })
            break
        case 'searchByGoogle':
            chrome.tabs.create({
                url: 'https://www.google.com/search?q=' + queryString,
            })
            break
        case 'searchByGoogleScholar':
            chrome.tabs.create({
                url: 'https://scholar.google.com/scholar?q=' + queryString,
            })
            break
        case 'searchByCambridgeDictionary':
            chrome.tabs.create({
                url:
                    'https://dictionary.cambridge.org/us/pronunciation/english/' +
                    queryString.toLocaleLowerCase(),
            })
            break
        case 'searchByBaidu':
            chrome.tabs.create({
                url: 'https://www.baidu.com/s?wd=' + queryString,
            })
            break
        case 'searchByZhihu':
            chrome.tabs.create({
                url:
                    'https://www.zhihu.com/search?type=content&q=' +
                    queryString,
            })
            break
        case 'searchBySogou':
            chrome.tabs.create({
                url: 'https://www.sogou.com/web?query=' + queryString,
            })
            break
        case 'searchByWeixin':
            chrome.tabs.create({
                url:
                    'https://weixin.sogou.com/weixin?type=2&query=' +
                    queryString,
            })
            break
        case 'searchByWeibo':
            chrome.tabs.create({
                url: 'https://s.weibo.com/weibo/' + queryString,
            })
            break
        case 'searchByXiaoHongShu':
            chrome.tabs.create({
                url:
                    'https://www.xiaohongshu.com/search_result?keyword=' +
                    queryString +
                    '&source=web_explore_feed',
            })
            break
        case 'searchByBiliBili':
            chrome.tabs.create({
                url: 'https://search.bilibili.com/all?keyword=' + queryString,
            })
            break
        case 'searchByJD':
            chrome.tabs.create({
                url: 'https://search.jd.com/Search?keyword=' + queryString,
            })
            break
        case 'clearCookiesLocalStorage':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['service_worker/clearCookiesLocalStorage.js'],
            })
            break
        case 'readLater':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['service_worker/readLater.js'],
            })
            break
        default:
            console.log('Standard context menu item clicked.')
            break
    }
})
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: 'Edit this page(Press ESC to finish editing)',
        contexts: ['page'],
        id: 'edit',
    })
    chrome.contextMenus.create({
        title: '清除cookies和localStorage',
        contexts: ['page'],
        id: 'clearCookiesLocalStorage',
    })
    chrome.contextMenus.create({
        title: 'Search by',
        id: 'search',
        contexts: ['selection'],
    })
    chrome.contextMenus.create({
        title: 'Google',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByGoogle',
    })
    chrome.contextMenus.create({
        title: '百度',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByBaidu',
    })
    chrome.contextMenus.create({
        title: '知乎',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByZhihu',
    })
    chrome.contextMenus.create({
        title: '搜狗',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchBySogou',
    })
    chrome.contextMenus.create({
        title: '微信',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByWeixin',
    })
    chrome.contextMenus.create({
        title: '微博',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByWeibo',
    })
    chrome.contextMenus.create({
        title: '小红书',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByXiaoHongShu',
    })
    chrome.contextMenus.create({
        title: '哔哩哔哩',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByBiliBili',
    })
    chrome.contextMenus.create({
        title: '京东',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByJD',
    })
    chrome.contextMenus.create({
        title: '谷歌学术',
        parentId: 'search',
        contexts: ['selection'],
        id: 'searchByGoogleScholar',
    })
    chrome.contextMenus.create({
        title: '稍后再看',
        contexts: ['page'],
        id: 'readLater',
    })
})

const WX_UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541022) XWEB/16467 Flue'
