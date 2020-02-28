
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) { 
	$scope.user = {};
	$scope.result = "Please click on submit to see result."
	$scope.submit = function() {

		
		$http.post("http://localhost:9000/kafka/publish",
				JSON.stringify($scope.user)).then(function(response) {
					$scope.user.firstName = "";
					$scope.user.lastName = "";
					$scope.result = response.config.data;
		}, function(error) {
			$scope.result = error;
		});

	}
});
