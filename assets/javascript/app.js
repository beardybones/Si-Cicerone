$("#keyword_form").submit(function(event){
    event.preventDefault();
    var searchTerm = "";

    var input = $("#keyword_input").val().trim()

    input = input.split(" ")

    for ( var i = 0; i < input.length; i++ ) {
        searchTerm = searchTerm + "+" + input[i]
    }

    searchTerm = searchTerm.substring(1, searchTerm.length)

    var queryURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + searchTerm + "&facet=style_name&facet=cat_name&facet=name_breweries&facet=country"
  
    console.log(searchTerm)
console.log(queryURL)
    //key word search term
    $.ajax({
        url: queryURL, method: "GET"
      }).then(function(response) {
        console.log(response.records);
        $(".keyword").html("")
        
        for ( var i = 0; i < response.records.length; i++ ) {
             if (response.records[i].fields.website ===undefined){
                response.records[i].fields.website = "";}
            if (response.records[i].fields.name ===undefined){
                response.records[i].fields.name = "";}
            if (response.records[i].fields.address1 ===undefined){
                response.records[i].fields.address1 = "";}
            if ( response.records[i].fields.city===undefined){
                 response.records[i].fields.city = "";}
            if ( response.records[i].fields.state===undefined){
                 response.records[i].fields.state = "";}
             if (response.records[i].fields.cat_name===undefined){
                response.records[i].fields.cat_name = "";}
            if (response.records[i].fields.style_name===undefined){
                response.records[i].fields.style_name = "";}
             if (response.records[i].fields.descript===undefined){
            response.records[i].fields.descript = "";
            }
            $(".keyword").append(response.records[i].fields.name + "<br>"+  response.records[i].fields.address1 +"  " + response.records[i].fields.city + "  " + response.records[i].fields.state + "<br>" + response.records[i].fields.cat_name + "  " + response.records[i].fields.style_name + "<br><a id='id5' name='link' href='" +response.records[i].fields.website + "'>" +response.records[i].fields.website+ "</a><br>" + response.records[i].fields.descript + "<br><br><br>")        
        }
    
      });
})












///city seearch

$("#city_form").submit(function(event){
    event.preventDefault();
    var searchTerm = "";

    var input = $("#city_input").val().trim()

    input = input.split(" ")

    for ( var i = 0; i < input.length; i++ ) {
        searchTerm = searchTerm + "+" + input[i]
    }

    searchTerm = searchTerm.substring(1, searchTerm.length)
    // var queryURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + searchTerm + "&facet=style_name&facet=cat_name&facet=name_breweries&facet=country"

    var queryURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + searchTerm + "&rows=100&facet=style_name&facet=cat_name&facet=city&facet=country"
    // var queryURL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + searchTerm + "&facet=style_name&facet=cat_name&facet=" + searchTerm + "&facet=country"
  
    console.log(searchTerm)
    console.log(queryURL)
$.ajax({
    url: queryURL, method: "GET"
  }).then(function(response) {
      console.log(response)
    console.log(response.records);
    $(".city").html("")
    
    for ( var i = 0; i < response.records.length; i++ ) {
        if (response.records[i].fields.city.toUpperCase().includes(searchTerm.toUpperCase())) {
         if (response.records[i].fields.website ===undefined){
            response.records[i].fields.website = "";}
        if (response.records[i].fields.name ===undefined){
            response.records[i].fields.name = "";}
        if (response.records[i].fields.address1 ===undefined){
            response.records[i].fields.address1 = "";}
        if ( response.records[i].fields.city===undefined){
             response.records[i].fields.city = "";}
        if ( response.records[i].fields.state===undefined){
             response.records[i].fields.state = "";}
         if (response.records[i].fields.cat_name===undefined){
            response.records[i].fields.cat_name = "";}
        if (response.records[i].fields.style_name===undefined){
            response.records[i].fields.style_name = "";}
         if (response.records[i].fields.descript===undefined){
        response.records[i].fields.descript = "";
        }
        $(".city").append(response.records[i].fields.name + "<br>"+  response.records[i].fields.address1 +"  " + response.records[i].fields.city + "  " + response.records[i].fields.state + "<br>" + response.records[i].fields.cat_name + "  " + response.records[i].fields.style_name + "<br><a id='id5' name='link' href='" +response.records[i].fields.website + "'>" +response.records[i].fields.website+ "</a><br>" + response.records[i].fields.descript + "<br><br><br>")        
    }}

  });
})
