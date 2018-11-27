$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();

$("#age-submit").on("click", function(){

    // if userAge > 21 verify user


    // hide the age input and show the location input
    $("#header").hide();
    $("#location").show();

    // if the age is < 21 alert the user and do nothing
})

$("#location-submit").on("click", function(){
    // gather user input

    // reference user input against APIs

    // move to next screen
    $("#location").hide();
    $("#main-inputs").show();
})

$("#back-button-1").on("click", function(){


    $("#location").show();
    $("#main-inputs").hide();
})