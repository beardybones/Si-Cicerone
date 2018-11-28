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
var cuisineId;
console.log('cuisine ID: ' + cuisineId)
var radiusMeters = 25000;
var apiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
var urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
var urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
var urlRadius = '&radius=' + radiusMeters;
var urlCuisine = '&cuisines=' + cuisineId;
var restaurantsArray = [];


// Lat and lon coordinatd to be populated by google maps after getting #location-input
var longitude = -117.1831509;
var latitude = 32.8530525;
var urlLat = 'lat=' + latitude;
var urlLon = '&lon=' + longitude;
// cuisineIput to be populated by #food-input
var cuisineInput = 'Vietnamese';


// Added code for an input-submit...Chord review...
$('#input-submit').on('click', function(e){
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
    // console.log('cuisine response: ' + responseOne);
    // console.log(responseOne.cuisines.length);
    // console.log((responseOne.cuisines[0].cuisine.cuisine_name).toLowerCase());



    for (var i = 0; i < responseOne.cuisines.length; i++) {
        if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
            cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
            console.log('cuisineID -1 : ' + cuisineId);
            break;
        }
        // else {
        //     alert('Cuisine not found');
        // }
    }

});

// ajax call to gather eatery data based on lat lon coordinates and cuisine
var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;
console.log(queryURL);

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
});

})



