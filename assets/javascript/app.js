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
