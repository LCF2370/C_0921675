$(document).ready(function(){
    $('#checkWeather').click(function(){
        var cityName = $("#cityNameValue").val();
        //console.log(cityName);
        if(cityName != ''){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+"&units=metric"
                +"&APPID=c10bb3bd22f90d636baa008b1529ee25",
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){                    
                    let weather = initCap(data.weather[0].description);
                    console.log(data);
                    document.getElementById("city_country").innerHTML = data.name + ", " +data.sys.country;
                    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) +"&deg;C"; 
                    document.getElementById("feels_like").innerHTML = "Feels Like " + Math.round(data.main.feels_like) +"&deg;C";
                    document.getElementById("temp_min_max").innerHTML = Math.round(data.main.temp_max) +"&deg;C" + " / " + Math.round(data.main.temp_min) +"&deg;C";
                    document.getElementById("weather").innerHTML = weather;
                    document.getElementById("humidityInfo").innerHTML = data.main.humidity + "%";
                    document.getElementById("windInfo").innerHTML = Math.round(data.wind.speed) +" m/s";
                    document.getElementById("pressureInfo").innerHTML = data.main.pressure + " hPa";
                    document.getElementById("time_zone").innerHTML = timeZone(data.sys.sunrise);
                }
            });
        }else{
            $("#error").html('Field cannot be empty')
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


function timeZone(time_zone){
    const today = new Date(time_zone);
    let h = today.getHours();
    let n = h - 12;
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    if(h >= 12){ var meridian = "PM"}
    else{ var meridian = "AM"}
    setTimeout(timeZone, 1000);
    return n + ":" + m + " " + meridian;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}