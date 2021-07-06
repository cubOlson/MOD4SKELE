window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOM fully loaded and parsed');

    const theWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Chattanooga&appid=f379b3857c328f3085b067f960c64d13').then(response => response.json());
    const { clouds, coord, main, name, sys, timezone, visibility, weather, wind } = theWeather;
    const theDiv = document.getElementById('generic');

    const weatherDisplay = `
        <div>
            <ul>
                <li>CLOUD COVER: ${clouds.all}</li>
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