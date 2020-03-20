
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBPF4cEjEgZiimoiZrZe9_jSZRRuaRjeB0",
    authDomain: "train-scheduler-3545d.firebaseapp.com",
    databaseURL: "https://train-scheduler-3545d.firebaseio.com",
    projectId: "train-scheduler-3545d",
    storageBucket: "train-scheduler-3545d.appspot.com",
    messagingSenderId: "679105665932",
    appId: "1:679105665932:web:f313cf65724ab0566c94a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // When I click the submit button, do the following:
$("#TrainBtn").on("click", function(){
	// Set up new variables that get the value from the form
	
	var newName = $("#trainName").val().trim();
	var newDestination = $("#destination").val().trim();
	var newFirstTime = $("#firstTime").val().trim();
	var newFrequency = $("#frequency").val().trim();

	// Create a new object and push it to the database
	var newTrain = {
		name: newName,
		dest: newDestination,
		first: newFirstTime,
		freq: newFrequency,
	}

	//uploads train data to database
	database.ref().push(newTrain);
	console.log(newTrain);

	// Clear out the form fields
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTime").val("");
	$("#frequency").val("");

	console.log("newTrain: " + newTrain);
	console.log("Name: " + newTrain.name);
	console.log("Destination: " + newTrain.dest);
	console.log("First Time: " + newTrain.first);
	console.log("Frequency: " + newTrain.freq);



	return false;
});


database.ref().on("child_added", function(childSnapshot){
	
	
	
	console.log("Child Snapshot Value: " + childSnapshot.val());

	var newName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var newFirstTime = childSnapshot.val().first;
	var newFrequency = childSnapshot.val().freq;

	console.log('newFirstTime', newFirstTime)
	console.log("newName: " + newName);
	console.log("newDestination: " + newDestination);
	console.log("newFrequency: " + newFrequency);

	
	
	var currentTime = moment();
	console.log(moment(currentTime).format("hh:mm"));

	var firstTimeConverted = moment(newFirstTime, "hh:mm").subtract(1, "days");
	
	// Get the difference between now and the time of the first train
	// by subtracting the current time from the first train time
	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + timeDiff);

	// Time apart
	var remainder = timeDiff % newFrequency;
	console.log("Remainder: ", remainder);

	// Minutes until the next train calculated by subtracting the the remainder from the frequency
	var minsUntilTrain = newFrequency - remainder;
	console.log("Time Til Train: " + minsUntilTrain);

	// Calculated next train by adding the current time to the var minsUntilTrain
	var nextTrainTime = moment().add(minsUntilTrain, "minutes");
	console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));

	$("#trains").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain);

	return false;
});