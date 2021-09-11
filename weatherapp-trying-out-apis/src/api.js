let key = `37338cb594adeb7c8e600bb49880be5e`;

function buildUrl(cityName) {
    // if the user enters stupid input, the fetch will fail that case is handled there
    var newName = cityName.replace(/ /g,'').toLowerCase();
    
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${newName}&appid=${key}`
    return url;
}

function buildWeeklyUrl(coord) {
    //current minutely hourly daily alerts
    let lon = coord.lon;
    let lat = coord.lat;
    
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${key}&units=metric`;
    return url;
}


async function getWeatherGIF() {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=Yrholhw1RXbjYhW5RGqYJuO0QOOIT24j&s=weather&rating=g', {mode: 'cors'});
    const gif = await response.json();
    
    return gif
}
  
  
async function getWeatherData(url) {
    console.log(url);
     try {
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

export {getWeatherData, getWeatherGIF, buildUrl, buildWeeklyUrl};