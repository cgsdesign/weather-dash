//Plan:
//make HTML page outline ^.^
//set up on click response for city ^.^
//set up cards (bootstrap) ^.^
//set up weather API
    //to fetch:
    // city name, date & 
    // Current: wather condition (icon/image) temp, humidity, wind speed, UV(color coded)
    //5 day: weather, wind spd, humidity, temp
// city added to search history   
var cityNameEl = document.querySelector("#city-name-input");
var enterCityFm = document.querySelector("#enter-city");
//api.openweathermap.org/data/2.5/forecast?q={city-nameEl}&appid=652c40e17c760d30cfab1ca9c73642ff

var getWeather = function(local) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameEl + "&appid=652c40e17c760d30cfab1ca9c73642ff"
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {// .ok tells if response was in 200s so it works
        response.json().then(function(data) {
          console.log(data, local);
        });
      } else { // alerts that there was a404 etc.
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
      console.log(cityNameEl)
      cityNameEl = cityname
      getWeather(cityname)
      //add function to add city into past city logs
      cityNameEl.value = ""//reset value to none after running search
    }
    else {
      alert("Please enter a city name.")
    }
  }

enterCityFm.addEventListener("submit", formSubmitHandler)