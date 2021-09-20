
export function handleLocation(weather, sys){
    const locDiv = document.getElementById('location');
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    const locInfo = `
        <div>${name}, ${sys.country}</div>
        <div>${weather[0].main} (${weather[0].description})</div>
        <div>Daytime Hours: ${sunrise} - ${sunset}</div>
    `;
    locDiv.innerHTML = locInfo;
}