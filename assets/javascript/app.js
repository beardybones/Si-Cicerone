$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();

$("#age-submit").on("click", function (e) {
    e.preventDefault();
    // if userAge > 21 verify user


    // hide the age input and show the location input
    $("#header").hide();
    $("#location").show();

    // if the age is < 21 alert the user and do nothing
})

$("#location-submit").on("click", function (e) {
    e.preventDefault();

    // gather user input

    // reference user input against APIs

    // move to next screen
    $("#location").hide();
    $("#main-inputs").show();
})

$("#back-button-1").on("click", function (e) {
    e.preventDefault();


    $("#location").show();
    $("#main-inputs").hide();
})


// Variables required to build ajax query URLs      

var radiusMeters = 25000;
var apiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
var urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
var urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
var urlRadius = '&radius=' + radiusMeters;




// Lat and lon coordinatd to be populated by google maps after getting #location-input
var longitude = -117.1831509;
var latitude = 32.8530525;
var urlLat = 'lat=' + latitude;
var urlLon = '&lon=' + longitude;
// cuisineIput to be populated by #food-input
var cuisineInput;


// Added code for an input-submit...Chord review...
$('#input-submit').on('click', function (e) {
    e.preventDefault();
    cuisineInput = $('#food-input').val().trim();
    // console.log('food-input: ' + cuisineInput);


    // Ajax call to gather cuisine object for the lat/long coordinates

    var cuisineUrl = urlOne + urlLat + urlLon
    // console.log(cuisineUrl);


    $.ajax({
        url: cuisineUrl,
        method: "GET",
        headers: {
            "user-key": apiKey
        }
    }).then(function (responseOne) {
        console.log(responseOne);
        // console.log(responseOne.cuisines.length);
        // console.log((responseOne.cuisines[0].cuisine.cuisine_name).toLowerCase());

        var cuisineId;
        var ct = 0;

        for (var i = 0; i < responseOne.cuisines.length; i++) {
            ct++;
            if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
                cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
                // console.log('cuisineID -1 : ' + cuisineId);
                // ajax call to gather eatery data based on lat lon coordinates and cuisine
                var restaurantsArray = [];
                var urlCuisine = '&cuisines=' + cuisineId;
                var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;
                // console.log(urlCuisine);
                // console.log(queryURL);
                // console.log('cuisine ID: ' + cuisineId);


                $.ajax({
                    url: queryURL,
                    method: "GET",
                    headers: {
                        "user-key": apiKey
                    }
                }).then(function (responseTwo) {
                    console.log(responseTwo);
                    for (var i = 0; i < responseTwo.restaurants.length; i++) {
                        restaurantsArray.push(responseTwo.restaurants[i].restaurant.name);
                    }
                    console.log(restaurantsArray);
                    ct = 0;
                });
                break;
            } else if (ct >= responseOne.cuisines.length) {
                alert("nothing found");
                ct = 0;
            }


        }


    })

});





