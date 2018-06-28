
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
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  //user input--
  var trainName=$('#trainNameInput').val().trim();
  var destination=$('#destinationInput').val().trim();
  var trainTime= moment($('#timeInput').val().trim(),"HH:mm").format('HH:mm');
  var frequency=$('#frequencyInput').val().trim();


 // Creates local "temporary" object for holding employee data
 database.ref().push ({
  Name: trainName,
  Destination: destination,
  Frequency: frequency,
  TrainTime: trainTime
});
  //empty the input boxes
$('#trainNameInput').val("");
$('#destinationInput').val("");
$('#timeInput').val("");
$('#frequencyInput').val(""); 

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  // assign firebase variables to snapshots.
  var trainName = childSnapshot.val().Name;
  var destination = childSnapshot.val().Destination;
  var frequency= childSnapshot.val().Frequency;
  var Time = childSnapshot.val().TrainTime;

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(Time, "HH:mm").subtract(10, "years");
  // Current Time
  var currentTime = moment();
  console.log(currentTime);
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemainder = diffTime % frequency ;
  var minutes = frequency - timeRemainder;
  var nextTrainArrival = moment().add(minutes, "m").format("HH:mm A"); 
  
  // Append train info to table on page
  $("#table_containter").append("<tr><td>" + trainName + "</td><td>"+ destination + "</td><td>" + 
  frequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});
var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); // Change image every 2 seconds
}








