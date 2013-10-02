var http = require("http");

exports.getWeather = function(cityName, callback){

    var weatherData = "";
    var options = {
        hostname: "api.openweathermap.org",
        path: "/data/2.5/weather?q=" + cityName,
        method: "GET"
    };
    
    
    var request = http.request(options, function(response){
        response.on("data", function(chunk){
            weatherData += chunk.toString("utf8");
        });
        
        response.on("error", function(e){
            callback({
                status: false,
                message: e.message
            });
        });
        
        response.on("end", function(){
            callback({
                status: true,
                message: "Get weather information successfully.",
                info: weatherData
            });
        });
    });
    
    request.end();
};


exports.convertTemperature = function(DEG, kelvin){
    return Math.round(DEG == 'c' ? (kelvin - 273.15) : (kelvin*9/5 - 459.67));
};


