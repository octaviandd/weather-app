const logo = document.querySelector('.logo');
const location = document.querySelector('.location');
const temperature = document.querySelector('.temperature')
const forecast = document.querySelector('.forecast-details')
const toCelsius = document.querySelector('#celsius')
const toFahrenheit = document.querySelector('#fahrenheit')



const getData = (function(){
    window.addEventListener('load', () =>{
        let lat;
        let long;
    
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
                long = position.coords.longitude;
                lat = position.coords.latitude
        
        
                const proxy = "http://cors-anywhere.herokuapp.com/"
                fetch(`${proxy}https://api.darksky.net/forecast/469161b96bc38c524e0a6454c094ce6e/${lat},${long}`)
                    .then(response =>{
                        return response.json()
                    })
                    .then(data => {
                         console.log(data)
                    
                    location.innerHTML = data.timezone
                    temperature.innerHTML = Math.round(data.currently.temperature) + " °F"
    
                    //tocelsius
                    toCelsius.addEventListener('click', function(e){
                        e.preventDefault()
                        temperature.innerHTML = Math.round((data.currently.temperature - 32) * 0.55) + " °C"
                    })
    
                    toFahrenheit.addEventListener('click', function(e){
                        e.preventDefault()
                        temperature.innerHTML = Math.round(((data.currently.temperature - 32) * 0.55) * 1.8 + 32) + " °F"
                    })
    
                    forecast.innerHTML = data.hourly.summary
                    let currentIcon = data.currently.icon.toUpperCase();
    
                    var skycons = new Skycons({"color": "white"});
                    skycons.add(document.querySelector("#icon1"), currentIcon);
    
                    skycons.play();
                })
            })  
        }
    }) 
    
})()



// function getLocation(){
//     tomtom.setProductInfo('<your-product-name>', '<your-product-version>');
//             tomtom.L.map('map', {
// 		    key: "94AHVQr8yCP1ISEGmJAIv5oGw1R7fIKW",
//             source: 'vector',
//             basePath: '/jssdk-4'
// 	    });
// }

// getLocation();
