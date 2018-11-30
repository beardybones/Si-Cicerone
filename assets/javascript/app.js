




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
    // var input = $("#food-input").val()
    // firebase.database().ref('foodLast/').set(input);


    var food = $("#food-input").val()
    var foodSearch = {
        food: food,
   };
  
    firebase.database().ref('foodLast/').set(foodSearch);
    
})


            
    database.ref("/locationLast").on("value", function(childSnapshot) {
        console.log(childSnapshot.val());
  
        var locationSearch = childSnapshot.val().location;
     
        console.log(locationSearch);
    
        $("#location-display").text(locationSearch);
      });


      database.ref("/alcoholLast").on("value", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var alcoholSearch = childSnapshot.val().alcohol;
 
        // Employee Info
        console.log(alcoholSearch);
       
        $("#alcohol-display").text(alcoholSearch);
      });



      database.ref("/foodLast").on("value", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var foodSearch = childSnapshot.val().food;
 
        // Employee Info
        console.log(foodSearch);
       
        $("#food-display").text(foodSearch);
      });
//this is the end of the firebase stuff




// initialize web page
$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();

//this is new username password stuff
// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);    
// auth.onAuthStateChanged(firebaseUser => { });

//                 //get elements from the dom
// const txtEmail = document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignUp = document.getElementById('btnSignUp');
// const btnLogout = document.getElementById('btnLogout');

//             //add login event 
//     btnLogin.addEventListener('click', e=>{
//                 //get email and pass
//         const email = txtEmail.val();
//         const pass = txtPassword.val();
//         const auth = firebase.auth();
//                 //sign in
//         const promise = auth.signInWithEmailAndPassword(email, pass);
//         promise.catch(e => console.log(e.message));


//     })





//this is the end of new password stuff






checkDataFunction= function(){


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
    console.log(userLocation);
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
                            var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;
                            console.log(queryURL);

                            console.log(queryURL);

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
                                console.log('First: ' + restaurantsArray);
                                
                                // Storing restaurantsArray and responseTwo ojbect in session storage for retrieval later outstde of this scope to do the comparison 

                                sessionStorage.setItem('restaurantsArray', restaurantsArray);
                                sessionStorage.setItem('responseTwo', JSON.stringify(responseTwo));
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

                beerInput = $("#alcohol-input").val().trim()

                beerURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + beerInput + "&rows=50&sort=name&facet=style_name&facet=cat_name&facet=name_breweries&facet=city&refine.city=" + userLocation;
                console.log(beerInput);
                console.log(beerURL);

                // Ajax Call to OpenBeerDB
                $.ajax({
                    url: beerURL, method: "GET"
                })

                    .then(function (response) {
                        var sudzyArray = [];
                        console.log(response);
                        for (var i = 0; i < response.records.length; i++) {
                            sudzyArray.push(response.records[i].fields.name_breweries);
                        }
                        console.log('First: ' + sudzyArray);

                        // Storing sudzyArray and responseTwo ojbect in session storage for retrieval later outstde of this scope to do the comparison 
                        sessionStorage.setItem('sudzyArray', sudzyArray);
                        ct = 0;
                    });


                // for (var i = 0; i < response.records.length; i++) {

                //     if (response.records[i].fields.city.toUpperCase().includes($("#location-input").val().trim().toUpperCase())) {
                //         if (response.records[i].fields.website ===undefined){
                //            response.records[i].fields.website = "";}
                //        if (response.records[i].fields.name ===undefined){
                //            response.records[i].fields.name = "";}
                //        if (response.records[i].fields.address1 ===undefined){
                //            response.records[i].fields.address1 = "";}
                //        if ( response.records[i].fields.city===undefined){
                //             response.records[i].fields.city = "";}
                //        if ( response.records[i].fields.state===undefined){
                //             response.records[i].fields.state = "";}
                //         if (response.records[i].fields.cat_name===undefined){
                //            response.records[i].fields.cat_name = "";}
                //        if (response.records[i].fields.style_name===undefined){
                //            response.records[i].fields.style_name = "";}
                //         if (response.records[i].fields.descript===undefined){
                //        response.records[i].fields.descript = "";
                //        }
           
            // move to results page
            $("#main-inputs").hide();
            $("#logo").hide();
            $("#results").show();
        });

            // Retrieving  restaurantsArray from session storage to do the comparison 
            //         var restaurantsArray = sessionStorage.getItem('restaurantsArray');
            //         var responseTwo = JSON.parse(sessionStorage.getItem('responseTwo'));

            //         console.log(responseTwo);

            //         console.log('Second: ' + restaurantsArray);

            //         // Placeholder array for your beer array with forced data for testing
            //         var sudzyArray = sessionStorage.getItem('sudzyArray');

            //         // Checking for commonalities between the two arrays
            //         var commonArray = [];
            //         for (var i = 0; i < sudzyArray.length; i++) {
            //             if (restaurantsArray.includes(sudzyArray[i])) {
            //                 commonArray.push(sudzyArray[i]);
            //                 alert('Hit: ' + sudzyArray[i]);
            //             } 
            //             console.log('common: ' + commonArray);
            //             sessionStorage.setItem('commonArray', commonArray);
            //         }
            //     });
    

    // $("#back-button-1").on("click", function (e) {
    //     e.preventDefault();


    //     $("#location").show();
    //     $("#main-inputs").hide();
    // });


    // ------------------------    
});//end of code
// ------------------------