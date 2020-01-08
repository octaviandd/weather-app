const logo = document.querySelector('.logo');
const location = document.querySelector('.location');
const temperature = document.querySelector('.second-div')
const forecast = document.querySelector('.third-div')

window.addEventListener('load', () =>{
    let lat;
    let long;
})



function getWeatherInfo() {
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
                temperature.innerHTML = data.currently.temperature
                forecast.innerHTML = data.daily.summary
                let currentIcon = data.currently.icon

                var skycons = new Skycons({"color": "white"});
                skycons.add(document.getElementById("icon1"), `Skycons.${currentIcon.toUpperCase()}`);

                skycons.play();
            })
        })  
    } 
}

getWeatherInfo();



