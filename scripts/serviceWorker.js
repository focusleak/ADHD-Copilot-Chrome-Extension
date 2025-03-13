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
        case 'clearCookiesLocalStorage':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/service/clearCookiesLocalStorage.js"]
            });
        case 'readLater':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/service/readLater.js"]
            });
        default:
            console.log('Standard context menu item clicked.');
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
        title: '使用谷歌学术搜索',
        contexts: ['selection'],
        id: 'searchByGoogleScholar'
    });
    chrome.contextMenus.create({
        title: '稍后再看',
        contexts: ['page'],
        id: 'readLater'
    })
});
