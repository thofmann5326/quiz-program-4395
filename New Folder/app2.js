angular.module("ForecastApp", [])
	   .controller("ForecastController", ["$scope", "$http", 
		function($scope, $http){
		   
		   var fc = this;
		   
		   var resturl = "https://api.darksky.net/forecast/9f86ba437f1f5657930e2a1b76a733cb/34.982890, -101.917154";
		   
		   //resturl +="?callback=jasonp_callback";
		   
		   fc.message = "Hello World";
		   //$http.jsonp(resturl, {jsonpCallbackParam: 'callback'})
		   $http.get("data.txt")
		   //.then(function(response){
			//   fc.forecast = angular.fromJson(response.data);
			//   fc.temp 	   = fc.forecast.currently.temperature;
			//   fc.dp 	   = fc.forecast.currently.dewPoint;
			 //  fc.humidity = parseFloat(fc.forecast.currently.humidity) * 100;
			 
			fc.student = angular
			fc.fn = response.data;
		   });
		   
	   }]);