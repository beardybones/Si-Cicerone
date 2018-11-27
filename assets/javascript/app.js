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
$("#inputAge").submit(function(e) {
    e.preventDefault();
});

$("#age-submit").on("click", function(e) {
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

$("#location-submit").on("click", function(e) {
    e.preventDefault();

    // gather user input
    userLocation = $("#location-input").val().trim();
    googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=AIzaSyB8Eim861DFG-C8nD2Z83vXE1Pbv-kHlwM";

    $.ajax({
        url: googleMapsQueryURL,
        method: "GET"
      })
      
      .then(function(response){
          console.log(response);
          userLong = response.results[0].geometry.location.lng;
          userLat = response.results[0].geometry.location.lat
          userCoordinates = userLat + ", " + userLong;

      })
    // reference user input against APIs
console.log(userCoordinates);

    // move to next screen
    $("#location").hide();
    $("#main-inputs").show();
})

$("#back-button-1").on("click", function(e) {
    e.preventDefault();


    $("#location").show();
    $("#main-inputs").hide();
})