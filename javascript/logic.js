   var config = {
    apiKey: "AIzaSyD6QucjqEwpmMksWHu6tKh9M8S-t-oW0-w",
    authDomain: "train-schedule-69227.firebaseapp.com",
    databaseURL: "https://train-schedule-69227.firebaseio.com",
    projectId: "train-schedule-69227",
    storageBucket: "employee-log-project.appspot.com",
    messagingSenderId: "595982056233"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

var name = "";
var destination = "";
var firstTime = "";
var frequency = 0;
var nextTime = 0;
var minutesAway = 0;



$("#submit").on("click", function(event){
  event.preventDefault();
  // adding user input into an array called row
  
    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTime= $("#firstTime").val().trim();
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  
    //using .diff to subtract start date from current date, we want the result in months, turn result to an integer
    
    frequency = parseInt($("#frequency").val().trim());

    console.log($("#frequency").val());
  
    var obj = {
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,  
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    console.log('obj', obj);

    database.ref().push(obj);
  });


database.ref().on("child_added", function(Snapshot) {
    var firstTime= Snapshot.val().firstTime;

    var firstTimeConverted = moment(firstTime, "HH:mm");

    var diffTime = moment(firstTimeConverted).diff(moment(nextTime), "minutes");

    minutesAway = diffTime;
 

    var nextTime= moment(firstTimeConverted).add(Snapshot.val().frequency, 'minutes');

    nextTimeConverted= nextTime.format('hh:mm a');



  


$("#rows").append("<tr><td>" + Snapshot.val().name + "</td><td>" + Snapshot.val().destination + "</td><td>" + Snapshot.val().frequency + "</td><td>" +  nextTimeConverted + "</td><td>" + minutesAway  +"</td></tr>");
});
