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
//look up switchcase logic

    // var dayEl=[
    //     document.getElementById("day-1"),
    //     document.getElementById("day-2"),
    //     document.getElementById("day-3"),
    //     document.getElementById("day-4"),
    //     document.getElementById("day-5"),
    // ]

var dailyEl = function(data){

    crrtDateGiv = parseInt(data.daily[0].dt+"000")//date works!!!
    console.log(crrtDateGiv)
    crrtDateWant = new Date(crrtDateGiv).toDateString()
    console.log(crrtDateWant)
    var crrtDateFini = document.getElementById(`date`)//find id
    crrtDateFini.textContent=crrtDateWant


    for(i=1;i<=5;i++){
    var clear = document.getElementById(`day-${[i]}`)//remove old info
    clear.innerHTML = ""

    //5 dates
    dateGiv = parseInt(data.daily[i].dt+"000")//date works!!!
    console.log(dateGiv)
    dateWant = new Date(dateGiv).toDateString()
    console.log(dateWant)
    var dateFini = document.getElementById(`date-${[i]}`)//find id
    dateFini.textContent=dateWant

    //weather details
    var dayIcon = document.createElement("img");//create image element
    dayIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png")
    dayIcon.setAttribute("class", "icon")
    clear.append(dayIcon)//icon added
    var dayDetails = document.createElement("div");
    dayDetails.innerHTML = "<p><b>Temp in Far:</b> " +data.daily[i].temp.day+"</p><p> <b>Wind Speed MPH:</b> " +data.daily[i].wind_speed + "</p><p> <b>Weather:</b> " + data.daily[i].weather[0].description + "</p><p><b>Humidity:</b> " +data.daily[i].humidity+"</p>";
    //if/else uv.classList = "list-item flex-row justify-space-between align-center";
    clear.append(dayDetails)

}
}

var uviEl = function(data){
    clear = document.getElementById("uv")//remove old UVs
    clear.innerHTML = ""
    var uv = document.createElement("div");
    uv.textContent = "uvi: " + data.current.uvi;
    uvVal = data.current.uvi
    if (uvVal <=2){
      uv.setAttribute("class", "uvi-low")
    }
    else if (uvVal >2 || uvVal<6){
      uv.setAttribute("class", "uvi-med")
    }
    else{
      uv.setAttribute("class", "uvi-high")
    }
    //if/else uv.classList = "list-item flex-row justify-space-between align-center";
    document.getElementById("uv").append(uv)
}

var InputCurrentWeather = function(data,city){
    cityEl.innerHTML = city
    var tempCur = document.querySelector(".stats");
  tempCur.innerHTML = "Temperature in Farenheit: " +data.main.temp+"<br> Wind Speed MPH: " +data.wind.speed + "<br> Weather: " + data.weather[0].description;
  var currentIcon = document.getElementById("weather-icon");
  currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
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
          //uvi
          uviEl(data)
          //daily
          dailyEl(data)
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
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl.value + "&appid=652c40e17c760d30cfab1ca9c73642ff&units=imperial"
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
      pastCity(cityname)
    }
    else {
      alert("Please enter a city name.")
    }
  }

 function pastCity(city) {
    var liEl = document.createElement("li")
    var text = city;
    liEl.textContent = text;
    liEl.setAttribute("class", "city-btn")
    var historyEl = document.querySelector('#city-list');
    //make active link
    historyEl.onclick = function(){
        console.log(event.target.textContent)
        var ElToEnter = event.target.textContent
        cityNameEl.value = ElToEnter//have to replace this value as this is the one called in the function getWeather
        getWeather(ElToEnter)
    }
    //add list to site
    historyEl.appendChild(liEl);
  };

enterCityFm.addEventListener("submit", formSubmitHandler)