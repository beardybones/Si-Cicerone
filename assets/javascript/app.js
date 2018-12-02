




// Initialize Firebase
var config = {
    apiKey: "AIzaSyAhTmmpStfimrjJ5ecnpzrkasnHC9dZG58",
    authDomain: "si-project-12ec9.firebaseapp.com",
    databaseURL: "https://si-project-12ec9.firebaseio.com",
    projectId: "si-project-12ec9",
    storageBucket: "si-project-12ec9.appspot.com",
    messagingSenderId: "298658243833"
};
firebase.initializeApp(config);
var database = firebase.database();




$("#age-submit").on("click", function () {
    var input = $("#inputAge").val()
    firebase.database().ref('age/').push(input);
})
$("#location-submit").on("click", function () {
    var input = $("#location-input").val()
    firebase.database().ref('location/').push(input);
})
$("#input-submit").on("click", function () {
    var input = $("#alcohol-input").val()
    firebase.database().ref('alcohol/').push(input);
})


$("#input-submit").on("click", function () {
    var input = $("#food-input").val()
    firebase.database().ref('food/').push(input);
})



//setting data in new place to show the last thing that was searched
$("#age-submit").on("click", function () {
    var input = $("#inputAge").val()
    firebase.database().ref('ageLast/').set(input);
})
$("#location-submit").on("click", function () {
    var location = $("#location-input").val()
    var locationSearch = {
        location: location,
    };
    // var input = $("#location-input").val()
    firebase.database().ref('locationLast/').set(locationSearch);
})
$("#input-submit").on("click", function () {

    var alcohol = $("#alcohol-input").val()
    var alcoholSearch = {
        alcohol: alcohol,
    };

    firebase.database().ref('alcoholLast/').set(alcoholSearch);
})
$("#input-submit").on("click", function () {

    var food = $("#food-input").val()
    var foodSearch = {
        food: food,
    };

    firebase.database().ref('foodLast/').set(foodSearch);

})



database.ref("/locationLast").on("value", function (childSnapshot) {
    console.log(childSnapshot.val());

    var locationSearch = childSnapshot.val().location;

    console.log(locationSearch);

    $("#location-display").text(locationSearch);
});


database.ref("/alcoholLast").on("value", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var alcoholSearch = childSnapshot.val().alcohol;

    // Employee Info
    console.log(alcoholSearch);

    $("#alcohol-display").text(alcoholSearch);
});

database.ref("/foodLast").on("value", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var foodSearch = childSnapshot.val().food;

    // Employee Info
    console.log(foodSearch);

    $("#food-display").text(foodSearch);
});

//trending alcohol term
var alcoholData = [""];
database.ref("/alcohol").on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());


    console.log(alcoholData);

    alcoholData.push(childSnapshot.val());
    console.log(alcoholData)

    $("#alcoholTrend-display").append(childSnapshot.val());
var mf = 1;
var m = 0;
var item;
for (var i=0; i<alcoholData.length; i++)
{
        for (var j=i; j<alcoholData.length; j++)
        {
                if (alcoholData[i] == alcoholData[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = alcoholData[i];
                }
        }
        m=0;
}
console.log(item+" ( " +mf +" times ) ") ;
$("#alcoholTrend-display").text(item);
})

///trending food item
var foodData = [""];
database.ref("/food").on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());


    console.log(foodData);

    foodData.push(childSnapshot.val());
    console.log(foodData)

    $("#foodTrend-display").append(childSnapshot.val());
var mf = 1;
var m = 0;
var item;
for (var i=0; i<foodData.length; i++)
{
        for (var j=i; j<foodData.length; j++)
        {
                if (foodData[i] == foodData[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = foodData[i];
                }
        }
        m=0;
}
console.log(item+" ( " +mf +" times ) ") ;
$("#foodTrend-display").text(item);
})

////Location Trending
var locationData = [""];
database.ref("/location").on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());


    console.log(locationData);

    locationData.push(childSnapshot.val());
    console.log(locationData)

    $("#locationTrend-display").append(childSnapshot.val());
