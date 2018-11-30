
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


function restaurantInfo() {
    var restaurantName = responseTwo.restaurants[j].restaurant.name;
    var menuUrl = responseTwo.restaurants[j].restaurant.menu_url;
    var address = responseTwo.restaurants[j].restaurant.location.address;
    var featureImg = responseTwo.restaurants[j].restaurant.featured_image;
    var restaurantCuisine = responseTwo.restaurants[j].restaurant.cuisines;
    var userRating = responseTwo.restaurants[j].restaurant.user_rating.aggregate_rating;
}

function printNewRestaurant(){
    $("#card-results").append("<div class='card w-50 m-4 mx-auto'>" + "<img class='card-img-top' src='" + featureImg +
        "' /> <td class='train-destination'> " + snapshot.val().destination +
        " </td><td class='train-arrival'> " +   moment(trainArrival).format("hh:mm") +
        " </td><td class='train-frequency'> " + snapshot.val().trainFrequency +
        " </td><td class='train-frequency'> " + tMinutesTillTrain +
        " </td></tbody>");
}

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
    function titleCase(userLocation) {
        var splitStr = userLocation.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    };
    googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + titleCase(userLocation) + "&key=AIzaSyB8Eim861DFG-C8nD2Z83vXE1Pbv-kHlwM";

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

        });
    // Added code for an input-submit...Chord review...
    // On Submit builds the two urls required for the Zomato ajax calls
    $('#input-submit').on('click', function (e) {
        e.preventDefault();
        cuisineInput = $('#food-input').val().trim();

        // cuisineIput to be populated by #food-input
        radiusMeters = 8000;
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

            var cuisineId;
            ct = 0;

            for (var i = 0; i < responseOne.cuisines.length; i++) {
                ct++;
                // compare our cuisine input to the zomato api
                if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
                    cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
                    var restaurantsArray = [];
                    var urlCuisine = '&cuisines=' + cuisineId;
                    var urlLocality = '&locality=' + userLocation;
                    var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine + urlLocality;

                    // ajax call to Zomato to get restaurants based on location and cuisine and build restaurant name array for comparison with open beer databasd
                    $.ajax({
                        url: queryURL,
                        method: "GET",
                        headers: {
                            "user-key": zomatoApiKey
                        }
                    }).then(function (responseTwo) {
                        for (var i = 0; i < responseTwo.restaurants.length; i++) {
                            restaurantsArray.push(responseTwo.restaurants[i].restaurant.name);
                        }
                        // Storing restaurantsArray and responseTwo ojbect in session storage for retrieval later outstde of this scope to do the comparison 

                        sessionStorage.setItem('restaurantsArray', JSON.stringify(restaurantsArray));
                        sessionStorage.setItem('zomatoCall', JSON.stringify(responseTwo));
                        ct = 0;
                        // Ajax Call to OpenBeerDB
                        //this is the search term for beer set up

                        beerInput = $("#alcohol-input").val().trim()

                        beerURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + beerInput + "&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&facet=city&refine.country=United+States&refine.city=" + userLocation;
                        $.ajax({
                            url: beerURL, method: "GET"
                        }).then(function (response) {
                            var sudzyArray = [];
                            for (var i = 0; i < response.records.length; i++) {
                                sudzyArray.push(response.records[i].fields.name_breweries);
                            }
                            // Storing sudzyArray and responseTwo ojbect in session storage for retrieval later outstde of this scope to do the comparison 
                            sessionStorage.setItem('sudzyArray', JSON.stringify(sudzyArray));
                            ct = 0;
                            // Retrieving  arrays from session storage to do the comparison 
                            var restaurantsArray = JSON.parse(sessionStorage.getItem('restaurantsArray'));
                            var sudzyArray = JSON.parse(sessionStorage.getItem('sudzyArray'));
                            // console.log(restaurantsArray);
                            // Checking for commonalities between the two arrays
                            var commonArray = [];
                            for (var i = 0; i < sudzyArray.length; i++) {
                                if (restaurantsArray.includes(sudzyArray[i])) {
                                    commonArray.push(sudzyArray[i]);
                                    // alert('Hit: ' + sudzyArray[i]);
                                }
                                sessionStorage.setItem('commonArray', commonArray);
                            }
                            var zomatoCall = JSON.parse(sessionStorage.getItem('zomatoCall'));
                            for (var j = 0; j < zomatoCall.restaurants.length; j++) {
                                for (var k = 0; k < commonArray.length; k++) {
                                    if (zomatoCall.restaurants[j].restaurant.name === commonArray[k]) {
                                        console.log(zomatoCall.restaurants[j].restaurant.name);
                                        restaurantInfo();
                                    }
                                }
                            }
                        });

                    });

                    break;
                } else if (ct >= responseOne.cuisines.length) {
                    alert("nothing found");
                    ct = 0;
                }
            }
        })


        // move to results page
        $("#main-inputs").hide();
        $("#logo").hide();
        $("#results").show();
    });
});


$("#back-button-1").on("click", function (e) {
    e.preventDefault();
    $("#location").show();
    $("#main-inputs").hide();
});

$("#back-button-2").on("click", function (e) {
    e.preventDefault();
    $("#main-inputs").show();
    $("#logo").show();
    $("#results").hide();
})

// ------------------------    
//end of code
// ------------------------