class Controller {

  do_alert(text) {
    var msg = "This is an alert from chat.js";
    if(text) {
      msg +=("\n" + text)
    }
    alert(msg)
  }

	scroll_to_end() {
		$(".scroll-600.custom-scrollbar").stop().animate({ scrollTop: $(".scroll-600.custom-scrollbar")[0].scrollHeight}, 1000);
	}

	submit_msg() {

	}
}

$(() => {
	var socket = io();
	var c = new Controller();

	$("#RightChat").hide();
	$("#LeftChat").hide();


	$("#sendMsg").click(function(){
		var msg = $('#txtMsg').val();
		socket.emit("chat message", msg);
		$('#txtMsg').val('');

		// Adding html on current window
		var chatDiv = $("#RightChat").clone();
		chatDiv.show();
		chatDiv.removeAttr("id");
		chatDiv = chatDiv.html();
		chatDiv = chatDiv.replace("#RightChat", msg);
		$('#ChatForm').append(chatDiv);
		c.scroll_to_end();

		return false;
	});

	socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
			// c.do_alert("[client]received: " + msg);
			var chatDiv = $("#LeftChat").clone();
			console.log("former: " + chatDiv);
			chatDiv.show();
			console.log("show: " + chatDiv);
			chatDiv.removeAttr("id");
			console.log("no id : " + chatDiv);
			chatDiv = chatDiv.html();
			console.log("html : " + chatDiv);
			chatDiv = chatDiv.replace("#LeftChat", msg);
			console.log("final : " + chatDiv);
			$('#ChatForm').append(chatDiv);
			c.scroll_to_end();
  });

	$("#txtMsg").keypress(function(event){
		if ( event.which == 13 ) {
				$("#sendMsg").click();
		  }
	});

	c.scroll_to_end();
});
