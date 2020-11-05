const searchin = document.getElementById("searchInput");
searchin.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) getWeather(searchInput.value);
});

function getPosition() {
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`;
  $.getJSON(apiCall, weatherCallBack);
}

function error() {
// If the user refuses to share their location, they can use the search box //
}
}

getPosition();


function getWeather() {
  let searchMethod;
  let searchTerm = $(".searchInput").val();
  if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
    searchMethod = "zip";
    searchTerm = `${searchTerm},us`
  } else {
    searchMethod = "q";
  }
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${process.env.API_KEY}&units=metric`;
  if (searchInput.value === "") {
    alert("Insert a city name!");
  } else {
    $.getJSON(apiCall, weatherCallBack);
  }
}


  function weatherCallBack(weatherData) {
    switch (weatherData.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url('img/clear.jpg')";
      break;

    case "Clouds":
    document.body.style.backgroundImage = "url('img/clouds.jpg')";
      break;

    case "Rain":
    case "Drizzle":
      document.body.style.backgroundImage = "url('img/rain.jpg')";
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('img/snow.jpg')";
      break;

    case "Fog":
    case "Smoke":
    case "Haze":
    case "Mist":
      document.body.style.backgroundImage = "url('img/fog.jpg')";
      break;

    case "Squalls":
    case "Tornado":
      document.body.style.backgroundImage = "url('img/squalls.jpg')";
      break;

    default:
      document.body.style.backgroundImage = "url('img/backgr.jpg')";

  }

  let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
  weatherDescriptionHeader.innerHTML = weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1);

  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${Math.floor(Number(weatherData.main.temp))}°C`;


  let cityHeader = document.getElementById("cityHeader");
  cityHeader.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;

  let weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";

  let todayDate = document.getElementById("todayDate");
  todayDate.innerHTML = currentDate();

document.querySelector(".searchInput").value = '';
weatherContainer.style.visibility = "visible";
}

function currentDate() {
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var month = months[Number(mm) - 1];
  var day = days[today.getDay()];
  var yyyy = today.getFullYear();
  today = `${day}, ${dd} ${month} ${yyyy}`;
  return today;
}
