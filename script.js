var apiKey = "f406869994fe9cee8d7422cf86700d9f"
var denver = "Denver";

//var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + countrySearch + ",us" + "&APPID=" + apiKey;

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);


//   })

    var countrySearch = [];

    checkLocal();


    function renderSearch() {
            $(".state-list").empty();

        for (var i = 0; i < countrySearch.length; i++) {
            var listItem = countrySearch[i];
            var listEl = $("<li>");
            listEl.text(listItem);
            listEl.attr("data-index", i);
            $(".state-list").append(listEl);

        }
    }

    function checkLocal() {
        if (localStorage.getItem("locations") === null) {
            countrySearch = [];
        } else {
            countrySearch = JSON.parse(localStorage.getItem("locations"));
        }

        //console.log(countrySearch);
        renderSearch();

    }

    function storedLocations() {
        //added code to stringify country search array and save it to locations in localstorage
        countrySearch.value = localStorage.setItem("locations", JSON.stringify(countrySearch));
    }



$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var locationText = $("#search-bar").val().trim();

    // Return from function early if submitted location is blank
    if (locationText === "") {
        return;
    }

        //add new locations to the array, clear the input
        
        countrySearch.push(locationText);
        var searchVal = $("#search-bar");
        searchVal.val("");
        
        for (var i = 0; i < countrySearch.length; i++) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + countrySearch[i] + ",us" + "&APPID=" + apiKey;
        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + countrySearch[i] + ",us" + "&APPID=" + apiKey;

        }

    //API call for current weather
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response);
        console.log(countrySearch);

        //create divs in container
        var cityName = $("<div>");
        var temp = $("<div>");
        var humidity = $("<div>");
        var windspeed = $("<div>");
        var uvindex = $("<div>");

        //add class to divs
        cityName.addClass("city-name");
        temp.addClass("temperature");
        humidity.addClass("humidity");
        windspeed.addClass("wind-speed");
        uvindex.addClass("uv-index");

        //append divs to container and responses
        $("#current-weather").append(cityName,temp,humidity,windspeed,uvindex);
        $(".city-name").append(response.name)
        $(".temperature").append("Temperature: " + response.main.temp);
        $(".humidity").append("Humidity: " + response.main.humidity + "%");
        $(".wind-spead").append("Wind Speed: " + response.wind.speed);
        $(".uv-index").append("UV Index: " + response.weather[0].icon);

      })
    
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        console.log(response.list[0].dt_txt)
        console.log(response.list[0].main.temp)
        console.log(response.list[0].main.humidity)

        
        
        $(".day1-temp").append("Temp: " + response.list[0].main.temp)
        $(".day1-header").append(response.list[0].dt_txt)
        $(".day1-hum").append("Humidity: " + response.list[0].main.humidity + "%")
        $(".day2-header").append(response.list[6].dt_txt)
        $(".day2-temp").append("Temp: " + response.list[6].main.temp)
        $(".day2-hum").append("Humidity: " + response.list[6].main.humidity + "%")
        $(".day3-header").append(response.list[14].dt_txt)
        $(".day3-temp").append("Temp: " + response.list[14].main.temp)
        $(".day3-hum").append("Humidity: " + response.list[14].main.humidity + "%")
        $(".day4-header").append(response.list[22].dt_txt)
        $(".day4-temp").append("Temp: " + response.list[22].main.temp)
        $(".day4-hum").append("Humidity: " + response.list[22].main.humidity + "%")
        $(".day5-header").append(response.list[30].dt_txt)
        $(".day5-temp").append("Temp: " + response.list[30].main.temp)
        $(".day5-hum").append("Humidity: " + response.list[30].main.humidity + "%")

      });


    storedLocations();
    renderSearch();
    clearContainer()
});


function clearContainer() {
   
  
   $(".city-name").remove()
   $(".temperature").remove()
   $(".humidity").remove()
   $(".wind-spead").remove()
   $(".uv-index").remove()
    // $(".day1").empty()
    // $(".day2").empty()
    // $(".day3").empty()
    // $(".day4").empty()
    // $(".day5").empty()


}

