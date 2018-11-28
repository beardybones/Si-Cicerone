$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();
var searchTerm;
var input;
var queryURL;
var beerSearch;
var beerURL;
var beerInput;

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

    searchTerm = "";

    input = $("#location-input").val().trim()

    input = input.split(" ")

    for (var i = 0; i < input.length; i++) {
        searchTerm = searchTerm + "+" + input[i]
    }

    searchTerm = searchTerm.substring(1, searchTerm.length)
    console.log(searchTerm)
    console.log(queryURL)


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
// >>>>>>> 0ef75a60d602e5db6592fc674a0864b02bea3abb










$("#input-submit").on("click", function (e) {
    e.preventDefault();

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

//this is the start of my ajax call searching keywords of beers and cities
    $.ajax({
        url: beerURL, method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log(response.records);
       

        for (var i = 0; i < response.records.length; i++) {

            console.log(response.records[i].fields.name + "<br>" + response.records[i].fields.address1 + "  " + response.records[i].fields.city + "  " + response.records[i].fields.state + "<br>" + response.records[i].fields.cat_name + "  " + response.records[i].fields.style_name + "<br><a id='id5' name='link' href='" + response.records[i].fields.website + "'>" + response.records[i].fields.website + "</a><br>" + response.records[i].fields.descript + "<br><br><br>")


        }
        $("#roughLastScreen").show();
        $(".form-group").hide();

    });
})
