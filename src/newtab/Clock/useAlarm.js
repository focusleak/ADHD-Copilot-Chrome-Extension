import { useEffect } from 'react'
import { useStorage } from '@/hooks/useStorage'
import notification from '@/lib/notification'
const useAlarm = (timestamp, message) => {
    const alarms = useStorage('alarms', [])
    useEffect(() => {
        const timers = alarms.map((alarm) =>
            setTimeout(() => {
                notification({
                    message,
                    title: '定时提醒',
                })
            }, alarm.timestamp - Date.now())
        )
        return () => timers.forEach((timer) => clearTimeout(timer))
    }, [])
}
