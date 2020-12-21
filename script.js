console.log("it's a start.");

// TODO: create get API function to pull data from openweather
// TODO: make sure you parse the url to descern how to add the "city" variable in the search.

// API URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid=e996e591a7658566c640a16175cb40ab



var userCity = $("#city");
var city = "";  //just testing the queryURL and the click event.

function getTheWheather(event) {
    if (userCity.val() !== "") {
        var city = userCity.val();
        console.log(city)

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=166a433c57516f51dfab1f7edaed8413&units=imperial"

        $.get(queryURL).then(function (response) {
            console.log(response);

            //what follows is a bunch of console.logs to show where the information I need is.
            console.log(`city name: ${response.name}`);
            console.log(`temp: ${response.main.temp}`);
            console.log(`humidity: ${response.main.humidity}`);
            console.log(`windspeed: ${response.wind.speed}`);


            // getting the lat long info for the uv index
            var cityLat = JSON.stringify(response.coord.lat);
            console.log(cityLat)
            var cityLon = JSON.stringify(response.coord.lon);
            console.log(cityLon)

            uvMe(response.coord.lat, response.coord.lon);
            
        })
        
        }
        //uv index lat/long api call
    var uvURL ="https://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat="+cityLat+"&lon="+cityLon;
    //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

    function uvMe(cityLat,cityLon) {
        $.get(uvURL).then(function (response) {
            console.log(response);
        })
    }
   
}





$("#search").on("click", getTheWheather);
