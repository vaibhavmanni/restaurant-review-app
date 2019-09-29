//Array of files to be cached
const cachedFiles = ['./',
                    './index.html',
                    './restaurant.html',
                    './css/styles.css',
                    './data/restaurants.json',
                    './js/dbhelper.js',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './js/sw-register.js',
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg'];

//Installation
self.addEventListener("installation", function(e){
    e.waitUntil(
        caches.open("v1").then(function(cache){
            return cache.addAll(cachedFiles);
        })
    );

});


//Fetching
self.addEventListener("fetching", function(e){
        e.respondWith( caches.match(e.request).then(function(response){
            if(response){
                console.log("Successfully found ", e.request, "in cache");
                return response;
            }else{
                console.log("Unable to find ", e.request, "in cache");
                return fetch(e.request)
                .then(function(response){
                    const clonedResponse = response.clone();
                    caches.open("v1").then(function(cache){
                        cache.put(e.request, clonedResponse );
                    })
                    return response;                    
                })
                .catch(function(err){
                    console.error(err);
                });
            }
        })
    );
});