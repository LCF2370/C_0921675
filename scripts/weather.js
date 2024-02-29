let latitude = 0;
let longitude = 0;
let city = '';
$(document).ready(function(){
    $('#checkWeather').click(function(){
        var cityName = $("#cityNameValue").val();
        if(cityName != ''){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+"&units=metric"
                +"&APPID=0e091e0fdbc8134a1400945ac6046033",
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){                    
                    let weather = initCap(data.weather[0].description);

                    latitude = data.coord.lat;
                    longitude = data.coord.lon;
                    var timezoneOffset = longitude / 15;
                    var date = new Date();
                    date.setHours(date.getUTCHours() + timezoneOffset);
                    var h = date.getHours();
                    var m = date.getMinutes();
                    if(h >= 12){ var meridian = "PM" }
                    else{ var meridian = "AM"}
                    if(h > 12){ h=Math.abs(h - 12) }

                    document.getElementById("weatherInfo").style.display = "block";
                    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) +"&deg;C";

                    document.getElementById("weather-info-1").innerHTML = data.name + ", " +data.sys.country + "<br>" + "Feels Like " + Math.round(data.main.feels_like) +"&deg;C" + "<br>" + Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C" + "<br>" +  weather + "<br>" + h + ":" + m + meridian;

                    document.getElementById("humidityInfo").innerHTML = data.main.humidity + "%";
                    document.getElementById("windInfo").innerHTML = Math.round(data.wind.speed) +" m/s";
                    document.getElementById("pressureInfo").innerHTML = data.main.pressure + " hPa";
                    document.getElementById("forecast-today-temp1").innerHTML = Math.round(data.main.temp) +"&deg;C";
                    
                    var timeZoneArray = [];
                    for (var i = 0; i < 3; i++) {
                        let stringHour = h + " " + meridian;
                        timeZoneArray.push(stringHour);
                        h += 3;
                    } 
                    city = data.name + ", " +data.sys.country;
                    $.ajax({                        
                        url: 'https://api.openweathermap.org/data/2.5/forecast?lat='+ latitude +'&lon='+ longitude + "&units=metric" +
                        "&appid=0e091e0fdbc8134a1400945ac6046033",
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data){
                            document.getElementById("forecast-today-temp2").innerHTML = Math.round(data.list[1].main.temp) +"&deg;C";
                            document.getElementById("forecast-today-temp3").innerHTML = Math.round(data.list[2].main.temp) +"&deg;C";
                            document.getElementById("forecast-hour1").innerHTML = timeZoneArray[0];
                            document.getElementById("forecast-hour2").innerHTML = timeZoneArray[1];
                            document.getElementById("forecast-hour3").innerHTML = timeZoneArray[2];
                            document.getElementById("ground_level").innerHTML = data.list[1].main.grnd_level + " meters above mean sea level.";
                            document.getElementById("sea_level").innerHTML = data.list[1].main.sea_level + " meters above sea surface.";
                            document.getElementById("visibility").innerHTML = "Visibility radius is " + data.list[1].visibility + " meters.";
                            let w = data.list[1].wind.deg;
                            let direction = '';
                            if(w > 0 && w < 90){direction = 'North/East'}
                            if(w > 90 && w < 180){direction = 'South/East'}
                            if(w > 180 && w < 270){direction = 'South/West'}
                            if(w > 270 && w < 360){direction = 'North/West'}
                            if( w == 0 || w == 360){direction='North'};
                            if( w == 90){direction='East'};
                            if( w == 180){direction='South'};
                            if( w == 270){direction='West'};
                            document.getElementById("wind_direction").innerHTML = "Wind direction at " + data.list[1].wind.deg + "&deg; " + direction +".";
                            let p = data.city.population;
                            p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            document.getElementById("population").innerHTML = city + " currently in " + p + " population.";
                        }
                    });
                }
            });
        }else{
            $("#error").html('Field cannot be empty')
            document.getElementById("weatherInfo").style.display = "none";
        }
    });
});

function initCap(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

