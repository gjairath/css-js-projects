/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getWeatherData\": () => (/* binding */ getWeatherData),\n/* harmony export */   \"getWeatherGIF\": () => (/* binding */ getWeatherGIF),\n/* harmony export */   \"buildUrl\": () => (/* binding */ buildUrl),\n/* harmony export */   \"buildWeeklyUrl\": () => (/* binding */ buildWeeklyUrl)\n/* harmony export */ });\nlet key = `37338cb594adeb7c8e600bb49880be5e`;\r\n\r\nfunction buildUrl(cityName) {\r\n    // if the user enters stupid input, the fetch will fail that case is handled there\r\n    var newName = cityName.replace(/ /g,'').toLowerCase();\r\n    \r\n    let url = `http://api.openweathermap.org/data/2.5/weather?q=${newName}&appid=${key}`\r\n    return url;\r\n}\r\n\r\nfunction buildWeeklyUrl(coord) {\r\n    //current minutely hourly daily alerts\r\n    let lon = coord.lon;\r\n    let lat = coord.lat;\r\n    \r\n    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${key}&units=metric`;\r\n    return url;\r\n}\r\n\r\n\r\nasync function getWeatherGIF() {\r\n    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=Yrholhw1RXbjYhW5RGqYJuO0QOOIT24j&s=weather&rating=g', {mode: 'cors'});\r\n    const gif = await response.json();\r\n    \r\n    return gif\r\n}\r\n  \r\n  \r\nasync function getWeatherData(url) {\r\n    console.log(url);\r\n     try {\r\n        const response = await fetch(url, {mode: 'cors'});\r\n        const weatherData = await response.json();\r\n        \r\n        console.log(weatherData);\r\n        return weatherData;\r\n    } catch (error) {\r\n        console.log(error);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n\r\n\r\n\r\nfunction test(){\r\n     input.select();\r\n}\r\n\r\nasync function processData(url) {\r\n    const ret = await _api_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherData(url);\r\n    if (ret.cod == \"404\") {\r\n        alert(\"City not found, try again with state code or something\");\r\n        on_page_load();\r\n        return;\r\n    }\r\n            \r\n    // I want the coordinates for a full 7 day forecast.\r\n        // Fetch from the other place.\r\n    let forecast_url = _api_js__WEBPACK_IMPORTED_MODULE_0__.buildWeeklyUrl(ret.coord);\r\n    let forecast_data = await _api_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherData(forecast_url);\r\n\r\n    console.log(ret);\r\n    console.log(forecast_data);\r\n\r\n\r\n    display_data(ret.name.toUpperCase() + `, ` + ret.sys.country.toUpperCase(), forecast_data);\r\n}\r\n\r\nasync function loadGIF() {\r\n    let weatherGIF = await _api_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherGIF();\r\n\r\n    const img = document.querySelector('img');\r\n    img.src = weatherGIF.data.images.original.url;\r\n}\r\n\r\n\r\nfunction on_page_load() {\r\n    // set the default stuff.\r\n    main_container.innerHTML = `<div id=\"container-inside\">\r\n                                <div id=\"text-inside\">\r\n                                <h1> What's <br> The <br> Weather <br> Like? </h1>\r\n                                Search by: city name, state code and country code.\r\n                                <button class=\"btn\" id=\"find-out\"> Find Out. </button>\r\n                                </div>\r\n                                <div id=\"gif\">\r\n                                <img>\r\n                                </div>\r\n                                </div>`;\r\n\r\n    document.getElementById(\"text-inside\").classList.add('text-inside');\r\n    \r\n    \r\n    loadGIF();\r\n    document.getElementById(\"find-out\").onclick = test;    \r\n}\r\n\r\nfunction display_data(cityName, data){\r\n\r\n    var alert = 'No Weather Warnings.';\r\n    if (data.alerts) {\r\n        alert = `${data.alerts.sender_name}: ${data.alerts.event}`;\r\n    }\r\n\r\n    main_container.innerHTML = `            <div class=\"title-forecast\">\r\n                <button id=\"warning\"> <span class=\"material-icons\">\r\n                                    warning\r\n                                    </span></button>\r\n                                        \r\n                          <div class=\"popover-content\" id=\"popover-content\">\r\n                          ${alert}\r\n                          </div>\r\n\r\n                7 DAY FORECAST (${cityName})\r\n                <div id=\"divider\"> </div>\r\n            </div>\r\n            \r\n            <div class=\"card-content\">\r\n                <div class=\"card-grid\" id=\"card-grid\">\r\n                </div>\r\n            </div>   `;\r\n            \r\n\r\n    const card_grid = document.getElementById(\"card-grid\");\r\n    \r\n    // add 7 cards of varying heights as per the weather forecast.\r\n    var date = new Date();\r\n    let days = [\"SUN\", \"MON\", \"TUE\", \"WED\", \"THU\", \"FRI\", \"SAT\"];\r\n    \r\n    var mean_value = data.daily[0].feels_like.day;\r\n    for (let i = 1; i <= 6; i++) {\r\n        mean_value += data.daily[i].feels_like.day;\r\n    }\r\n    mean_value /= 7;\r\n        \r\n    for (let i = 0; i <= 6; i ++) {    \r\n        const card = document.createElement('div');\r\n        card.classList.add(\"card\");\r\n        \r\n        const temperature_heading = document.createElement('div');\r\n        temperature_heading.textContent = parseInt(data.daily[i].feels_like.day) + `°C`;\r\n        temperature_heading.classList.add('title-heading');\r\n        \r\n        const sub_heading = document.createElement('div');\r\n        sub_heading.textContent = data.daily[i].weather[0].description.toUpperCase();\r\n        sub_heading.classList.add('sub-heading');\r\n        \r\n        const icon = document.createElement('div');\r\n        icon.classList.add('icon-img');\r\n        let icon_id = data.daily[i].weather[0].icon;\r\n\r\n        let url_string = `url(http://openweathermap.org/img/wn/${icon_id}@2x.png)`;\r\n        icon.style.backgroundImage = url_string;\r\n                \r\n        const day = document.createElement('div');\r\n        day.textContent = days[date.getDay()];\r\n        if (day.textContent == `SAT` || day.textContent == `SUN`) {\r\n            day.classList.add('sexy-box');\r\n        }\r\n        day.classList.add('day-heading');\r\n        \r\n        let delta = Math.abs(mean_value - data.daily[i].feels_like.day);\r\n        if (delta <= 0.5) {\r\n            card.style.height = `90%`;\r\n        } else {\r\n            if (data.daily[i].feels_like.day > mean_value) {\r\n                let height = 90 + delta * 2 + 5;\r\n                card.style.height = `${height}%`;\r\n            } else {\r\n                let height = 90 - delta * 2 - 5;\r\n                card.style.height = `${height}%`;                \r\n            }\r\n        }\r\n        \r\n        card.appendChild(temperature_heading);\r\n        card.appendChild(sub_heading);\r\n        card.appendChild(icon);\r\n        \r\n        icon.appendChild(day);\r\n        \r\n        card_grid.appendChild(card);\r\n        \r\n        date.setDate(date.getDate() + 1);\r\n    }\r\n}\r\n\r\n// ------------------------------------------------------------------------------\r\n                            // DRIVING CODE\r\n// ------------------------------------------------------------------------------\r\n// NODES\r\nconst main_container = document.getElementById(\"container-below\")\r\nconst input = document.getElementById(\"search\");\r\nconst home_page = document.getElementById(\"icon\");\r\n\r\nhome_page.onclick = on_page_load;\r\n\r\n// set default load\r\non_page_load();\r\n\r\n// EVENT-FIRERS\r\ninput.addEventListener(\"keyup\", function(event) {\r\n  if (event.keyCode === 13) {\r\n    event.preventDefault();\r\n    let url = _api_js__WEBPACK_IMPORTED_MODULE_0__.buildUrl(input.value);\r\n    processData(url);\r\n  }\r\n});\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;