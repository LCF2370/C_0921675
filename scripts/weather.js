let latitude = 0;
let longitude = 0;
$(document).ready(function(){
    $('#checkWeather').click(function(){
        var cityName = $("#cityNameValue").val();
        //console.log(cityName);
        if(cityName != ''){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+"&units=metric"
                +"&APPID=0e091e0fdbc8134a1400945ac6046033",
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){                    
                    let weather = initCap(data.weather[0].description);
                    console.log(data);
                    latitude = data.coord.lat
                    longitude = data.coord.lon
                    document.getElementById("weatherInfo").style.display = "block";
                    document.getElementById("city_country").innerHTML = data.name + ", " +data.sys.country;
                    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) +"&deg;C"; 
                    document.getElementById("feels_like").innerHTML = "Feels Like " + Math.round(data.main.feels_like) +"&deg;C";
                    document.getElementById("temp_min_max").innerHTML = Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C";
                    document.getElementById("weather").innerHTML = weather;
                    document.getElementById("humidityInfo").innerHTML = data.main.humidity + "%";
                    document.getElementById("windInfo").innerHTML = Math.round(data.wind.speed) +" m/s";
                    document.getElementById("pressureInfo").innerHTML = data.main.pressure + " hPa";

                    $.ajax({                        
                        url: 'api.openweathermap.org/data/2.5/forecast?lat='+ latitude +'&lon='+ longitude +
                        "&appid=0e091e0fdbc8134a1400945ac6046033",
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data){
                            console.log(data);
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
