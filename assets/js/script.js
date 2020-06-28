//Script
var searchButtonEl = document.querySelector("#searchButton");
var searchInput = document.querySelector("#searchInput");
var apiKey = "6748d3b49486c03195f28ed7332c5761";

// Local storage
var getLastCity = function () {

   
    
    for (var i =0; i < .localStorage.length; i++) {
       // create variables
        var city = localStorage.getItem(i);

        city.toUpperCase();
    }
}

var searchButton = function () {

    
    // Current Weather  
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";
    // 5 Day Forecast 
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";

    fetch(urlCurrent)
    .then(function(response){
        return response.json();
    })
    .then(function(data))
    
}

searchButtonEl.addEventHandler("submit", seachButton)