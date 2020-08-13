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

    
        countrySearch.push(locationText);
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + countrySearch + ",us" + "&APPID=" + apiKey;

        //add new locations to the array, clear the input
        // var searchVal = $("#search-bar");
        // searchVal.innerhtml = "";

    //API call
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(countrySearch);

      })
    

    storedLocations();
    renderSearch();

});


