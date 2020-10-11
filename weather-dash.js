//Plan:
//make HTML page outline ^.^
//set up on click response for city ^.^
//set up cards (bootstrap) ^.^
//set up weather API ^.^
    //to fetch:
    // city name, date & 
    // Current: wather condition (icon/image) temp, humidity, wind speed, UV(color coded)
    //5 day: weather, wind spd, humidity, temp
// city added to search history   
var cityNameEl = document.querySelector("#city-name-input");
var enterCityFm = document.querySelector("#enter-city");
var cityListEl = document.querySelector("#city-list");
var currentWeatherContainerEl = document.querySelector("#current");
var cityEl = document.querySelector("#city");
var tempCur = document.querySelector(".stats");

//api.openweathermap.org/data/2.5/forecast?q={city-nameEl}&appid=652c40e17c760d30cfab1ca9c73642ff


//"https://api.openweathermap.org/data/2.5/onecall?lat="+latEl+"&lon="+lonEl+"&exclude=hourly,minitely,alerts&appid=652c40e17c760d30cfab1ca9c73642ff&units=imperial"
//
var InputCurrentWeather = function(data,city){
    cityEl.innerHTML = city
    var tempCur = document.querySelector(".stats");
  tempCur.innerHTML = "Temp: " +data.main.temp+"<br> Wind Speed: " +data.wind.speed + "<br> Weather: " + data.weather[0].description;
  }

//most info via lat lon pull
var getViaLatLon = function(url) {
    // make a request to the url
    console.log(url)
    fetch(url)
    .then(function(response) {
      // request was successful
      if (response.ok) {// .ok tells if response was in 200s so it works
        response.json().then(function(data) {
          console.log(data)
          uv = "uvi: " + data.current.uvi
          
          document.getElementById("uv").append(uv)
        });

    } else { 
        // alerts that there was a404 etc. - Also says if city is not real ^.^
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method - for no internet conection
      alert("Unable to connect to Weather Tracker");
    });
  };


var getWeather = function(local) {
    // format the weather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl.value + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial"
    latEl=""
    lonEl=""
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {// .ok tells if response was in 200s so it works
        response.json().then(function(data) {
          InputCurrentWeather(data,local);
          latEl = data.coord.lat
          lonEl = data.coord.lon
          console.log(data)
          var apiUrlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat="+latEl+"&lon="+lonEl+"&exclude=hourly,minutely,alerts&appid=652c40e17c760d30cfab1ca9c73642ff&units=imperial"
          getViaLatLon(apiUrlTwo)
        });

    } else { 
        // alerts that there was a404 etc. - Also says if city is not real ^.^
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method - for no internet conection
      alert("Unable to connect to Weather Tracker");
    });
  };


  var formSubmitHandler = function() {
    //prevent blank entry
    event.preventDefault()
    //get value of input element
    var cityname = cityNameEl.value.trim()// .trim is in case the user name submited acceidentaly has a space at one of the ends
    if (cityname) {
      console.log("city "+cityname+" entered" )
      getWeather(cityname)
      //add function to add city into past city logs
      cityNameEl.value = ""//reset value to none after running search
    }
    else {
      alert("Please enter a city name.")
    }
  }

enterCityFm.addEventListener("submit", formSubmitHandler)