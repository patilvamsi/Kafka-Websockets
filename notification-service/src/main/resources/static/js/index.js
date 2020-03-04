/*$(window).ready(function() {
	var socket = new SockJS('/websocket?user=vamsi');
	stompClient = Stomp.over(socket);
	connect();
});

function connect() {
	var user = {};
	user.name = "vamsi";
	user.pass = "krishna";
	stompClient.connect("vamsi", "pass", function(frame) {
		stompClient.subscribe('/topic/pushNotification',
				function(notification) {
					$('#textArea').val(notification.body);
				});
	});
}*/

angular
		.module('myApp', [ 'ngMaterial', 'ngMessages' ])
		.controller(
				'AppCtrl',function($scope, $mdDialog) {
					
					
					
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

					//$scope.messages.push(angular.copy($scope.message));
					
					
					$scope.flag = false;

					

					$scope.showAdvanced = function(ev) {
						$mdDialog.show(
								{
									controller : DialogController,
									templateUrl : 'Topics.html',
									parent : angular.element(document
											.querySelector('#popupContainer')),
									targetEvent : ev,
									clickOutsideToClose : false,
									fullscreen : $scope.customFullscreen
								// Only for -xs, -sm breakpoints.
								}).then(function(answer) {
									 $scope.$broadcast('someEvent', answer);
							
						}, function() {
							$scope.data = {};
						});
					};

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
					
					$scope.$on('someEvent', function(event, answer) {
					
						$scope.data = answer;
						$scope.flag = true;
						var socket = new SockJS('/websocket?user=vamsi');
						stompClient = Stomp.over(socket);
						stompClient.connect("vamsi", "pass", function(frame) {
						stompClient.subscribe('/topic/'+answer.topic,
									function(data) {
										var item = angular.copy($scope.message);
										item.message = data.body;
										$scope.messages.push(item);
										//$('#textArea').val(JSON.stringify($scope.messages));
										$scope.$apply();
							});
						});					
					});

					$scope.showAdvanced();

				}).directive('scrollToBottom', function($timeout, $window) {
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

/*
 * stompClient.send("/app/chat/" + topic, {}, JSON.stringify({ from:
 * $("#from").val(), text: $('#text').val(), }));
 */