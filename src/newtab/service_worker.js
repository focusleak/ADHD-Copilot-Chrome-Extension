// service_worker.js

self.addEventListener('fetch', (event) => {
    const { request } = event

    if (request.destination === 'image') {
        event.respondWith(cacheThenNetwork(request))
    }
})

async function cacheThenNetwork(request) {
    const cache = await caches.open('image-cache')
    const cachedResponse = await cache.match(request)
    if (cachedResponse) return cachedResponse

    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
}
