
window.addEventListener('DOMContentLoaded', async(event) => {

    //secret
    const fetchCode = document.getElementById('fetchCode').value;
    //grab rock image div
    const rockBox = document.getElementById('rockContainer');
    const rock = document.getElementById('rock');

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

        console.log(searchString)

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
    const cloudDiv = document.getElementById('clouds');

    let cloudInfo;

    if(clouds.all) {
        if (clouds.all < 11) {
            cloudInfo = 'Clear skies'
            rock.style.filter = "brightness(100%)"
        } else if (clouds.all > 10 && clouds.all < 26) {
            cloudInfo = 'Small clouds'
            rock.style.filter = "brightness(80%)"
        } else if (clouds.all > 25 && clouds.all < 51) {
            cloudInfo = 'Partly Cloudy'
            rock.style.filter = "brightness(70%)"
        } else if (clouds.all > 50 && clouds.all < 76) {
            cloudInfo = 'Moderately Cloudy'
            rock.style.filter = "brightness(60%)"
        } else {
            cloudInfo = 'Heavy Clouds'
            rock.style.filter = "brightness(50%)"
        }
    } else {
        cloudInfo = 'No data'
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
                pressureInfo = '<h2>Low pressure, instability possible</h2>'
            } else if (main.pressure > 1030) {
                pressureInfo = '<h2>High pressure, stability possible</h2>'
            } else {
                pressureInfo = '<h2>Pressure is within normal range. Stability likely.</h2>'
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
                <h2>Current Temp: ${tempC}C / ${tempF}F</h2>
                <h2>Range: ${minC}C / ${minF}F - ${maxC}C / ${maxF}F</h2>
        `;

        tempDiv.innerHTML = tempInfo;
    //-- Temperature ------------------------------------

    //-- Humidity -----------------------------------------
        const humDiv = document.getElementById('humidity');

        const humInfo = `
                <h2>Humidity: ${main.humidity}%</h2>
        `;

        humDiv.innerHTML = humInfo;
    //-- Humidity -----------------------------------------

    //-- Location -------------------------------------------
        const locDiv = document.getElementById('location');

        const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const sunset = new Date(sys.sunset * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})

        const locInfo = `
            <div>${name}, ${sys.country}</div>
            <div>${weather[0].main} (${weather[0].description})</div>
            <div>Daytime Hours: ${sunrise} - ${sunset}</div>
        `;

        locDiv.innerHTML = locInfo;
    //-- Location -------------------------------------------
    //-- Generic Info -------------------------------------
    const theDiv = document.getElementById('generic');

    const weatherDisplay = `
                <div>VISIBILITY: ${visibility}</div>
                <div>WINDSPEED: ${wind.speed}</div>
    `;
    
    console.log('WIIIND', wind.speed)
    
        if (wind.speed < 1) {
            rockBox.style.animation = 'rockSwing0 1s infinite';
        } else if (wind.speed < 5 && wind.speed >= 1) {
            rockBox.style.animation = 'rockSwing1 1s infinite';
        } else if (wind.speed >= 5 && wind.speed < 10) {
            rockBox.style.animation = 'rockSwing2 1s infinite';
        } else if (wind.speed >= 10 && wind.speed < 20) {
            rockBox.style.animation = 'rockSwing3 1s infinite';
        } else if (wind.speed >= 20) {
            rockBox.style.animation = 'rockSwing4 1s infinite';
        } 
 
    console.log(rockBox.style)

    theDiv.innerHTML = weatherDisplay;
    }
});