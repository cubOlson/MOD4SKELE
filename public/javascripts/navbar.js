window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOM fully loaded and parsed');

    const theDiv = document.getElementById('generic');

    //-- GEOLOCATION --------------------------------------
    const geoLoDiv  = document.getElementById("geoLo");

    let lat;
    let lon;
    let theWeather;
    function getLocation() {
        console.log('IN FIRST')
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        geoLoDiv.innerHTML = "The Browser Does not Support Geolocation";
      }
    }
    async function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        theWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f379b3857c328f3085b067f960c64d13`).then(response => response.json());
        geoLoDiv.innerHTML = 'Coordinates fetched'
        afterFetch(theWeather);
    }
    function showError(error) {
      if(error.PERMISSION_DENIED){
        geoLoDiv.innerHTML = "Permission denied, no weather for you.";
      }
    }
    getLocation();

    //-- GEOLOCATION --------------------------------------

    function afterFetch(theWeather){    

    const { clouds, coord, main, name, sys, timezone, visibility, weather, wind } = theWeather;

    //-- CLOUDS ----------------------------------------
    const cloudDiv = document.getElementById('clouds');

    let cloudInfo;

    if(clouds.all) {
        if (clouds.all < 11) {
            cloudInfo = 'Clear skies'
        } else if (clouds.all > 10 && clouds.all < 26) {
            cloudInfo = 'Partly cloudy'
        } else if (clouds.all > 25 && clouds.all < 51) {
            cloudInfo = 'Moderate clouds'
        } else if (clouds.all > 50) {
            cloudInfo = 'Heavy cloud cover'
        } else {
            cloudInfo = 'No weather info'
        }
    };

    const cloudDisplay = `
        <div>
            <h2>${cloudInfo}<h2>
        <div>
    `;

    cloudDiv.innerHTML = cloudDisplay;
    //-- CLOUDS -----------------------------------------

    const weatherDisplay = `
        <div>
            <ul>
                <li>LONGITUDE: ${coord.lon}</li>
                <li>LATITUDE: ${coord.lat}</li>
                <li>HUMIDITY: ${main.humidity}</li>
                <li>PRESSURE: ${main.pressure}</li>
                <li>TEMPERATURE${main.temp}</li>
                <li>MIN TEMPERATURE${main.temp_min}</li>
                <li>MAX TEMPERATURE${main.temp_max}</li>
                <li>CITY: ${name}</li>
                <li>COUNTRY: ${sys.country}</li>
                <li>SUNRISE: ${sys.sunrise}</li>
                <li>SUNSET: ${sys.sunset}</li>
                <li>TIMEZONE: ${timezone}<li>
                <li>VISIBILITY: ${visibility}</li>
                <li>WEATHER: ${weather[0].main}</li>
                <li>DESCRIPTION: ${weather[0].description}</li>
                <li>WINDSPEED: ${wind.speed}</li>
            </ul>
        </div>
    `;

    theDiv.innerHTML = weatherDisplay;}

    console.log('WEATHER', theWeather)
});