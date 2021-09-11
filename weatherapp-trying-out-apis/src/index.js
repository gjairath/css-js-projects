import * as api from './api.js';


function test(){
     input.select();
}

async function processData(url) {
    const ret = await api.getWeatherData(url);
    if (ret.cod == "404") {
        alert("City not found, try again with state code or something");
        on_page_load();
        return;
    }
            
    // I want the coordinates for a full 7 day forecast.
        // Fetch from the other place.
    let forecast_url = api.buildWeeklyUrl(ret.coord);
    let forecast_data = await api.getWeatherData(forecast_url);

    console.log(ret);
    console.log(forecast_data);


    display_data(ret.name.toUpperCase() + `, ` + ret.sys.country.toUpperCase(), forecast_data);
}

async function loadGIF() {
    let weatherGIF = await api.getWeatherGIF();

    const img = document.querySelector('img');
    img.src = weatherGIF.data.images.original.url;
}


function on_page_load() {
    // set the default stuff.
    main_container.innerHTML = `<div id="container-inside">
                                <div id="text-inside">
                                <h1> What's <br> The <br> Weather <br> Like? </h1>
                                Search by: city name, state code and country code.
                                <button class="btn" id="find-out"> Find Out. </button>
                                </div>
                                <div id="gif">
                                <img>
                                </div>
                                </div>`;

    document.getElementById("text-inside").classList.add('text-inside');
    
    
    loadGIF();
    document.getElementById("find-out").onclick = test;    
}

function display_data(cityName, data){

    var alert = 'No Weather Warnings.';
    if (data.alerts) {
        alert = `${data.alerts.sender_name}: ${data.alerts.event}`;
    }

    main_container.innerHTML = `            <div class="title-forecast">
                <button id="warning"> <span class="material-icons">
                                    warning
                                    </span></button>
                                        
                          <div class="popover-content" id="popover-content">
                          ${alert}
                          </div>

                7 DAY FORECAST (${cityName})
                <div id="divider"> </div>
            </div>
            
            <div class="card-content">
                <div class="card-grid" id="card-grid">
                </div>
            </div>   `;
            

    const card_grid = document.getElementById("card-grid");
    
    // add 7 cards of varying heights as per the weather forecast.
    var date = new Date();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    var mean_value = data.daily[0].feels_like.day;
    for (let i = 1; i <= 6; i++) {
        mean_value += data.daily[i].feels_like.day;
    }
    mean_value /= 7;
        
    for (let i = 0; i <= 6; i ++) {    
        const card = document.createElement('div');
        card.classList.add("card");
        
        const temperature_heading = document.createElement('div');
        temperature_heading.textContent = parseInt(data.daily[i].feels_like.day) + `°C`;
        temperature_heading.classList.add('title-heading');
        
        const sub_heading = document.createElement('div');
        sub_heading.textContent = data.daily[i].weather[0].description.toUpperCase();
        sub_heading.classList.add('sub-heading');
        
        const icon = document.createElement('div');
        icon.classList.add('icon-img');
        let icon_id = data.daily[i].weather[0].icon;

        let url_string = `url(http://openweathermap.org/img/wn/${icon_id}@2x.png)`;
        icon.style.backgroundImage = url_string;
                
        const day = document.createElement('div');
        day.textContent = days[date.getDay()];
        if (day.textContent == `SAT` || day.textContent == `SUN`) {
            day.classList.add('sexy-box');
        }
        day.classList.add('day-heading');
        
        let delta = Math.abs(mean_value - data.daily[i].feels_like.day);
        if (delta <= 0.5) {
            card.style.height = `90%`;
        } else {
            if (data.daily[i].feels_like.day > mean_value) {
                let height = 90 + delta * 2 + 5;
                card.style.height = `${height}%`;
            } else {
                let height = 90 - delta * 2 - 5;
                card.style.height = `${height}%`;                
            }
        }
        
        card.appendChild(temperature_heading);
        card.appendChild(sub_heading);
        card.appendChild(icon);
        
        icon.appendChild(day);
        
        card_grid.appendChild(card);
        
        date.setDate(date.getDate() + 1);
    }
}

// ------------------------------------------------------------------------------
                            // DRIVING CODE
// ------------------------------------------------------------------------------
// NODES
const main_container = document.getElementById("container-below")
const input = document.getElementById("search");
const home_page = document.getElementById("icon");

home_page.onclick = on_page_load;

// set default load
on_page_load();

// EVENT-FIRERS
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let url = api.buildUrl(input.value);
    processData(url);
  }
});