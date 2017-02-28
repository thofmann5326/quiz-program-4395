var myModule = angular.module('local_storage_app', []);

myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
    
    var mc = this;
	
	mc.presidentName = "";
	mc.presidentYear = "";
	mc.background = "emphasis";
	mc.presidents = [];
	
	
    //run first time, then comment out
    mc.presidents =
    [
        {
            name: "Ronald Reagan",
            year: 1980
        },
        {
            name: "George H.W. Bush",
            year: 1988
        },
        {
            name: "William Clinton",
            year: 1992
        },
        {
            name: "George W. Bush",
            year: 2000
        },
        {
            name:"Barack Obama",
            year: 2008
        }
        
    ];

	mc.emphasis = function (status, $event){
		
		var el = $event.target.id;
		
		if(status){
			console.log("enter: " + el);
			mc.background = "emphasis";
			console.log(mc.background);
		} else {
			console.log("exit: " + el);		
			mc.background = "deemphasis";
			console.log(mc.background);
		}
	}
	
	mc.remove = function($index){

		mc.presidents = mc.latestData();
		mc.presidents.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(mc.presidents));		
		
	}
    
    mc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
    mc.update = function(pname, pyear) {
		mc.presidents = mc.latestData();
		if(mc.presidents == null){
			mc.presidents = [];
		}
		var president = { name: pname, year: pyear};
		console.log(angular.toJson(president));
		mc.presidents.push(president);
        return LocalStorageService.setData('my-storage', angular.toJson(mc.presidents));
    };

    //Check to see if null
	if(mc.presidents != null){
		mc.presidents = mc.latestData();
	}else{
		console.log("crikey");
	}
}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});