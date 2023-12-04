const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
    '/connect-sw.js',
    '/fonts/monofett-v23-latin-regular.woff2',
    '/fonts/roboto-mono-v23-cyrillic_latin-700.woff2',
    '/fonts/roboto-mono-v23-cyrillic_latin-regular.woff2',
    '/img/bg.jpg',
    '/img/icons/icon-72x72.png',
    '/img/icons/icon-96x96.png',
    '/img/icons/icon-128x128.png',
    '/img/icons/icon-144x144.png',
    '/img/icons/icon-152x152.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-384x384.png',
    '/img/icons/icon-512x512.png',
]

async function cacheFirst(request) {
    const cached = await caches.match(request)

    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())

        return response
    } catch (e) {
        const cached = await cache.match(request)

        return cached ?? await caches.match('/offline.html')
    }
}

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

self.addEventListener('activate', async () => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
            .filter((name) => name !== staticCacheName)
            .filter((name) => name !== dynamicCacheName)
            .map((name) => caches.delete(name))
    )
})

self.addEventListener('fetch', (event) => {
    const { request } = event;

    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})


