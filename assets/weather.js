var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#cityname");

var getWeather = function(city) {
    // format the url
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=38cd1b26a62d14a9fc6242f43a61ddaa";

    // make a request to the url 
    fetch(currentUrl).then(function(response) {
        response.json().then(function(data) {
            displayCurrent(data);
        });
    });
};

// var get5Day = function(city) {
//     // format the url
//     var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=38cd1b26a62d14a9fc6242f43a61ddaa";

//     // make a request to the url
//     fetch(forecastUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });
// };

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var cityname = nameInputEl.value.trim();

    if (cityname) {
        getWeather(cityname);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

var displayCurrent = function(name,temp,wind,humidity) {
    name = 
    console.log(temp);
    console.log(wind);
    console.log(humidity);
}

// How could I use jquery to accomplish this same result? 
cityFormEl.addEventListener("submit", formSubmitHandler); 

