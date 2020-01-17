/** @format */
console.log("hello Amigo Technology");
var moment = require("moment");
const location = document.querySelector("#location");
const celsiusBtn = document.querySelector("#celsius");
const fahrenheitBtn = document.querySelector("#fahrenheit");
const theDate = document.querySelector("#date");
const time = document.querySelector("#time");
const sky = document.querySelector("#sky");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temperature");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");

const key = "e3a684e610387506e18815b524b2f71d";

const weather = {};
const KELVIN = 273;

weather.temperature = {
  unit: "celsius"
};

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    alert("Geolocation");
  }

  function setPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    getWeather(lat, long);
  }

  function getWeather(lat, long) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

    fetch(api)
      .then(function(response) {
        let data = response.json();
        return data;
      })
      .then(function(data) {
        kelvinTemp = data.main.temp;
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.wind = data.wind.speed;
        weather.pressure = data.main.pressure;
        weather.humidity = data.main.humidity;
      })
      .then(function() {
        displayWeather();
      });
  }

  function displayWeather() {
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    sky.innerHTML = weather.description;
    location.innerHTML = `${weather.city}, ${weather.country}`;
    wind.innerHTML = `${weather.wind} mph`;
    pressure.innerHTML = `${weather.pressure} hPa`;
    humidity.innerHTML = `${weather.humidity} %`;

    fahrenheitBtn.addEventListener("click", function(e) {
      e.preventDefault();
      temperature.innerHTML =
        Math.floor((weather.temperature.value * 9) / 5 + 32) + " °F";
    });

    celsiusBtn.addEventListener("click", function(e) {
      e.preventDefault();
      temperature.innerHTML = Math.floor(kelvinTemp - 273.15) + " °C";
    });

    let date = new Date();

    theDate.innerHTML = moment().format("MMM Do YYYY");
    time.innerHTML = `${date.getHours()} : ${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
});
