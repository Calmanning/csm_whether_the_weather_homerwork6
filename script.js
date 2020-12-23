$(document).ready(function(){

console.log("it's a start.");

// TODO: create get API function to pull data from openweather
// TODO: make sure you parse the url to descern how to add the "city" variable in the search.

// API URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid=e996e591a7658566c640a16175cb40ab

var cityEl = $("#today-city");
var tempEl = $("#today-temp");
var humiEl = $("#today-hu");
var windEl = $("#today-wind");
var uvEl = $("#today-uv");
var iconEl =$("#weather-icon")
var userCity = $("#city");
var city = "";
var searchHist = [];
var clearHist = $("#clear")
var fiveDayEl = $("#fiveDayHome")

//attempting to recall search history
//function find(searchHist){
//    for (var i=0; i<searchHist.length; i++){
//       if
//} //end of search history recall function

function getTheWheather(place) {
        console.log(place)
        //Clear out any previous search results
        iconEl.empty();
        fiveDayEl.empty();
        //begin the api request
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=166a433c57516f51dfab1f7edaed8413&units=imperial"

        $.get(queryURL).then(function (response) {
            //everytime I click I need to clear the previous five-day(all of 'em) and city icons
            console.log(response);

            //what follows is a bunch of console.logs to show where the information I need is.
            console.log(`city name: ${response.name}`);
            console.log(`temp: ${response.main.temp}`);
            console.log(`humidity: ${response.main.humidity}`);
            console.log(`windspeed: ${response.wind.speed}`);

            todayIconCode = (response.weather[0].icon)
                console.log("symbol" + todayIconCode)
            todayIconURL = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+todayIconCode+".png");
            cityEl.text(response.name);
            iconEl.append(todayIconURL);
            tempEl.text(response.main.temp);
            humiEl.text(response.main.humidity);
            windEl.text(response.wind.speed);

            // getting the lat long info for the uv index
            var cityLat = JSON.stringify(response.coord.lat);
            console.log(cityLat)
            var cityLon = JSON.stringify(response.coord.lon);
            console.log(cityLon)



            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + cityLat + "&lon=" + cityLon;
            //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

            $.get(uvURL).then(function (response) {
                console.log(response);
                uvEl.text(response.value);
            })

            fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q="+place+"&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
                // "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=166a433c57516f51dfab1f7edaed8413"

                $.get(fiveDayURL).then(function (response) {
                    console.log(response)
                    for (var i = 0; i < response.list.length; i++) {
                        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                            console.log("this is going to iterate?");
                            console.log("five day array:" + response.list[i].main.temp);
                            console.log("fiveday symbol:" + response.list[i].weather[0].icon);
                            console.log("dates:" + response.list[i].dt_txt)
                            var cardDay = $("<p>").text(response.list[i].dt_txt);
                            var foreTemp = $("<p>").text("Temp:" + response.list[i].main.temp);
                            var foreHumid = $("<p>").text("Humidity:" + response.list[i].main.humidity);
                            var foreIcon = (response.list[i].weather[0].icon)
                        var container = $("#fiveDayHome");
                        var card = $("<div>").addClass("col-sm-2 thumbnail bg-info rounded five-day");
                        var cardIconURL = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+foreIcon+"@2x.png");
                           
                            container.append(card.append(cardDay, cardIconURL, foreTemp, foreHumid))//add card date & icon
                            //container.append

                        }

                    }

                })



            }) //end of the first, current-weather api request 

    //} //end of the "if" statement that will run the current-weather api

} //end of the getTheWeather function



function makeButton(searchedCity) {
    var prevCityButton = $("<button>");
    $(prevCityButton).text(searchedCity);
    prevCityButton.addClass("oldCity");
    //prevCityButton.attr("value", searchedCity);
    $("#past-cities").prepend(prevCityButton);
    
}

function clearHistory(event){
    event.preventDefault();
    searchHist = [];
    localStorage.removeItem("city");
    document.location.reload();
}
// 
$("#past-cities").on("click", "button", function(){
    console.log("clicked");
        var reSearch = $(this).html();
    console.log(reSearch);
        getTheWheather(reSearch);
})
//
$("#search").on("click",function(){
    var place = $("#city").val();
    $("#city").val("");
console.log("this is place: " + place);
    getTheWheather(place);
    if (place !== "") {
        searchHist.push(place);
        console.log(searchHist);
        localStorage.setItem("city", JSON.stringify(searchHist));
        makeButton(place);

    }
})



$("#clear").on("click", clearHistory);

}) //Document ready end.
