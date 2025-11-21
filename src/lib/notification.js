import url from '@/icon.png'
const notification = ({
    message,
    title = 'ADHD Copilot',
    type = 'basic',
    iconUrl = url,
    priority = 2,
} = {}) => {
    try {
        chrome.notifications.create({
            type,
            iconUrl,
            title,
            message,
            priority,
        })
    } catch (e) {
        if (Notification.permission === 'granted') {
            new Notification(title, { body: message, icon: iconUrl })
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title, { body: message, icon: iconUrl })
                }
            })
        }
    }
}

export default notification