window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOM fully loaded and parsed');

    const theWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Chattanooga&appid=f379b3857c328f3085b067f960c64d13', { lat: 35.0456, lon: -85.3097, appid: 'f379b3857c328f3085b067f960c64d13'}).then(response => response.json());
    const { clouds, coord, main, name, sys, timezone, visibility, weather, wind } = theWeather;
    const theDiv = document.getElementById('generic');
    

    //-- CLOUDS ----------------------------------------
    const cloudDiv = document.getElementById('clouds');

    let cloudInfo;
    console.log('BEFORE SWITCH', clouds.all)

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

    theDiv.innerHTML = weatherDisplay;

    console.log('WEATHER', theWeather)
});