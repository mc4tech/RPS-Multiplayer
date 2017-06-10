$(document).ready(function(){
	//Initialize Firebase
	var config = {
	    apiKey: "AIzaSyDkCSBNx1Bdn5gMEz-HWDW-WRpWf56f5w0",
	    authDomain: "rps-multiplayer-77206.firebaseapp.com",
	    databaseURL: "https://rps-multiplayer-77206.firebaseio.com",
	    projectId: "rps-multiplayer-77206",
	    storageBucket: "rps-multiplayer-77206.appspot.com",
	    messagingSenderId: "174499334824"
	};

	firebase.initializeApp(config);
	//setting database to firebase.database
	var database = firebase.database();
	var userName = "";
	var trashTalk = "";
	var	player1 = "";
	var	player2 = "";
	var position = "";
	var welcomeMessage =""

	database.ref().on("value", function(snapshot) {
	  console.log(snapshot.val());
	  player1 = snapshot.val().player1;
	  player2 = snapshot.val().player2;
	  console.log("p1: " +player1);
	  console.log("p2: " +player2);

	  // If any errors are experienced, log them to console.
	}, function(errorObject) {
	   console.log("The read failed: " + errorObject.code);
	});

	//hides user input box after user submits name
	function hideUserInput() {
		$("#start").hide();
		$("#userName").hide();
	    // $("#messageField").html("Get Ready " + userName + "!" + " You are " + position <br>)
		welcomeMessage = $("<p>Get Ready " + userName + "! You are " + position + "</p>" );
		$("#messageField").append(welcomeMessage);
		// return welcomeMessage;
	};

	// displays player turn/waiting message
	function nextUp() {
		if (player2 != "") {
			welcomeMessage.append("<br>Waiting for " + player2 + ".");
			console.log("Wh " + welcomeMessage);
		}else {
			welcomeMessage.append("<br>It's your turn.")
		}

	};


	$("#start").on("click", function(event){
		// Prevent form from submitting
  		event.preventDefault();

  		//get userName
		userName = $("#userName").val().trim();
		
		
		console.log(player1);

		if(player1 === ""){
			position = "Player 1!"
			hideUserInput();	
			nextUp();		
			database.ref().set({
			player1: userName,
			player2: player2,
			})	
		}else {
			position = "Player 2!"
			hideUserInput();
			nextUp();
			database.ref().set({
				player1: player1,
				player2: userName,
			})
		}
		
	})

	//Displays trash talk
	$("#send").on("click", function(event){
		// Prevent form from submitting
  		event.preventDefault();	

  		trashTalk = $("#trashTalk").val().trim();
  		$(".panel-body").append(trashTalk);
	})
});