moment().format("L");

//Current City Weather//
function searchCity(cityname) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=6fbc1c87443bfca2e8246c2411b29403";
  var queryURLforcast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&units=imperial&appid= 6fbc1c87443bfca2e8246c2411b29403";

  //create HTML for city information......
  var cityNameEl = $("<h2>").text(response.name);
  var displayMainDate = cityNameEl.append(" " + mainDate);
  var tempEL = $("<p>").text("Tempraturer: " + response.main.temp);
  var humEl = $("<p>").text("Humidity: " + response.main.humidity);
  var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
  var currentweather = response.weather[0].main;

  if (currentweather === "Rain") {
    var currentIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/09d.png"
    );
    currentIcon.attr("style", "height: 60px; width: 60px");
  } else if (currentweather === "Clouds") {
    var currentIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/03d.png"
    );
    currentIcon.attr("style", "height: 60px; width: 60px");
  } else if (currentweather === "Clear") {
    var currentIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/01d.png"
    );
    currentIcon.attr("style", "height: 60px; width: 60px");
  } else if (currentweather === "Drizzle") {
    var currentIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/10d.png"
    );
    currentIcon.attr("style", "height: 60px; width: 60px");
  } else if (currentweather === "Snow") {
    var currentIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/13d.png"
    );
    currentIcon.attr("style", "height: 60px; width: 60px");
  }
  