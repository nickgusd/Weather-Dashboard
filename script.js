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
            listEl.attr("data-name",listItem)
            listEl.addClass("cities");
            $(".state-list").append(listEl);
            // var dataName = $(this).attr("data-name", i);
            // listEl.append(dataName);
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
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + countrySearch[i] + ",us" + "&APPID=" + apiKey;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + countrySearch[i] + ",us" + "&APPID=" + apiKey;

        }

    //API call for current weather
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response);
       

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
        var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $(".city-name").append(response.name + " " + moment().format("MMM Do YY"), currentImg);
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
        // console.log(response.list[0].dt_txt)
        // console.log(response.list[0].main.temp)
        // console.log(response.list[0].main.humidity)

        var imgEl1 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
        var imgEl2 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png");
        var imgEl3 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[14].weather[0].icon + ".png");
        var imgEl4 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[22].weather[0].icon + ".png");
        var imgEl5 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[30].weather[0].icon + ".png");

        $(".day1-temp").append("Temp: " + response.list[0].main.temp)
        $(".day1-icon").append(imgEl1);
        //$(".day1-header").append(response.list[0].dt_txt)
        $(".day1-hum").append("Humidity: " + response.list[0].main.humidity + "%")
        //$(".day2-header").append(response.list[6].dt_txt)
        $(".day2-icon").append(imgEl2);
        $(".day2-temp").append("Temp: " + response.list[6].main.temp)
        $(".day2-hum").append("Humidity: " + response.list[6].main.humidity + "%")
        //$(".day3-header").append(response.list[14].dt_txt)
        $(".day3-icon").append(imgEl3);
        $(".day3-temp").append("Temp: " + response.list[14].main.temp)
        $(".day3-hum").append("Humidity: " + response.list[14].main.humidity + "%")
        //$(".day4-header").append(response.list[22].dt_txt)
        $(".day4-icon").append(imgEl4);
        $(".day4-temp").append("Temp: " + response.list[22].main.temp)
        $(".day4-hum").append("Humidity: " + response.list[22].main.humidity + "%")
        //$(".day5-header").append(response.list[30].dt_txt)
        $(".day5-icon").append(imgEl5);
        $(".day5-temp").append("Temp: " + response.list[30].main.temp)
        $(".day5-hum").append("Humidity: " + response.list[30].main.humidity + "%")

       
        const date = new Date(response.list[0].dt_txt,)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit',year: 'numeric' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 
        
        $(".day1-header").append(`${month}-${day}-${year }`)
        
        const date2 = new Date(response.list[6].dt_txt)
        const dateTimeFormat2 = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit',year: 'numeric' }) 
        const [{ value: month2 },,{ value: day2 },,{ value: year2 }] = dateTimeFormat2 .formatToParts(date2 ) 
         $(".day2-header").append(`${month2}-${day2}-${year2 }`)

        const date3 = new Date(response.list[14].dt_txt)
        const dateTimeFormat3 = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit',year: 'numeric' }) 
        const [{ value: month3 },,{ value: day3 },,{ value: year3 }] = dateTimeFormat3 .formatToParts(date3 ) 
        $(".day3-header").append(`${month3}-${day3}-${year3 }`)


        const date4 = new Date(response.list[22].dt_txt)
        const dateTimeFormat4 = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit',year: 'numeric' }) 
        const [{ value: month4 },,{ value: day4 },,{ value: year4 }] = dateTimeFormat4 .formatToParts(date4) 
        $(".day4-header").append(`${month4}-${day4}-${year4 }`)

        const date5 = new Date(response.list[30].dt_txt)
        const dateTimeFormat5 = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit',year: 'numeric' }) 
        const [{ value: month5 },,{ value: day5},,{ value: year5 }] = dateTimeFormat5 .formatToParts(date5) 
        $(".day5-header").append(`${month5}-${day5}-${year5 }`)

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

    $(".day1-temp").empty()
    $(".day1-icon").empty()
    $(".day1-header").empty()
    $(".day1-hum").empty()
    $(".day2-header").empty()
    $(".day2-temp").empty()
    $(".day2-icon").empty()
    $(".day2-hum").empty()
    $(".day3-header").empty()
    $(".day3-temp").empty()
    $(".day3-icon").empty()
    $(".day3-hum").empty()
    $(".day4-header").empty()
    $(".day4-temp").empty()
    $(".day4-icon").empty()
    $(".day4-hum").empty()
    $(".day5-header").empty()
    $(".day5-temp").empty()
    $(".day5-icon").empty()
    $(".day5-hum").empty()

}

$(".cities").on("click", function(event) {
    var searchedCity = $(this).data("name");

    var queryURL3 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + ",us" + "&APPID=" + apiKey;
    var queryURL4 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity  + ",us" + "&APPID=" + apiKey;


    $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(response) {
        console.log(response);

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
         var currentImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
         $(".city-name").append(response.name + " " + moment().format("MMM Do YY"), currentImg);
         $(".temperature").append("Temperature: " + response.main.temp);
         $(".humidity").append("Humidity: " + response.main.humidity + "%");
         $(".wind-spead").append("Wind Speed: " + response.wind.speed);
         $(".uv-index").append("UV Index: " + response.weather[0].icon);
            console.log(response.weather[0].icon)

       
      })

      $.ajax({
        url: queryURL4,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        console.log(response.list[0].dt_txt)
        console.log(response.list[0].main.temp)
        console.log(response.list[0].main.humidity)

        var imgEl1 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
        var imgEl2 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png");
        var imgEl3 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[14].weather[0].icon + ".png");
        var imgEl4 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[22].weather[0].icon + ".png");
        var imgEl5 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[30].weather[0].icon + ".png");

        $(".day1-temp").append("Temp: " + response.list[0].main.temp)
        $(".day1-icon").append(imgEl1);
        $(".day1-header").append(response.list[0].dt_txt)
        $(".day1-hum").append("Humidity: " + response.list[0].main.humidity + "%")
        $(".day2-header").append(response.list[6].dt_txt)
        $(".day2-icon").append(imgEl2);
        $(".day2-temp").append("Temp: " + response.list[6].main.temp)
        $(".day2-hum").append("Humidity: " + response.list[6].main.humidity + "%")
        $(".day3-header").append(response.list[14].dt_txt)
        $(".day3-icon").append(imgEl3);
        $(".day3-temp").append("Temp: " + response.list[14].main.temp)
        $(".day3-hum").append("Humidity: " + response.list[14].main.humidity + "%")
        $(".day4-header").append(response.list[22].dt_txt)
        $(".day4-icon").append(imgEl4);
        $(".day4-temp").append("Temp: " + response.list[22].main.temp)
        $(".day4-hum").append("Humidity: " + response.list[22].main.humidity + "%")
        $(".day5-header").append(response.list[30].dt_txt)
        $(".day5-icon").append(imgEl5);
        $(".day5-temp").append("Temp: " + response.list[30].main.temp)
        $(".day5-hum").append("Humidity: " + response.list[30].main.humidity + "%")

      });

      clearContainer()

})

