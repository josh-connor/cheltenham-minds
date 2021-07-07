const CACHE = 'cheltenham-pwa-v2'; 
const audioCACHE = 'chelentham-audio-v1'
  
var filesToCache = [
 
'/',    
 
'/index.html',    
 
'/css/style.css',  
   
'/js/script.js',
'/img/collage.jpg',
'/img/70.png',
'/img/marker.png',
'/img/markerGrey.png',
'/img/minds.png',

'/map.html'/*,

'/audio/loc1_Allen_Ginsberg.mp3',
'/audio/loc2_Hollie_McNish.mp3',
'/audio/loc3_Lemn_Sissay.mp3',
'/audio/loc4_Simon_Armitage.mp3',
'/audio/loc5_George_the_Poet.mp3',
'/audio/loc6_Stevie_Smith.mp3',
'/audio/loc7_Seamus_Heaney.mp3'*/

 ];  
 var audioToCache = ['/audio/loc1_Allen_Ginsberg.mp3',
'/audio/loc2_Hollie_McNish.mp3',
'/audio/loc3_Lemn_Sissay.mp3',
'/audio/loc4_Simon_Armitage.mp3',
'/audio/loc5_George_the_Poet.mp3',
'/audio/loc6_Stevie_Smith.mp3',
'/audio/loc7_Seamus_Heaney.mp3'];
    
self.addEventListener('install', function(e) { 
 
e.waitUntil(
       
caches.open(CACHE).then(function(cache) { 
        
return cache.addAll(filesToCache);   
    
})    
 
);  
/*e.waitUntil(
       
caches.open(audioCACHE).then(function(cache) { 
        
return cache.addAll(audioToCache);   
    
})    
 
);*/
 
}); 
    
/* Serve cached content when offline */ 
  
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(CACHE).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [CACHE];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );


/*  const audioCacheWhitelist = [audioCACHE];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (audioCacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );*/
});