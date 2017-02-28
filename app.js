angular.module("QuizApp", [])
       .controller("QuizController", ["$scope", "$http", 'LocalStorageService', 
		function($scope, $http, LocalStorageService){
		    var qc = this;
			
			qc.listStudents = [];
			qc.listQuestions = [];
			qc.askedQuestions = [];
			qc.selectedStudent = "";
			qc.selectedQuestion = "";
			
		    //save all to local storage
		    qc.message = "You got a problem";
		    

		    
		    qc.getQuestions = function(){
		    	
				$http.get("question.txt")
				.then(function(response){
				
				  qc.rawQuestions = response.data; 
				  for (var i = 0; i < qc.rawQuestions.length; i++)
				   {
						qc.listQuestions[i] = qc.rawQuestions[i];

				   }
				});
		    };
			   
			qc.getStudents = function(){   
				
				$http.get("student.txt")
				.then(function(response){
				  qc.rawStudents = response.data;
				  for (var i = 0; i < qc.rawStudents.length; i++)
				   {
						qc.listStudents[i] = qc.rawStudents[i];
				   }
				});
				//return LocalStorageService.setData('my-storage', angular.toJson(qc.listStudents, qc.listQuestions));
		    };
		    qc.getRandomQuestionStudent = function(){
		    	qc.selectedStudent = qc.listStudents[Math.round(Math.floor(Math.random() * 3))];
		    	qc.selectedQuestion = qc.listQuestions[Math.round(Math.floor(Math.random() * 3))];
		    };
			
			qc.latestData = function() {
		        return LocalStorageService.getData('my-storage');
		    };
			   
			qc.correct = function(fname, lname, question)
			{
				qc.temp = qc.latestData();
				
				var asked = {firstname: fname, lastname: lname, questionAsked: question, score: "right"};
				console.log(angular.toJson(asked));
				
				qc.getRandomQuestionStudent();
				
				return LocalStorageService.setData('my-storage', angular.toJson(qc.asked));
				//saave to local storage
			    
			};
			qc.incorrect = function(fname, lname, question)
			{
				//saave to local storage
			    qc.temp = qc.latestData();
				
				var asked = {firstname: fname, lastname: lname, questionAsked: question, score: "wrong"};
				console.log(angular.toJson(asked));
				
				qc.getRandomQuestionStudent();
				
				return LocalStorageService.setData('my-storage', angular.toJson(qc.asked));
			};

			   
			   
		   
		    
		   
		}])
		.factory("LocalStorageService", function($window, $rootScope) {
    
		    angular.element($window).on('storage', function(event) {
		        if (event.key === 'my-storage') {
		            $rootScope.$apply();
		        }
		    });    
		    
		    return {
		        setData: function(key, val) 
		        {
					
		            $window.localStorage && $window.localStorage.setItem(key, val);
		            return this;
		        },
		        getData: function(key) 
		        {
		            
		            var val = $window.localStorage && $window.localStorage.getItem(key);
		            
		            var data = angular.fromJson(val);
		            
		            return data; 
    		    }
		    	
		    };
			
		});