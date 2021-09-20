
export function handleClouds(clouds) {
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
}