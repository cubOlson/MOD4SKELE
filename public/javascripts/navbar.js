window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOM fully loaded and parsed');

    const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Chattanooga&appid=f379b3857c328f3085b067f960c64d13').then(response => response.json());

    console.log('WEATHER', weather)
});