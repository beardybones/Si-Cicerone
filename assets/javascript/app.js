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
/////NEW ADD ME///
    searchTerm = "";

    input = $("#location-input").val().trim()

    input = input.split(" ")

    for (var i = 0; i < input.length; i++) {
        searchTerm = searchTerm + "+" + input[i]
    }

    searchTerm = searchTerm.substring(1, searchTerm.length)
    console.log(searchTerm)
    console.log(queryURL)
/////NEW ADD ME///

    // gather user input
    userLocation = $("#location-input").val().trim();
    googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=AIzaSyB8Eim861DFG-C8nD2Z83vXE1Pbv-kHlwM";

    $.ajax({
        url: googleMapsQueryURL,
        method: "GET"
    })

        .then(function (response) {
            userLng = response.results[0].geometry.location.lng;
            userLat = response.results[0].geometry.location.lat;

            // Lat and lon coordinatd to be populated by google maps after getting #location-input
            urlLat = 'lat=' + userLat;
            urlLon = '&lon=' + userLng;

            // move to next screen
            $("#location").hide();
            $("#main-inputs").show();


            // Added code for an input-submit...Chord review...
            // On Submit builds the two urls required for the Zomato ajax calls
            $('#input-submit').on('click', function (e) {
                e.preventDefault();
                cuisineInput = $('#food-input').val().trim();
                radiusMeters = 25000;
                zomatoApiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
                urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
                urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
                urlRadius = '&radius=' + radiusMeters;


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
                    var ct = 0;

                    for (var i = 0; i < responseOne.cuisines.length; i++) {
                        ct++;
                        // compare our cuisine input to the zomato api
                        if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
                            cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
                            var restaurantsArray = [];
                            var urlCuisine = '&cuisines=' + cuisineId;
                            var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;


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
  //this is the search term for beer set up
    beerSearch = "";

    beerInput = $("#alcohol-input").val().trim()

    beerInput = beerInput.split(" ")

    for (var i = 0; i < beerInput.length; i++) {
        beerSearch = beerSearch + "+" + beerInput[i]
    }
    beerSearch = beerSearch.substring(1, beerSearch.length)
    beerURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + beerSearch + "+" + searchTerm + "&rows=150&facet=style_name&facet=cat_name&facet=city&facet=country"
    console.log(beerSearch)
    console.log(beerURL)
/////NEW ADD ME///
//this is the start of my ajax call searching keywords of beers and cities
    $.ajax({
        url: beerURL, method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log(response.records);
       

        for (var i = 0; i < response.records.length; i++) {

            console.log(response.records[i].fields.name + "<br>" + response.records[i].fields.address1 + "  " + response.records[i].fields.city + "  " + response.records[i].fields.state + "<br>" + response.records[i].fields.cat_name + "  " + response.records[i].fields.style_name + "<br><a id='id5' name='link' href='" + response.records[i].fields.website + "'>" + response.records[i].fields.website + "</a><br>" + response.records[i].fields.descript + "<br><br><br>")


        }
            });
        });
});


]$("#back-button-1").on("click", function (e) {
    e.preventDefault();


    $("#location").show();
    $("#main-inputs").hide();

