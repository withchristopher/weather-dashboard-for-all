// Variables
var searchButton = $(".searchButton");
var apiKey = "6748d3b49486c03195f28ed7332c5761";

for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  // Local Storage City Name
  var cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;
// Search Button click event
searchButton.click(function () {
  var searchInput = $(".searchInput").val();

  // Current Weather
  var urlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput +
    "&Appid=" +
    apiKey +
    "&units=metric";
  // 5 Day Forecast
  var urlFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInput +
    "&Appid=" +
    apiKey +
    "&units=imperial";

  if (searchInput == "") {
    console.log(searchInput);
  } else {
    $.ajax({
      url: urlCurrent,
      method: "GET",
    }).then(function (response) {
      var cityName = $(".list-group").addClass("list-group-item");
      cityName.append("<li>" + response.name + "</li>");
      // Local storage
      var local = localStorage.setItem(keyCount, response.name);
      keyCount = keyCount + 1;

      // Start Current Weather
      var currentCard = $(".currentCard").append("<div>").addClass("card-body");
      currentCard.empty();
      var currentName = currentCard.append("<p>");

      currentCard.append(currentName);

      // Adjust Date
      var timeUTC = new Date(response.dt * 1000);
      currentName.append(
        response.name + " " + timeUTC.toLocaleDateString("en-US")
      );
      currentName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );
      // Add Temp
      var currentTemp = currentName.append("<p>");
      currentName.append(currentTemp);
      currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
      // Add Humidity
      currentTemp.append(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      );
      // Add Wind
      currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

      var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=3ed8c90edb17145eed280307318a665b&lat=${response.coord.lat}&lon=${response.coord.lon}`;

      // UV Index
      $.ajax({
        url: urlUV,
        method: "GET",
      }).then(function (response) {
        var currentUV = currentTemp
          .append("<p>" + "UV Index: " + response.value + "</p>")
          .addClass("card-text");
        currentUV.addClass("UV");
        currentTemp.append(currentUV);
      });
    });

    // Start call for 5-day forecast
    $.ajax({
      url: urlFiveDay,
      method: "GET",
    }).then(function (response) {
      // Array
      var day = [0, 8, 16, 24, 32];
      var fiveDayCard = $(".fiveDayCard").addClass("card-body");
      var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
      fiveDayDiv.empty();

      day.forEach(function (i) {
        var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
        FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

        fiveDayDiv.append(
          "<div class=fiveDayColor>" +
            "<p>" +
            FiveDayTimeUTC1 +
            "</p>" +
            `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
            "<p>" +
            "Temperature: " +
            response.list[i].main.temp +
            "</p>" +
            "<p>" +
            "Humidity: " +
            response.list[i].main.humidity +
            "%" +
            "</p>" +
            "</div>"
        );
      });
    });
  }
});
