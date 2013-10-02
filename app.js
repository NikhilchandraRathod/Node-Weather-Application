var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var weather = require('./modules/weather');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.getWeather);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//
//var firstTime = 0;
//var secondTime = 0;
//var thirdTime = 0;
//
//var firstInterval = setInterval(function(){
//    firstTime += 1;
//},1000);
//var secondInterval = setInterval(function(){
//    secondTime += 1;
//},1000);
//var thirdInterval = setInterval(function(){
//    thirdTime += 1;
//},1000);
//
//weather.getWeather("surat", function(data){
//    clearInterval(firstInterval);
//    console.log("First request time: " + firstTime.toString());
//    if(data.status){
//        console.log(data.info);
//    }else{
//        console.log(data.message);
//    }
//});
//
//weather.getWeather("ahmedabad", function(data){
//    clearInterval(secondInterval);
//    console.log("Second request time: " + secondTime.toString());
//    if(data.status){
//        console.log(data.info);
//    }else{
//        console.log(data.message);
//    }
//});
//
//weather.getWeather("vadodara", function(data){
//    clearInterval(thirdInterval);
//    console.log("Third request time: " + thirdTime.toString());
//    if(data.status){
//        console.log(data.info);
//    }else{
//        console.log(data.message);
//    }
//});




