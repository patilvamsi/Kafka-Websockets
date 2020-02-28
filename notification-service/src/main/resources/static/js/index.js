$( window ).ready(function() {
	var socket = new SockJS('/websocket?user=vamsi');
	  stompClient = Stomp.over(socket);
	  connect();
});

function connect() {
	var user = {};
	user.name = "vamsi";
	user.pass = "krishna";
  stompClient.connect("vamsi","pass", function (frame) {
      stompClient.subscribe('/topic/pushNotification', function (notification) {
          $('#textArea').val(notification.body);
       });
  });
}

/*stompClient.send("/app/chat/" + topic, {}, JSON.stringify({
    from: $("#from").val(),
    text: $('#text').val(),
}));*/