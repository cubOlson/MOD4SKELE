
 export function handleRain(weather, wind){
    //clear out everything
    const rainBoxes = document.querySelectorAll('.rain');
    const rainFrontRow = document.querySelector('.front-row');
    const rainBackRow = document.querySelector('.back-row');
    rainBoxes.forEach(ele => {
        ele.innerHTML = "";
    });

    let increment = 0;
    let drops = "";
    let backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      let randoFiver = (Math.floor(Math.random() * (3) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
    
  if (weather[0].description.toLowerCase().includes('rain')){
    rainFrontRow.innerHTML = drops;
    rainBackRow.innerHTML = backDrops;
    const dropDivs = document.querySelectorAll('.drop');
    dropDivs.forEach(ele => {
      if (wind.speed < 1) {
        ele.style.animationName = 'drop0';
      } else if (wind.speed < 5 && wind.speed >= 1) {
        ele.style.animationName = 'drop1';
      } else if (wind.speed >= 5 && wind.speed < 10) {
        ele.style.animationName = 'drop2';
      } else if (wind.speed >= 10 && wind.speed < 20) {
        ele.style.animationName = 'drop3';
      } else if (wind.speed >= 20) {
        ele.style.animationName = 'drop4';
      } 
    });
  }
}
