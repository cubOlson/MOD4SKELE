
export function handleGeneric(visibility, wind){
    const theDiv = document.getElementById('generic');
    const rockBox = document.getElementById('rockContainer');
    
    const weatherDisplay = `
            <div>VISIBILITY: ${visibility}</div>
            <div>WINDSPEED: ${wind.speed}</div>
    `;

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

theDiv.innerHTML = weatherDisplay;
}