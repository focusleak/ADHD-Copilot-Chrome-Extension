// timerWorker.js

let endTime = 0
let timerId = null

function clearTimer() {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    }
}

self.onmessage = (e) => {
    const { type, payload } = e.data

    if (type === 'START') {
        clearTimer()

        const { remaining } = payload
        endTime = Date.now() + remaining

        timerId = setInterval(() => {
            const left = endTime - Date.now()
            if (left > 0) {
                self.postMessage({ type: 'TICK', remaining: left })
            } else {
                clearTimer()
                self.postMessage({ type: 'DONE' })
            }
        }, 1)
    }

    if (type === 'PAUSE') {
        clearTimer()
    }

    if (type === 'STOP') {
        clearTimer()
    }
}
