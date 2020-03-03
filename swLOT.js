// //Define an array 
// const staticAssets = [
//     './',
//     './style.scss',
//     '/app.js'
// ];

// //Listen to the following events
// self.addEventListener('install', async event =>{
//     const cache = await caches.open('project-static');
//     cache.addAll(staticAssets);
// });

// self.addEventListener('activate', (event) => {
    
//     let cacheWhitelist = ['projects-v2'] // products-v2 is the name of the new cache

//     event.waitUntil(
//         caches.keys().then (cacheNames => {
//             return Promise.all(
//                 cacheNames.map( cacheName => {
//                     /* Deleting all the caches except the ones that are in cacheWhitelist array */
//                     if (cacheWhitelist.indexOf(cacheName) === -1) {
//                         return caches.delete(cacheName)
//                     }
//                 })
//             )
//         })
//     )
// })

// // /* Fetch event handler for responding to GET requests with the cached assets */
// // self.addEventListener('fetch', (event) => {
// //     event.respondWith(
// //         caches.open('projects-v2')
// //             .then (cache => {
// //                 /* Checking if the request is already present in the cache. If it is present, sending it directly to the client */
// //                 return cache.match(event.request).then (response => {
// //                     if (response) {
// //                         console.log('Cache hit! Fetching response from cache', event.request.url)
// //                         return response
// //                     }
// //                     /* If the request is not present in the cache, we fetch it from the server and then put it in cache for subsequent requests. */
// //                     fetch(event.request).then (response => {
// //                         cache.put(event.request, response.clone())
// //                         return response
// //                     })
// //                 })
// //             })
// //     )
// // })

// self.addEventListener('fetch', event => {
//     //Those are the events send from the application to the network
//     const req = event.request;

//     const url = new URL(req.url);

//     //If we are fetching from our own site
//     if(url.origin == location.origin){
//         event.respondWith(cacheFirst(req));
//     } else {
//         event.respondWith(networkFirst(req));
//     }
// });

// async function cacheFirst(req) {
//     //Check if we have a cache response
//     const cachedResponse = await caches.match(req);
//     return cachedResponse || fetch(req);
// }

// async function networkFirst(req) {
//     const cache = await caches.open('project-dynamic');

//     try {
//         //Go to the network and fetch news
//         const res = await fetch(req);

//         //Store te request in the cache
//         cache.put(req, res.clone());

//         //Return repsonse to the browser
//         return res;
//     } catch (error) {
//         //Save something in the cache and return it instead
//         return await cache.match(req);
//     }
// }