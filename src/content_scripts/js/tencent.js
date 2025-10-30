const WX_UA = `
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541022) XWEB/16467 Flue`
// content.js
const script = document.createElement('script');
script.textContent = `
  Object.defineProperty(navigator, 'userAgent', {
    get: () => 'MyCustomUserAgent/1.0 (Injected)'
  });
`;
document.documentElement.appendChild(script);
// script.remove();
