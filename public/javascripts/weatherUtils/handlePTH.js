
export function handlePTH(main){
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

    const humDiv = document.getElementById('humidity');
    const humInfo = `
            <h2>Humidity: ${main.humidity}%</h2>
    `;
    humDiv.innerHTML = humInfo;
}