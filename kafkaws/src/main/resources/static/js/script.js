/*var app = angular.module('myApp', []);
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
 });*/

var app = angular.module('yourApp', [ 'ngMaterial', 'ngMessages' ]);
app.controller('AppCtrl', function($scope, $mdDialog, $http) {

	$scope.showPrerenderedDialog = function(ev) {
		$mdDialog.show({
			contentElement : '#myDialog',
			parent : angular.element(document.body),
			targetEvent : ev,
			clickOutsideToClose : false,
			ok : "Select"
		});
	};

	$scope.message = {
		url : 'https://graph.facebook.com/100001704313449/picture?type=normal',
		message : 'Hello'
	}

	$scope.messages = [];
	$scope.flag = false;
	$scope.isCheck = false;

	$scope.showAdvanced = function(ev) {
		$mdDialog.show(
				{
					controller : DialogController,
					templateUrl : 'Topics.html',
					parent : angular.element(document
							.querySelector('#popupContainer')),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : $scope.customFullscreen
				// Only for -xs, -sm breakpoints.
				}).then(function(answer) {
			$scope.data = answer;
			$scope.flag = true;
			/*
			 * var socket = new SockJS('/websocket?user=vamsi'); stompClient =
			 * Stomp.over(socket); stompClient.connect("vamsi", "pass",
			 * function(frame) { stompClient.subscribe('/topic/' + answer.topic,
			 * function(data) { var item = angular.copy($scope.message);
			 * item.message = data.body; $scope.messages.push(item);
			 * $('#textArea').val(data.body); }); });
			 */
		}, function() {
			$scope.data = {};
		});
	};

	$scope.send = function(data) {

		$http.post("http://localhost:9000/kafka/publish",
				JSON.stringify($scope.data)).then(function(response) {
			$scope.data.url = 'https://graph.facebook.com/100001704313449/picture?type=normal';
			$scope.messages.push(angular.copy($scope.data));
			$scope.data.message = "";
			$scope.result = response.config.data;
			$scope.isCheck = true;
		}, function(error) {
			$scope.result = error;
			$scope.isCheck = true;
		});

	}

	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}

	$scope.showAdvanced();

});

app.directive('scrollToBottom', function($timeout, $window) {
    return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection('scrollToBottom', function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        element[0].scrollTop =  element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
});