var mf = 1;
var m = 0;
var item;
for (var i=0; i<locationData.length; i++)
{
        for (var j=i; j<locationData.length; j++)
        {
                if (locationData[i] == locationData[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = locationData[i];
                }
        }
        m=0;
}
console.log(item+" ( " +mf +" times ) ") ;
$("#locationTrend-display").text(item);
})
  ///End of location trending code






// initialize web page
$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();





checkDataFunction = function () {


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

            console.log(urlLat, urlLon);

            // move to next screen
            $("#location").hide();
            $("#main-inputs").show();

        });
})
// On Submit builds the two urls required for the Zomato ajax calls
$('#input-submit').on('click', function (e) {
    e.preventDefault();
    cuisineInput = $('#food-input').val().trim();

    // cuisineIput to be populated by #food-input
    radiusMeters = 1000;

    zomatoApiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
    urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
    urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
    urlRadius = '&radius=' + radiusMeters;

    // Ajax call to Zomato to gather cuisine object for the lat/long coordinates
    cuisineUrl = urlOne + urlLat + urlLon;
    console.log(cuisineUrl);

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
                var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine + "&sort=real_distance&order=desc";


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
                        if (commonArray === undefined || commonArray.length == 0) {
                            console.log(commonArray);
                            $("#card-results").empty();
                            for (var l = 0; l < 5; l++) {
                                var restaurantName = zomatoCall.restaurants[l].restaurant.name;
                                var menuUrl = zomatoCall.restaurants[l].restaurant.menu_url;
                                var address = zomatoCall.restaurants[l].restaurant.location.address;
                                var featureImg = zomatoCall.restaurants[l].restaurant.featured_image;
                                var restaurantCuisine = zomatoCall.restaurants[l].restaurant.cuisines;
                                var userRating = zomatoCall.restaurants[l].restaurant.user_rating.aggregate_rating;
                                $("#card-results").append("<div class='card w-50 m-4 mx-auto'>" + "<img class='card-img-top' src='" + featureImg +
                                    "' /> <div class='card-body'><h5 class='card-title'>" + restaurantName +
                                    "</h5><span>Cuisine: " + restaurantCuisine +
                                    "</span><br><a href='" + menuUrl +
                                    "'<i class='fas fa-utensils'> Menu</i></a><br><small>" + address +
                                    "</small><br><small><i class='fas fa-star'>Average User Rating: " + userRating +
                                    "</i></small></div></div>")
                            }
                        } else {
                            for (var j = 0; j < zomatoCall.restaurants.length; j++) {
                                for (var k = 0; k < commonArray.length; k++) {
                                    if (zomatoCall.restaurants[j].restaurant.name == commonArray[k]) {
                                        var restaurantName = zomatoCall.restaurants[j].restaurant.name;
                                        var menuUrl = zomatoCall.restaurants[j].restaurant.menu_url;
                                        var address = zomatoCall.restaurants[j].restaurant.location.address;
                                        var featureImg = zomatoCall.restaurants[j].restaurant.featured_image;
                                        var restaurantCuisine = zomatoCall.restaurants[j].restaurant.cuisines;
                                        var userRating = zomatoCall.restaurants[j].restaurant.user_rating.aggregate_rating;
                                        $("#card-results").append("<div class='card w-50 m-4 mx-auto'>" + "<img class='card-img-top' src='" + featureImg +
                                            "' /> <div class='card-body'><h5 class='card-title'>" + restaurantName +
                                            "</h5><span>Cuisine: " + restaurantCuisine +
                                            "</span><br><a href='" + menuUrl +
                                            "'<i class='fas fa-utensils'> Menu</i></a><br><small>" + address +
                                            "</small><br><small><i class='fas fa-star'>Average User Rating: " + userRating +
                                            "</i></small></div></div>"
                                        )
                                    }
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
