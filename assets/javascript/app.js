
// initialize web page
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
    } 
        // if the age is < 21 alert the user and send them away!

    else {
        alert("You are not old Enough Goodbye!");
        window.location.href = "http://www.nick.com"
    }
})

$("#location-submit").on("click", function (e) {
    e.preventDefault();

    // gather user input
    userLocation = $("#location-input").val().trim();
    googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=AIzaSyB8Eim861DFG-C8nD2Z83vXE1Pbv-kHlwM";
    // googlemaps API call
    $.ajax({    
        url: googleMapsQueryURL,
        method: "GET"
    })

        .then(function (response) {

            // store the longitude and lattitude
            userLng = response.results[0].geometry.location.lng;
            userLat = response.results[0].geometry.location.lat;

            // Lat and lon coordinatd to be populated by google maps after getting #location-input
            urlLat = 'lat=' + userLat;
            urlLon = '&lon=' + userLng;

            // move to next screen
            $("#location").hide();
            $("#main-inputs").show();

            // On Submit builds the two urls required for the Zomato ajax calls
            $('#input-submit').on('click', function (e) {
                e.preventDefault();
                cuisineInput = $('#food-input').val().trim();

                // cuisineIput to be populated by #food-input
                radiusMeters = 25000;
                zomatoApiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
                urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
                urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
                urlRadius = '&radius=' + radiusMeters;
                cuisineUrl = urlOne + urlLat + urlLon

                // Ajax call to Zomato to gather cuisine object for the lat/long coordinates
                cuisineUrl = urlOne + urlLat + urlLon
                // console.log(cuisineUrl);
                $.ajax({
                    url: cuisineUrl,
                    method: "GET",
                    headers: {
                        "user-key": zomatoApiKey
                    }
                }).then(function (responseOne) {

                    cuisineId;
                    ct = 0;

                    for (var i = 0; i < responseOne.cuisines.length; i++) {
                        ct++;
                        // compare our cuisine input to the zomato api
                        if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
                            cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
                            var restaurantsArray = [];
                            var urlCuisine = '&cuisines=' + cuisineId;
                            var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;

                            // ajax call to gather eatery data based on lat lon coordinates and cuisine
                            restaurantsArray = [];
                            urlCuisine = '&cuisines=' + cuisineId;
                            queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;

                            // ajax call to Zomato to get restaurants based on location and cuisine and build restaurant name array for comparison with open beer databasd
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
            $("#main-inputs").hide();
            $("#logo").hide();
            $("#results").show();
            });
        });
});


$("#back-button-1").on("click", function (e) {
    e.preventDefault();
    $("#location").show();
    $("#main-inputs").hide();
});

