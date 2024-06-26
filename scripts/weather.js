/**
 * Student Name: Ralph Eimerson Ompoc
 * Student ID: c0921675
 * Date: April 9, 2024
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
        var cityNameValue = $("#cityNameValue").val();
        //var cityName_temp = cityName.textContent;
        //Conditional statement and validates if text field is empty or not            
        if(cityNameValue != ''){
            function weatherUpdate(){
            var cityName = $("#cityNameValue").val();
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
                        document.getElementById("currentDT").innerHTML = dateTime(date);
                        date.setHours(date.getUTCHours() + timezoneOffset);
                        var h = date.getHours();
                        var min = date.getMinutes();
                        var hr = h;
                        if(hr >= 12){ var meridian = "PM" }
                        else{ var meridian = "AM"}
                        if(hr > 12){ hr=Math.abs(hr - 12) }
                        var m = "" + min;
                        if (m.length < 2) { m = "0" + m}
                        //Unhide the weather information section
                        document.getElementById("weatherInfo").style.display = "block";
        
                        /**Send data to HTML to display the weather information using getElementID
                        *  The following data retrieved are temperature, city name, country acronymn, feels like temperature
                        *  weather, maximum temperature, minimum temperature, humidity, wind speed, pressure
                        */
                        document.getElementById("temperature").innerHTML = Math.round(data.main.temp) +"&deg;C";
                        document.getElementById("temperature-lg").innerHTML = Math.round(data.main.temp) +"&deg;C";
                        document.getElementById("weather-info-1").innerHTML = data.name + ", " +data.sys.country + "<br>" + "Feels Like " + Math.round(data.main.feels_like) +"&deg;C" + "<br>" + Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C" + "<br>" +  weather;
                        document.getElementById("weather-info-1-lg").innerHTML = data.name + ", " +data.sys.country + "<br>" + "Feels Like " + Math.round(data.main.feels_like) +"&deg;C" + "<br>" + Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C" + "<br>" +  weather;
                        document.getElementById("humidityInfo").innerHTML = data.main.humidity + "%";
                        document.getElementById("windInfo").innerHTML = Math.round(data.wind.speed) +" m/s";
                        document.getElementById("pressureInfo").innerHTML = data.main.pressure + " hPa";
                        document.getElementById("humidityInfo_lg").innerHTML = data.main.humidity + "%";
                        document.getElementById("windInfo_lg").innerHTML = Math.round(data.wind.speed) +" m/s";
                        document.getElementById("pressureInfo_lg").innerHTML = data.main.pressure + " hPa";
                        document.getElementById("forecast-today-temp1").innerHTML = Math.round(data.main.temp) +"&deg;C";
                        document.getElementById("digitalClock").innerHTML = hr + ":" + m + " " + meridian + " | " + data.name + ", " + data.sys.country;
                        document.getElementById("digitalClock-lg").innerHTML = hr + ":" + m + " " + meridian + "<br> <h6>" + data.name + ", " + data.sys.country + "<h6>";
                        // Weather information background
                        document.getElementById('weather-info-bg').src = weatherBG(weather, hr, meridian);
                        document.getElementById('weather-info-bg-lg').src = weatherBG(weather, hr, meridian);

                        //Creates an array of time forecast
                        var timeZoneArray = [];
                        for (var i = 0; i < 3; i++) {
                            let stringHour = h;
                            timeZoneArray.push(stringHour);
                            h += 3;
                        } 
                        var meridianArray = [];
                        for (var i = 0; i < 3; i++) {
                            if (timeZoneArray[i] >= 0 && timeZoneArray[i] < 12){
                                var meridian = "AM";                                
                                let stringMeridian = timeZoneArray[i] + " " + meridian;
                                meridianArray.push(stringMeridian); 
                            }
                            else if(timeZoneArray[i] >= 12 && timeZoneArray[i] < 24){ 
                                var meridian = "PM"; 
                                var hrs = 0;                           
                                if(timeZoneArray[i] > 12){ 
                                    hrs=Math.abs(timeZoneArray[i] - 12);
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
                                    let stringMeridian = hrs + " " + meridian;
                                    meridianArray.push(stringMeridian); 
                                }                           
                                else if(timeZoneArray[i] == 24){
                                    hrs=Math.abs(timeZoneArray[i] - 12);
                                    let stringMeridian = hrs + " " + meridian;
                                    meridianArray.push(stringMeridian);
                                }
                                else{
                                    let stringMeridian = timeZoneArray[i] + " " + meridian;
                                    meridianArray.push(stringMeridian);
                                }
                            }
                        }
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
                                let weatherForecast1 = initCap(data.list[0].weather[0].description);
                                let weatherForecast2 = initCap(data.list[1].weather[0].description);
                                let weatherForecast3 = initCap(data.list[2].weather[0].description);
                                document.getElementById("forecast-today-temp2").innerHTML = Math.round(data.list[1].main.temp) +"&deg;C";
                                document.getElementById("forecast-today-temp3").innerHTML = Math.round(data.list[2].main.temp) +"&deg;C";
                                document.getElementById("forecast-hour1").innerHTML = meridianArray[0];
                                document.getElementById("forecast-hour2").innerHTML = meridianArray[1];
                                document.getElementById("forecast-hour3").innerHTML = meridianArray[2];
                                document.getElementById("ground_level").innerHTML = data.list[1].main.grnd_level + " meters above mean sea level.";
                                document.getElementById("sea_level").innerHTML = data.list[1].main.sea_level + " meters above sea surface.";
                                document.getElementById("visibility").innerHTML = "Visibility radius is " + data.list[1].visibility + " meters.";
                                
                                // Weather Icon
                                // Get the reference to the image element
                                document.querySelector('#forecast-1').src = weatherIcon(weatherForecast1, meridianArray[0]);
                                document.querySelector('#forecast-2').src = weatherIcon(weatherForecast2, meridianArray[1]);
                                document.querySelector('#forecast-3').src = weatherIcon(weatherForecast3, meridianArray[2]);
                                document.querySelector('#forecast-1-lg').src = weatherIcon(weatherForecast1, meridianArray[0]);
                                document.querySelector('#forecast-2-lg').src = weatherIcon(weatherForecast2, meridianArray[1]);
                                document.querySelector('#forecast-3-lg').src = weatherIcon(weatherForecast3, meridianArray[2]);

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
            // Set interval weather update and digital update for every 1 second
            weatherUpdate();
            setInterval(weatherUpdate, 1000);
        }
        //Conditional statement if cityName input textfield is empty it will hide the weather information section and no data retrieved
        else{
            $("#error").html('Field cannot be empty')
            document.getElementById("weatherInfo").style.display = "none";
        }
    });
});

