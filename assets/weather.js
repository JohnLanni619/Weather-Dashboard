var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#cityname");
var date = moment().format('MMMM Do, YYYY');
var time = moment().format('hh:mm:ss');
// var createButton = $("#cities"); 

var getWeather = function(city) {
    // format the url
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=38cd1b26a62d14a9fc6242f43a61ddaa";

    // make a request to the url 
    $.ajax({
        url: currentUrl,
        method: "GET"
    }).then(function (response) {

        let cityDiv = $("#city");
        let tempDiv = $("#temp");
        let windDiv = $("#wind");
        let humidityDiv = $("#humidity");

        cityDiv.empty();
        tempDiv.empty();
        windDiv.empty();
        humidityDiv.empty();

        let currentDate = (response.name);
        let currentTemp = (response.main.temp);
        let currentWind = (response.wind.speed + " MPH");
        let currentHumidity = (response.main.humidity + "%");
        
        $("#city").append(currentDate + " " + date + " " + time);
        $("#temp").append(currentTemp);
        $("#wind").append(currentWind);
        $("#humidity").append(currentHumidity);
    })

};

var getForecast = function(city) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=38cd1b26a62d14a9fc6242f43a61ddaa";
    // make a request to the url
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //Creating cards
        let forecastDiv = $("#forecast");
        let day = response.list;

        forecastDiv.empty();

        // For each for 5 days
        for (let i = 4; i < day.length; i += 8) {

            // Making a div with 2 classes to append to later
            let fiveDayCard = $("<div>").addClass("card forecastColor");
            let FiveDayTime = new Date(response.list[i].dt * 1000);
            // Setting string to five day time 
            FiveDayTime = FiveDayTime.toLocaleDateString("en-US");
            fiveDayCard.html("<p>" + FiveDayTime + "</p>" + `<img src='https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png'>` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>")

            forecastDiv.append(fiveDayCard);
        }
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var cityName = nameInputEl.value.trim();

    if (cityName) {
        getWeather(cityName);
        getForecast(cityName);
        createButton(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

// Trying to figure out how to make a button with previously searched city names.
var createButton = function(cityName) {
    // create a new div element
    const newButton = document.createElement("button");
    newButton.setAttribute('id','previous');

    // and give it some content
    const buttonContent = document.createTextNode(cityName);

    // add the text node to the newly created div
    newButton.appendChild(buttonContent);

    // add the newly created element and its content into the DOM
    document.getElementById("cities").appendChild(newButton);

    var element = document.getElementById("previous");
    element.classList.add("btn-block"); 

};

// How could I use jquery to accomplish this same result? 
cityFormEl.addEventListener("submit", formSubmitHandler);