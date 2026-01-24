// // npm run add help
// npm run add application <name>
// npm run add component <name>
// npm run add api <name>
// npm run add hook <name>
// npm run add content_script <name>
const fs = require('fs')
const path = require('path')
// TODO
// 获取命令行参数
const [, type, componentName] = process.argv
if (!componentName) {
    console.error('请输入组件名称')
    process.exit(1)
}
// 创建文件
// 写入index.js
// `import * as ${componentName} from '@/applications/${componentName}'`
const applications = require('@/src/applications/index')
applications.push(componentName)
fs.writeFileSync(path.join(__dirname, '@/src/applications/index.js'), `export default ${JSON.stringify(applications)}`)