//Functions that will change Initial letter of each word in UPPERCASE
function initCap(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}
/* Function to determine the proper weather icon for three weather forecast in every 3 hours
*       Available weather icon are sunny cloud, rainy, snowy and clear sky for
*       everning or daylight.
*/
function weatherIcon(w, timeForecast){
    var timeWeather = timeForecast.split(" ");
    var hr = parseInt(timeWeather[0]);
    let weather = w.toLowerCase();
    if(timeWeather[1] == 'AM'){
        if (hr > 5 && hr < 12){
            if(weather.indexOf("cloud") !== -1){return timeIcon = 'images/weather-icon/sunny-cloud.svg';}
            if(weather.indexOf("rain") !== -1){return timeIcon = 'images/weather-icon/rainy.svg';}
            if(weather.indexOf("snow") !== -1){return timeIcon = 'images/weather-icon/snowy-cloud.svg';}
            return timeIcon = 'images/weather-icon/sunny.svg';
        }
        if (hr == 12 || (hr > 0 && hr < 6)){
            if(weather.indexOf("cloud") !== -1){return timeIcon = 'images/weather-icon/night-cloudy.svg';}
            if(weather.indexOf("rain") !== -1){return timeIcon = 'images/weather-icon/rainy.svg';}
            if(weather.indexOf("snow") !== -1){return timeIcon = 'images/weather-icon/snowy-cloud.svg';}
            return timeIcon = 'images/weather-icon/night-sky.svg';
        }
    }
    if(timeWeather[1] == 'PM'){
        if (hr > 5 && hr < 12){
            if(weather.indexOf("cloud") !== -1){return timeIcon = 'images/weather-icon/night-cloudy.svg';}
            if(weather.indexOf("rain") !== -1){return timeIcon = 'images/weather-icon/rainy.svg';}
            if(weather.indexOf("snow") !== -1){return timeIcon = 'images/weather-icon/snowy-cloud.svg';}
            return timeIcon = 'images/weather-icon/night-sky.svg';
        }
        if (hr == 12 || (hr > 0 && hr < 6)){
            if(weather.indexOf("cloud") !== -1){return timeIcon = 'images/weather-icon/sunny-cloud.svg';}
            if(weather.indexOf("rain") !== -1){return timeIcon = 'images/weather-icon/rainy.svg';}
            if(weather.indexOf("snow") !== -1){return timeIcon = 'images/weather-icon/snowy-cloud.svg';}
            return timeIcon = 'images/weather-icon/sunny-cloud.svg';
        }
    }
}
/* Function to determine the proper background image for the weather information
*       available background images are cloudy sky, rainy, snowy and clear sky for
*       everning or daylight.
*/
function weatherBG(w, h, m){
    var timeWeather = m;
    var hr = parseInt(h);
    let weather = w.toLowerCase();
    if(timeWeather == 'AM'){
        if (hr > 5 && hr < 12){
            if(weather.indexOf("cloud") !== -1){return weatherBg = 'images/weather-bg/cloudy-sky-AM.svg';}
            if(weather.indexOf("rain") !== -1){return weatherBg = 'images/weather-bg/rainy-sky-AM.svg';}
            if(weather.indexOf("snow") !== -1){return weatherBg = 'images/weather-bg/snowy-sky-AM.svg';}
            return weatherBg = 'images/weather-bg/clear-sky-AM.svg';
        }
        if (hr == 12 || (hr > 0 && hr < 6)){
            if(weather.indexOf("cloud") !== -1){return weatherBg = 'images/weather-bg/cloudy-sky-PM.svg';}
            if(weather.indexOf("rain") !== -1){return weatherBg = 'images/weather-bg/rainy-sky-PM.svg';}
            if(weather.indexOf("snow") !== -1){return weatherBg = 'images/weather-bg/snowy-sky-PM.svg';}
            return weatherBg = 'images/weather-bg/clear-sky-PM.svg';
        }
    }
    if(timeWeather == 'PM'){
        if (hr > 5 && hr < 12){
            if(weather.indexOf("cloud") !== -1){return weatherBg = 'images/weather-bg/cloudy-sky-PM.svg';}
            if(weather.indexOf("rain") !== -1){return weatherBg = 'images/weather-bg/rainy-sky-PM.svg';}
            if(weather.indexOf("snow") !== -1){return weatherBg = 'images/weather-bg/snowy-sky-PM.svg';}
            return weatherBg = 'images/weather-bg/clear-sky-PM.svg';
        }
        if (hr == 12 || (hr > 0 && hr < 6)){
            if(weather.indexOf("cloud") !== -1){return weatherBg = 'images/weather-bg/cloudy-sky-AM.svg';}
            if(weather.indexOf("rain") !== -1){return weatherBg = 'images/weather-bg/rainy-sky-AM.svg';}
            if(weather.indexOf("snow") !== -1){return weatherBg = 'images/weather-bg/snowy-sky-AM.svg';}
            return weatherBg = 'images/weather-bg/clear-sky-AM.svg';
        }
    }
}
// Function for the current date and time displayed in Panel 3 
function dateTime(dateValue){
    var dateTimeValue = dateValue + '';
    var arrayDT = dateTimeValue.split(" ");
    var dayArray =["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var monthArray =["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var currentDate = '';
    var currentDay = '';
    monthArray.forEach((month) => {
        if(month.indexOf(arrayDT[1]) !== -1){ currentDate = month + ' ' + arrayDT[2] + ', ' + arrayDT[3]}
    });
    dayArray.forEach((day) => {
        if(day.indexOf(arrayDT[0]) !== -1){ currentDay = day}
    });
    var timeValue = arrayDT[4].split(":");
    var hr = timeValue[0];
    if(hr >= 12){ var meridian = "PM" }
    else{ var meridian = "AM"}
    if(hr > 12){ hr=Math.abs(hr - 12) }
    var currentTime = hr + ':' + timeValue[1] + ':' + timeValue[2] + ' ' + meridian;
    var currentDT = '<p class="fs-3" style="font-family: \'Orbitron\', sans-serif;">'+ currentTime + ' | ' + currentDay + '<br>' + currentDate +'</p>';
    return currentDT;
}