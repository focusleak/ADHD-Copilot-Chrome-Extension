// 格式化 manifest.json 文件
const fs = require('fs');

const manifest = require('../manifest.json');

console.log(manifest.content_scripts)

function getKey({ js, css }) {
    console.log(js, css)
    if (js && js.length > 0) {
        return js[0].match(/scripts\/(.*)\.js/)[1];
    }
    if (css && css?.length > 0) {
        return css[0].match(/styles\/(.*)\.css/)[1];
    }
}

manifest.content_scripts.sort((a, b) => {
    return getKey(a).localeCompare(getKey(b))
})
console.log(manifest.content_scripts);

// 回写
require('fs').writeFileSync('../manifest.json', JSON.stringify(manifest, null, 4))