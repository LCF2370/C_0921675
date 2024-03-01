/**
 * Student Name: Ralph Eimerson Ompoc
 * Student ID: c0921675
 * Date: February 28, 2024
 */

//Variable declaration
let latitude = 0;
let longitude = 0;
let city = '';

//Using javascript
$(document).ready(function(){
    //Checks if the search button is clicked by the user with id='checkWeather'
    $('#checkWeather').click(function(){
        //Variable declaration for the city name being entered by the user from input text field with id='cityNameValue'
        var cityName = $("#cityNameValue").val();
        //Conditional statement and validates if text field is empty or not
        if(cityName != ''){
            //Using Asynchronous JavaScript to fetch data from API OpenWeatherMap
            $.ajax({
                //URL includes the API source/variable cityName/preferred units which I used is metric/APPID = equivalent to my API key
                url: 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+"&units=metric"
                +"&APPID=0e091e0fdbc8134a1400945ac6046033",
                //GET method which only retrieve data from specified url
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){
                    //Variable declaration                    
                    latitude = data.coord.lat;
                    longitude = data.coord.lon;                    
                    let weather = initCap(data.weather[0].description);
                    //Define the current time of specified location using longitude
                    var timezoneOffset = longitude / 15;
                    var date = new Date();
                    date.setHours(date.getUTCHours() + timezoneOffset);
                    var h = date.getHours();
                    var m = date.getMinutes();
                    var hr = h;
                    if(hr >= 12){ var meridian = "PM" }
                    else{ var meridian = "AM"}
                    if(hr > 12){ hr=Math.abs(hr - 12) }

                    //Unhide the weather information section
                    document.getElementById("weatherInfo").style.display = "block";

                    /**Send data to HTML to display the weather information using getElementID
                    *  The following data retrieved are temperature, city name, country acronymn, feels like temperature
                    *  weather, maximum temperature, minimum temperature, humidity, wind speed, pressure
                    */
                    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) +"&deg;C";
                    document.getElementById("weather-info-1").innerHTML = data.name + ", " +data.sys.country + "<br>" + "Feels Like " + Math.round(data.main.feels_like) +"&deg;C" + "<br>" + Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C" + "<br>" +  weather + "<br>" + hr + ":" + m + meridian;
                    document.getElementById("humidityInfo").innerHTML = data.main.humidity + "%";
                    document.getElementById("windInfo").innerHTML = Math.round(data.wind.speed) +" m/s";
                    document.getElementById("pressureInfo").innerHTML = data.main.pressure + " hPa";
                    document.getElementById("forecast-today-temp1").innerHTML = Math.round(data.main.temp) +"&deg;C";
                    
                    //Creates an array of time forecast
                    /**
                        if(h >= 12){ var meridian = "PM" }
                        else{ var meridian = "AM"}
                        if(h > 12){ h=Math.abs(h - 12) }
                         */
                    var timeZoneArray = [];
                    for (var i = 0; i < 3; i++) {
                        let stringHour = h;
                        timeZoneArray.push(stringHour);
                        h += 3;
                    } 
                    console.log(timeZoneArray);
                    var meridianArray = [];
                    for (var i = 0; i < 3; i++) {
                        if (timeZoneArray[i] > 0 && timeZoneArray[i] < 12){
                            var meridian = "AM";
                            let stringMeridian = timeZoneArray[i] + " " + meridian;
                            meridianArray.push(stringMeridian); 
                        }
                        else if(timeZoneArray[i] >= 12 && timeZoneArray[i] < 24){ 
                            var meridian = "PM"; 
                            var hrs = 0;                           
                            if(timeZoneArray[i] > 12){ 
                                hrs=Math.abs(timeZoneArray[i] - 12);
                                console.log(hrs);
                                let stringMeridian =hrs + " " + meridian;
                                meridianArray.push(stringMeridian);
                             }else{
                                let stringMeridian =timeZoneArray[i] + " " + meridian;
                                meridianArray.push(stringMeridian);
                             }
                        }
                        else{ 
                            var meridian = "AM";
                            if(timeZoneArray[i] > 24){ 
                                hrs=Math.abs(timeZoneArray[i] - 24);
                                console.log(hrs);
                                let stringMeridian = hrs + " " + meridian;
                                meridianArray.push(stringMeridian); 
                            }                           
                            else if(timeZoneArray[i] == 24){
                                hrs=Math.abs(timeZoneArray[i] - 12);
                                console.log(hrs);
                                let stringMeridian = hrs + " " + meridian;
                                meridianArray.push(stringMeridian);
                            }
                            else{
                                let stringMeridian = timeZoneArray[i] + " " + meridian;
                                meridianArray.push(stringMeridian);
                            }
                        }
                    } 
                    console.log(timeZoneArray);
                    console.log(meridianArray);

                    //Variable assigning a string value that includes city name and country acronym 
                    city = data.name + ", " +data.sys.country;
                    $.ajax({                        
                        url: 'https://api.openweathermap.org/data/2.5/forecast?lat='+ latitude +'&lon='+ longitude + "&units=metric" +
                        "&appid=0e091e0fdbc8134a1400945ac6046033",
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data){
                            /**Send data to HTML to display the weather information using getElementID
                            *  The following data retrieved are temperature in every 3 hours, sea level, ground level, visibility
                            */
                            document.getElementById("forecast-today-temp2").innerHTML = Math.round(data.list[1].main.temp) +"&deg;C";
                            document.getElementById("forecast-today-temp3").innerHTML = Math.round(data.list[2].main.temp) +"&deg;C";
                            document.getElementById("forecast-hour1").innerHTML = meridianArray[0];
                            document.getElementById("forecast-hour2").innerHTML = meridianArray[1];
                            document.getElementById("forecast-hour3").innerHTML = meridianArray[2];
                            document.getElementById("ground_level").innerHTML = data.list[1].main.grnd_level + " meters above mean sea level.";
                            document.getElementById("sea_level").innerHTML = data.list[1].main.sea_level + " meters above sea surface.";
                            document.getElementById("visibility").innerHTML = "Visibility radius is " + data.list[1].visibility + " meters.";
                            
                            //Variable declaration
                            let w = data.list[1].wind.deg;
                            let direction = '';
                            let p = data.city.population;
                            p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            //Conditional statement to label the wind direction and labeling the wind direction
                            if(w > 0 && w < 90){direction = 'North/East'}
                            if(w > 90 && w < 180){direction = 'South/East'}
                            if(w > 180 && w < 270){direction = 'South/West'}
                            if(w > 270 && w < 360){direction = 'North/West'}
                            if( w == 0 || w == 360){direction='North'};
                            if( w == 90){direction='East'};
                            if( w == 180){direction='South'};
                            if( w == 270){direction='West'};

                            /**Send data to HTML to display the weather information using getElementID
                            *  The following data retrieved are population and angle of the wind direction,
                            */
                            document.getElementById("wind_direction").innerHTML = "Wind direction at " + data.list[1].wind.deg + "&deg; " + direction +".";
                            document.getElementById("population").innerHTML = city + " currently in " + p + " population.";
                        }
                    });
                }
            });
        }
        //Conditional statement if cityName input textfield is empty it will hide the weather information section and no data retrieved
        else{
            $("#error").html('Field cannot be empty')
            document.getElementById("weatherInfo").style.display = "none";
        }
    });
});

//Functions that will Initial letter of each word will be in UPPERCASE
function initCap(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

