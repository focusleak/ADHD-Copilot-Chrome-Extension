// 自动填充身份证号
// 自动填充账号密码

import { waitForElement } from '@/lib/utils'
import config from '@/config.json'

config.forEach(({ url, fields }) => {
    if (window.location.href.includes(url)) {
        fields.forEach(({ selector, value }) => {
            waitForElement(selector).then((element) => {
                element.value = value
            })
        })
    }
})
console.log('自动填充完成')
