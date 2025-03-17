// 获取dom结点的截图
// https://html2canvas.hertzen.com/
function captureNodeScreenshot(node, options = {}) {
    return new Promise((resolve, reject) => {
        const { width = node.offsetWidth, height = node.offsetHeight } = options;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        html2canvas(node, {
            width,
            height,
            scale: 1,
            useCORS: true,
            logging: false,
            onrendered: (canvas) => {
                ctx.drawImage(canvas, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            },
        });
    }).then((url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    })
}

// 选择dom结点
function selectNode() {
    
}