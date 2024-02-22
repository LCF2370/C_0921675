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
                    console.log(data);
                }
            });
        }else{
            $("#error").html('Field cannot be empty')
        }

    });
});
/*function checkWeather(){
    var city = document.getElementById("cityNameValue").value;
    console.log(city);
}*/