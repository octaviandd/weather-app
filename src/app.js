const logo = document.querySelector('.logo');
const location = document.querySelector('.location');
const temperature = document.querySelector('.temperature')
const forecast = document.querySelector('.forecast-details')
const toCelsius = document.querySelector('#celsius')
const toFahrenheit = document.querySelector('#fahrenheit')



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
                temperature.innerHTML = Math.round(data.currently.temperature + " °F")

                //tocelsius
                toCelsius.addEventListener('click', function(){
                    temperature.innerHTML = Math.round((data.currently.temperature - 32) * 0.55)
                })

                toFahrenheit.addEventListener('click', function(){
                    temperature.innerHTML = Math.round(((data.currently.temperature - 32) * 0.55) * 1.8 + 32)
                })

                forecast.innerHTML = data.daily.summary
                let currentIcon = data.currently.icon.toUpperCase();

                var skycons = new Skycons({"color": "white"});
                skycons.add(document.querySelector("#icon1"), Skycons.RAIN);

                skycons.play();
            })
        })  
    }
}) 
