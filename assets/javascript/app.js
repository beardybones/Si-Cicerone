



$("#city_form").submit(function(event){
    event.preventDefault();
    var searchTerm = "";

    var input = $("#city_input").val().trim()

    input = input.split(" ")

    for ( var i = 0; i < input.length; i++ ) {
        searchTerm = searchTerm + "+" + input[i]
    }

    searchTerm = searchTerm.substring(1, searchTerm.length)

    var queryURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + searchTerm + "&facet=style_name&facet=cat_name&facet=name_breweries&facet=country"
  
    console.log(searchTerm)
    $.ajax({
        url: queryURL, method: "GET"
      }).then(function(response) {
        console.log(response.records);
        for ( var i = 0; i < response.records.length; i++ ) {
            console.log(response.records[i].fields.name)
            //distillary name print
            $(".distillery").append(response.records[i].fields.name + "<br>")

            //address name print, no zip code, sadly
            $(".address").append(response.records[i].fields.address1 +", " + response.records[i].fields.city + ", " + response.records[i].fields.state + "<br>")

            //cat name
            $(".cat").append(response.records[i].fields.cat_name + ", " + response.records[i].fields.style_name + "<br>")
//website print
            $(".web").append(response.records[i].fields.website + "<br>")
            //description
            $(".description").append(response.records[i].fields.descript + "<br>")
            
        }
    
      });
})


