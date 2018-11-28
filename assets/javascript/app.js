<<<<<<< HEAD
// Prompt for location services
// Store location in firebase
// round up or down to closest city
// Prompt for age verification
// If statement for age over/under
// Submit button stores age in firebase
// Hide page after submit

// Form for alcohol/beer input
// placeholder brewery/name/or style
// compare against open beer database
// "city", "name", "cat_name"
// for return object to find long/lat
// reverse geocode for human-readable address
// Google API will return name
// store address/name in firebase

// Form for food input
// placeholder for restaurant/or eatery
// compare against Zomato database
// for return object to find long/lat (hopefully)
// reverse geocode for human-readable address
// Google API will return name
// store address/name in firebase

// Return object from open beer database
// Return set of objects for "city"
// 
// Return object from Zomato 
// Return set of objects for "city"

// String comparison for the matches
// Compare strings again
// open beer database for "name" or "cat_name"
// Zomato 

$.ajax({
    url: "https://developers.zomato.com/api/v2.1/cities?q=San%20Diego",
    method: "GET",
    headers: {
        "user-key": "7fd9b4ff24a0fa2eae39b02482c2e9b1"
    }
}).then(function(response){
    console.log(response);
});

$.ajax({
    url: "https://developers.zomato.com/api/v2.1/search?q=beer&lat=32.880058&lon=-117.234016&radius=2000",
    method: "GET",
    headers: {
        "user-key": "7fd9b4ff24a0fa2eae39b02482c2e9b1"
    }
}).then(function(response){
    console.log(response);
});
=======
$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCw8CMoohclCbxF8SSg1xOOiGtoYrue4iI",
    authDomain: "si-cicerone.firebaseapp.com",
    databaseURL: "https://si-cicerone.firebaseio.com",
    projectId: "si-cicerone",
    storageBucket: "si-cicerone.appspot.com",
    messagingSenderId: "993727244007"
};
firebase.initializeApp(config);
var database = firebase.database();

var userLocation = "";
var alcoholInput = "";
var foodInput = "";
var userAge = "";
var googleMapsQueryURL = "";
var userCoordinates = "";
$("#inputAge").submit(function (e) {
    e.preventDefault();
});

$("#age-submit").on("click", function (e) {
    e.preventDefault();
    // if userAge > 21 verify user
    userAge = $("#inputAge").val().trim();
    computedAge = moment(userAge, "MM/DD/YYYY");
    diffAge = moment().diff(computedAge, "years");


    if (diffAge > 21) {


        // hide the age input and show the location input
        $("#header").hide();
        $("#location").show();
    } else {
        alert("You are not old Enough Goodbye!");
        window.location.href = "http://www.nick.com"
    }
    // if the age is < 21 alert the user and do nothing
})

$("#location-submit").on("click", function (e) {
    e.preventDefault();

    // gather user input
    userLocation = $("#location-input").val().trim();
    googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=AIzaSyB8Eim861DFG-C8nD2Z83vXE1Pbv-kHlwM";

    $.ajax({
        url: googleMapsQueryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            userLng = response.results[0].geometry.location.lng;
            userLat = response.results[0].geometry.location.lat;

            // Lat and lon coordinatd to be populated by google maps after getting #location-input
            urlLat = 'lat=' + userLat;
            urlLon = '&lon=' + userLng;

            // move to next screen
            $("#location").hide();
            $("#main-inputs").show();


            // Added code for an input-submit...Chord review...
            $('#input-submit').on('click', function (e) {
                e.preventDefault();
                cuisineInput = $('#food-input').val().trim();
                // console.log('food-input: ' + cuisineInput);
                // cuisineIput to be populated by #food-input
                radiusMeters = 25000;
                zomatoApiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
                urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
                urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
                urlRadius = '&radius=' + radiusMeters;


                // Ajax call to gather cuisine object for the lat/long coordinates

                cuisineUrl = urlOne + urlLat + urlLon
                // console.log(cuisineUrl);


                $.ajax({
                    url: cuisineUrl,
                    method: "GET",
                    headers: {
                        "user-key": zomatoApiKey
                    }
                }).then(function (responseOne) {
                    console.log(responseOne);
                    // console.log(responseOne.cuisines.length);
                    // console.log((responseOne.cuisines[0].cuisine.cuisine_name).toLowerCase());

                    var cuisineId;
                    var ct = 0;

                    for (var i = 0; i < responseOne.cuisines.length; i++) {
                        ct++;
                        // compare our cuisine input to the zomato api
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
                                    "user-key": zomatoApiKey
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
        });




});


$("#back-button-1").on("click", function (e) {
    e.preventDefault();


    $("#location").show();
    $("#main-inputs").hide();
});








>>>>>>> b83f75c655e73838f7cfbae3b6e05fca865b926c
