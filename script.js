"use strict";

const weatherConditions = new XMLHttpRequest();
const weatherForecast = new XMLHttpRequest();
const proxy = "https://cors-anywhere.herokuapp.com/";
let cObj;
let fObj;

// GET THER WEATHER CONDITIONS
weatherConditions.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=london&appid=91632573508ff10e943588017e6ef938&units=metric", true);
weatherConditions.responseType = "text";
weatherConditions.send(null);

weatherConditions.onload = function () {
  if (weatherConditions.status === 200) {
    cObj = JSON.parse(weatherConditions.responseText);
    console.log(cObj);
    document.querySelector(".temperature__city--place").innerHTML = cObj.name;
    document.querySelector(".temperature__degrees__number").innerHTML = Math.round(cObj.main.temp);
    document.querySelector(".temperature__degrees__max p").innerHTML = Math.round(cObj.main.temp_max) + "&#176;";
    document.querySelector(".temperature__degrees__min p").innerHTML = Math.round(cObj.main.temp_min) + "&#176;";
  }
};
