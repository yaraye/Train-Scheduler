
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyANg3FBpa_6g6eUIsshwx1z09uBmHPLKJw",
    authDomain: "traintime-30c3d.firebaseapp.com",
    databaseURL: "https://traintime-30c3d.firebaseio.com",
    projectId: "traintime-30c3d",
    storageBucket: "",
    messagingSenderId: "355571029647"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#submit-btn").on("click", function(event) {
    event.preventDefault();

   
    // sumbmit btn btn-primary--selfNote
    //user input--
    var trainName=$('#trainNameInput').val().trim();
    var destination=$('#destinationInput').val().trim();
    var trainTime=moment($('#timeInput').val().trim(),"HH:mm").format('HH:mm');
    var frequency=$('#frequencyInput').val().trim();

   // Creates local "temporary" object for holding employee data
  var CurrentTrainSchedule = {
    name: trainName,
    dest: destination,
    time: trainTime,
    frequenc: frequency
  };
  // Uploads employee data to the database
  database.ref().push(CurrentTrainSchedule);

  // Alert
  alert("Train information successfully added");

//empty the input boxes
$('#trainNameInput').val("");
$('#destinationInput').val("");
$('#timeInput').val("");
$('#frequencyInput').val("");

});