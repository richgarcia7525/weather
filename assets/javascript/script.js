moment().format("L");

function createWeatherIcon(icon) {
  var currentIcon = $("<img>").attr(
    "src",
    `http://openweathermap.org/img/wn/${icon}.png`
  );

  currentIcon.attr("style", "height: 60px; width: 60px");

  return currentIcon;
}

function getForecast(cityname) {
  var queryURLforcast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&units=imperial&appid=6fbc1c87443bfca2e8246c2411b29403";

  $.ajax({
    url: queryURLforcast,
    method: "GET",
  }).then(function (response) {
    // Storing an array of results in the results variable
    var results = response.list;
    //empty 5day div--------
    $("#5day").empty();
    //create HTML for 5day forcast................
    for (var i = 0; i < results.length; i += 8) {
      // Creating a div
      var fiveDayDiv = $(
        "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
      );

      //Storing the responses date temp and humidity.......
      var date = results[i].dt_txt;
      var setD = date.substr(0, 10);
      var temp = results[i].main.temp;
      var hum = results[i].main.humidity;

      //creating tags with the result items information.....
      var h5date = $("<h5 class='card-title'>").text(setD);
      var pTemp = $("<p class='card-text'>").text("Temp: " + temp);
      var pHum = $("<p class='card-text'>").text("Humidity " + hum);

      var weather = results[i].weather[0].main;

      console.log("asdf", results[i].weather[0].icon);
      const icon = createWeatherIcon(results[i].weather[0].icon);

      //append items to.......
      fiveDayDiv.append(h5date);
      fiveDayDiv.append(icon);
      fiveDayDiv.append(pTemp);
      fiveDayDiv.append(pHum);
      $("#5day").append(fiveDayDiv);
    }
  });
}

function getUV(lat, lon) {
  var queryURLUV =
    "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" +
    lat +
    "&lon=" +
    lon;

  $.ajax({
    url: queryURLUV,
    method: "GET",
  }).then(function (response) {
    $("#uvl-display").empty();
    //create HTML for new div
    var uvlEl = $("<button class='btn bg-success'>").text(
      "UV Index: " + response.value
    );

    $("#uvl-display").html(uvlEl);
  });
}
//Current City Weather//
function searchCity(cityname) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=6fbc1c87443bfca2e8246c2411b29403";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log("queryURL response", response);
    //create HTML for city information.....
    var cityNameEl = $("<h2>").text(cityname);
    var displayMainDate = cityNameEl.append(
      " " + new Date().toLocaleDateString()
    );
    var tempEL = $("<p>").text("Tempraturer: " + response.main.temp);
    var humEl = $("<p>").text("Humidity: " + response.main.humidity);
    var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
    var currentweather = response.weather[0].main;

    const currentIcon = createWeatherIcon(response.weather[0].icon);

    //create HTML div to append new elements to render on page....
    var newDiv = $("<div>");

    newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

    $("#current").html(newDiv);

    //--------------------------------------------- UV call ---------------------------------------//

    var lat = response.coord.lat;
    var lon = response.coord.lon;

    getUV(lat, lon);
    getForecast(cityname);
  });
}

//----------------------------------------Event handler for user city search-----------------------//

//---------------------------Call stored items on page load-------------------------------------//
function pageLoad() {
  var lastSearch = JSON.parse(localStorage.getItem("cityName"));
  var searchDiv = $(
    "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>"
  ).text(lastSearch);
  var psearch = $("<div>");
  psearch.append(searchDiv);
  $("#searchhistory").prepend(psearch);
}

function addEventListern() {
  $("#searchhistory").on("click", ".btn", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
  });

  $("#select-city").on("click", function (event) {
    // Preventing the button from trying to submit the form......
    event.preventDefault();
    // Storing the city name........
    var cityInput = $("#city-input").val().trim();

    //save search term to local storage.....
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storearr));

    searchCity(cityInput);
    pageLoad();
  });
}

function iniatlize() {
  addEventListern();
}

iniatlize();
