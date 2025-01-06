chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case 'edit':
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/toggleEditPage.js"]
            });
            break;
        case 'searchByGoogleScholar':
            chrome.tabs.create({
                url: 'https://scholar.google.com/scholar?q=' + info.selectionText
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
        title: '使用谷歌学术搜索',
        contexts: ['selection'],
        id: 'searchByGoogleScholar'
    });
});
