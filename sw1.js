var cacheName = 'cheltenham-pwa'; 
  
var filesToCache = [
 
'/',    
 
'/index.html',    
 
'/css/style.css',  
   
'/js/script.js',

/*'/map.html',*/
"https://use.typekit.net/mre2lsl.css",
'/audio/loc1_Allen_Ginsberg.mp3'/*,
'/audio/loc2_Hollie_McNish.mp3',
'/audio/loc3_Lemn_Sissay.mp3',
'/audio/loc4_Simon_Armitage.mp3',
'/audio/loc5_George_the_Poet.mp3',
'/audio/loc6_Stevie_Smith.mp3',
'/audio/loc7_Seamus_Heaney.mp3'*/

 ];  
    
self.addEventListener('install', function(e) { 
 
e.waitUntil(
       
caches.open(cacheName).then(function(cache) { 
        
return cache.addAll(filesToCache);   
    
})    
 
);  
 
}); 
    
/* Serve cached content when offline */ 
  
self.addEventListener('fetch', function(e) {  
   
e.respondWith(      caches.match(e.request).then(function(response) {  
       
return response || fetch(e.request);
       
})   
  
);  
 
});