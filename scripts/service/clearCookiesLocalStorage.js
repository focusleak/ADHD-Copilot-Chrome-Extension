localStorage.clear();
// TODO
// 获取当前活动标签页的 URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    // 获取该页面的所有 cookies
    chrome.cookies.getAll({ url: url }, function (cookies) {
        cookies.forEach(function (cookie) {
            // 删除每一个 cookie
            chrome.cookies.remove({
                url: url,
                name: cookie.name
            }, function (details) {
                if (details) {
                    console.log("Cookie deleted: " + cookie.name);
                }
            });
        });
    });
});

console.log("Cookies and Local Storage cleared");