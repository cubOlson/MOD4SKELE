window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOM fully loaded and parsed');

    const theDiv = document.getElementById('generic');

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

    const refreshButton = document.getElementById('refreshWeather');

    refreshButton.addEventListener('click', event => {
        getLocation()
    });

    //-- GEOLOCATION --------------------------------------

    function afterFetch(theWeather){    

    const { clouds, main, name, sys, visibility, weather, wind } = theWeather;

    //-- CLOUDS ----------------------------------------
    const cloudDiv = document.getElementById('clouds');

    let cloudInfo;

    if(clouds.all) {
        if (clouds.all < 11) {
            cloudInfo = 'Clear skies'
        } else if (clouds.all > 10 && clouds.all < 26) {
            cloudInfo = 'Small clouds'
        } else if (clouds.all > 25 && clouds.all < 51) {
            cloudInfo = 'Partly Cloudy'
        } else if (clouds.all > 50 && clouds.all < 76) {
            cloudInfo = 'Moderately Cloudy'
        } else {
            cloudInfo = 'Heavy Clouds'
        }
    };

    const cloudDisplay = `
        <div>
            <h2>${cloudInfo}<h2>
        <div>
    `;

    cloudDiv.innerHTML = cloudDisplay;
    //-- CLOUDS -----------------------------------------

    //-- PRESSURE ---------------------------------------
        const pressureDiv = document.getElementById('pressure');

        let pressureInfo;

        if (main.pressure) {
            if (main.pressure < 1000) {
                pressureInfo = 'Low pressure, instability possible'
            } else if (main.pressure > 1030) {
                pressureInfo = 'High pressure, stability possible'
            } else {
                pressureInfo = 'Pressure is within normal range'
            }
        };

        pressureDiv.innerHTML = pressureInfo;
    //-- PRESSURE ---------------------------------------
    
    //-- Temperature ------------------------------------
        const tempDiv = document.getElementById('temp');

        const tempC = Math.round(main.temp - 273);
        const tempF = Math.round(tempC * (9/5) + 32);

        const minC = Math.round(main.temp_min - 273);
        const minF = Math.round(minC * (9/5) + 32);

        const maxC = Math.round(main.temp_max - 273);
        const maxF = Math.round(maxC * (9/5) + 32);

        const tempInfo = `
            <div>
                <h2>Current Temp: ${tempC}C / ${tempF}F<h2>
                <h2>Range: ${minC}C / ${minF}F - ${maxC}C / ${maxF}F<h2>
            <div>
        `;

        tempDiv.innerHTML = tempInfo;
    //-- Temperature ------------------------------------

    //-- Humidity -----------------------------------------
        const humDiv = document.getElementById('humidity');

        const humInfo = `
            <div>
                <h2>Humidity: ${main.humidity}%<h2>
            <div>
        `;

        humDiv.innerHTML = humInfo;
    //-- Humidity -----------------------------------------

    //-- Location -------------------------------------------
        const locDiv = document.getElementById('location');

        const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const sunset = new Date(sys.sunset * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})

        const locInfo = `
            <div>${name}, ${sys.country}<div>
            <div>${weather[0].main} (${weather[0].description})</div>
            <div>Daytime Hours: ${sunrise} - ${sunset}<div>
        `;

        locDiv.innerHTML = locInfo;
    //-- Location -------------------------------------------

    const weatherDisplay = `
        <div>
            <ul>
                <li>VISIBILITY: ${visibility}</li>
                <li>WINDSPEED: ${wind.speed}</li>
            </ul>
        </div>
    `;

    theDiv.innerHTML = weatherDisplay;}

    console.log('WEATHER', theWeather)
});