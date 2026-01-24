import { directJump, isUrlIncluded, waitForElement, toast } from '@/lib/utils'
import storage from '@/lib/storage'

const STORAGE_KEY = 'EPIC_Record'
// 监听每日一题是否已经解答
waitForElement('[data-testid="checkout-success-title"]', {
    test: (element) => {
        return element.innerHTML.includes('谢谢您的购买！')
    },
}).then(async () => {
    const records = (await storage.get(STORAGE_KEY)) || {}
    storage.set(STORAGE_KEY, {
        ...records,
        [new Date().toLocaleDateString()]: new Date().toLocaleTimeString(),
    })
})
