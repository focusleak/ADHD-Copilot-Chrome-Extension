document.body.addEventListener('dblclick', function (e) {
    // img标签
    if (e.target.tagName === 'IMG') {
        // 获取图片的src属性
        const imgSrc = e.target.getAttribute('src');
        if (imgSrc) {
            // 创建一个新的a标签
            const a = document.createElement('a');
            a.href = imgSrc;
            a.target = '_blank'; // 设置为在新标签页打开
            a.download = ''; // 设置下载属性
            document.body.appendChild(a);
            a.click(); // 模拟点击下载
            document.body.removeChild(a); // 下载后移除a标签
        }
    }
});
// 给img标签上增加下载图标


window.addEventListener('keydown', function (e) {
    // PrtScr键
    if (e.key === 'PrintScreen' || e.key === 'PrtSc') {
        // 获取当前页面的截图
        html2canvas(document.body).then(function (canvas) {
            // 将canvas转换为图片
            const imgData = canvas.toDataURL('image/png');
            download(imgData);
        });
        // 创建一个新的a标签
        const a = document.createElement('a');
        a.href = ''; // 
        a.target = '_blank'; // 设置为在新标签页打开
        a.download = 'screenshot.png'; // 设置下载属性
        document.body.appendChild(a);
        a.click(); // 模拟点击下载
        document.body.removeChild(a); // 下载后移除a标签
    }
})