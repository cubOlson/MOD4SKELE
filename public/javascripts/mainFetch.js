import { handleRain } from './weatherUtils/handleRain.js';
import { handleClouds } from './weatherUtils/handleClouds.js';
import { handlePTH } from './weatherUtils/handlePTH.js';
import { handleLocation } from './weatherUtils/handleLocation.js';
import { handleGeneric } from './weatherUtils/handleGeneric.js';

//secret
const fetchCode = document.getElementById('fetchCode').value;
//-- GEOLOCATION --------------------------------------
const geoLoDiv  = document.getElementById("geoLo");
let lat;
let lon;
let theWeather;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    geoLoDiv.innerHTML = "The Browser Does not Support Geolocation";
  }
}

async function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    theWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${fetchCode}`);
    if (!theWeather.ok){
        geoLoDiv.innerHTML = '<h2>An error has occurred</h2>';
        return 
    } else {
        theWeather = await theWeather.json();
    }
    geoLoDiv.innerHTML = '<h2>Coordinates fetched</h2>'
    return afterFetch(theWeather);
}

function showError(error) {
  if(error.PERMISSION_DENIED){
    geoLoDiv.innerHTML = "Permission denied, no weather for you.";
  }
}

getLocation();
// Re-fetch the weather
const refreshButton = document.getElementById('refreshWeather');
refreshButton.addEventListener('click', event => {
    getLocation()
});

// --------------------------------------------
// Enable location searching
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', async(event) => {
    event.preventDefault()
// Build request string
    const inputArr = event.target.elements;
    let searchString = 'https://api.openweathermap.org/data/2.5/weather?q='
    if (inputArr[0].value){
        searchString = searchString.concat(inputArr[0].value)
    }
    if (inputArr[1].value){
        searchString = searchString.concat(`,${inputArr[1].value}`)
    }
    if (inputArr[2].value){
        searchString = searchString.concat(`,${inputArr[2].value}`)
    }
    searchString = searchString.concat(`&appid=${fetchCode}`);
//Fetch request
    let searchWeather = await fetch(searchString);
    if (!searchWeather.ok) {
        geoLoDiv.innerHTML = '<h2>Search has failed. Try again.</h2>';
        return
    } else {
        searchWeather = await searchWeather.json();
    }
    return afterFetch(searchWeather);
});

//-- GEOLOCATION --------------------------------------
function afterFetch(theWeather){    
const { clouds, main, name, sys, visibility, weather, wind } = theWeather;
//-- CLOUDS ----------------------------------------
handleClouds(clouds);
//-- PRESSURE/TEMP/HUMIDITY
handlePTH(main);
//-- Humidity -----------------------------------------
//-- Location -------------------------------------------
handleLocation(weather, sys);
//-- Generic Info -------------------------------------
handleGeneric(visibility, wind);
//-- Rain ----------------------------------------------
handleRain();
}