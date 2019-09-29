if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js")
    .then(function(){
        console.log("Registration successful");
    })
    .catch(function(){
        console.log("Registration failed");
    });
};