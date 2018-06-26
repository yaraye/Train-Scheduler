
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

var trainName="";
var destination="";
var trainTime=0;
var frequency=0;

// 2. Button for adding Employees
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  //user input--
  trainName=$('#trainNameInput').val().trim();
  destination=$('#destinationInput').val().trim();
  trainTime= moment($('#timeInput').val().trim(),"HH:mm").format('HH:mm');
  frequency=$('#frequencyInput').val().trim();

 // Creates local "temporary" object for holding employee data
 database.ref().push ({
  TrainName: trainName,
  Destination: destination,
  TrainTime: trainTime,
  Frequency: frequency
});

//   //empty the input boxes
// $('#trainNameInput').val("");
// $('#destinationInput').val("");
// $('#timeInput').val("");
// $('#frequencyInput').val(""); 

});



database.ref().on("child_added", function(snapshot)
{
console.log(snapshot.val().TrainName);
 // var tablerow =  $("<tr>");
  //   var tablecell1 = $("<td '#nameDisplay'>" + snapshot.val(sv.trainName) + "</td>");
  //    var tablecell2 = $("<td>" + snapshot.val(sv.role) + "</td>");
  //    var tablecell3 = $("<td>" + snapshot.val(sv.startDate) + "</td>");
  //    var tablecell4 = $("<td>" + snapshot.val(sv.monthlyRate) + "</td>");
   //  tablerow.append(tablecell1);


      var newRow = $("<tr>").append(
         $("<td>").text(snapshot.val().TrainName),
          $("<td>").text(snapshot.val().Destination),
         $("<td>").text(snapshot.val().TrainTime),
        $("<td>").text(snapshot.val().Frequency)
     
      );
   
    $("#table_containter").append(newRow);
});
