
  var queryURL = "https://sandbox-api.brewerydb.com/v2/ca583a9a1de813ae1ea6842303c9ff2d";

  $.ajax({
    url: queryURL, method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].images.original.url);

  });
// Sandbox URL:https://sandbox-api.brewerydb.com/v2/
// Sandbox Key:ca583a9a1de813ae1ea6842303c9ff2d


//what state drink the most yesterday