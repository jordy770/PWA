const staticAssets = [
    './',
    './style.scss',
    './app.js'
];

self.addEventListener('install', async event =>{
    const cache = await caches.open('projects-static');
    cache.addAll(staticAssets);
});

self.addEventListener('activate', (event) => {
    let cacheWhitelist = ['products-v2'] // products-v2 is the name of the new cache

    event.waitUntil(
        caches.keys().then (cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    /* Deleting all the caches except the ones that are in cacheWhitelist array */
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event =>{
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('projects-dynamic')

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}