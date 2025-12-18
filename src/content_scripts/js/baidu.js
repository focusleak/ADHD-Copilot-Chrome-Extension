import { removePlaceholder } from '@/lib/utils'

try {
    removePlaceholder(document.getElementById('kw'))
} catch (error) {
    console.log(error)
}
try {
    removePlaceholder(document.getElementById('chat-textarea'))
} catch (error) {
    console.log(error)
}
window.addEventListener('load', function () {
    try {
        removePlaceholder(document.getElementById('kw'))
    } catch (error) {
        console.log(error)
    }
    try {
        removePlaceholder(document.getElementById('chat-textarea'))
    } catch (error) {
        console.log(error)
    }
})
