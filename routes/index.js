var weather = require("../modules/weather");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getWeather = function(req, res){
    var cityName = req.body.txtCity;
    weather.getWeather(cityName,function(data){
        try
        {
            if(data.status){
                data = JSON.parse(data.info);
                if(data.main){
                    var info = {
                        temp: weather.convertTemperature('c',data.main.temp),
                        temp_min: weather.convertTemperature('c',data.main.temp_min),
                        temp_max: weather.convertTemperature('c',data.main.temp_max)
                    };
                    console.log(data);
                    res.render('index', { error: false, city: (data.name == "") ? data.sys.country : data.name , info: info });
                }else{
                    res.render('index', { error: false, info: "Error getting data" });
                }
            }else{
                res.render('index', { error: true, info: data.message });
            }
        }catch(e){
            res.render('index', { error: true, info: e.message });
        }
    });
};