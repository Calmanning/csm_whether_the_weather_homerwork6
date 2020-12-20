console.log("it's a start.");

// TODO: create get API function to pull data from openweather
    // TODO: make sure you parse the url to descern how to add the "city" variable in the search.

    // API URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid=e996e591a7658566c640a16175cb40ab


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
var userCity = $("#city");


$("#city").on("click", function(){
    console.log(userCity)
    $.get(queryURL).then(function(response){
        console.log(response);
    })

})
