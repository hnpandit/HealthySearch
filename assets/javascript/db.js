// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Project 1 - HealthySearch Ilene, Dan, Juan & Himanshu  
// db.js - to interface with firebase databae
// January 12, 2019
    
// https://console.firebase.google.com/project/healthysearch-48e3f/database/healthysearch-48e3f/data/

// Initialize Firebase

var config = {
    apiKey: "AIzaSyAeth_P5AJXPg7eLNIkOpVsiggFWNSyE-U",
    authDomain: "healthysearch-48e3f.firebaseapp.com",
    databaseURL: "https://healthysearch-48e3f.firebaseio.com",
    projectId: "healthysearch-48e3f",
    storageBucket: "",
    messagingSenderId: "871859770952"
  };
 
firebase.initializeApp(config);

database = firebase.database();

//database.ref("/data").set("Test");  

var user = {
      userName:"",
      userFirstName:"",
      userLastName:"",
      userEmail:"",
      userCell:"",
      userZip:""
}

var favorites = {
  userName:"",
  doctorName:"",
  betterDoctorUID:""
}

function addUser(userName, FirstName, LastName, Email, Cell, Zip)
{
  user.userName = userName;
  user.userFirstName = FirstName;
  user.userLastName = LastName;
  user.userEmail = Email;
  user.userCell = Cell;
  user.userZip = Zip;

  database.ref("/users").push(user);  
}

function addFavorite(userName, Doctor, DoctorUID)
{
  favorites.userName = userName;
  favorites.doctorName = Doctor;
  favorites.betterDoctorUID = DoctorUID;

  database.ref("/favorites").push(favorites);  
}

function initialzeData()
{
    var rootRef = database.ref();
    rootRef.remove();

    addUser("hpandit", "Himanshu", "Pandit", "hp@rcb.com", "(111) 111-1111", "08816");
    addUser("icohen", "Ilene", "Cohen", "ic@rcb.com", "(222) 222-2222", "07608");
    addUser("dsires", "Dan", "Sires", "ds@rcb.com", "(333) 333-3333", "90210");
    addUser("jduran", "Juan", "Duran", "jd@rcb.com", "(444) 444-4444", "06902");

    addFavorite("hpandit", "Dr. Scott Yager", "5bd1d56611167f74712548bbb968e9d8");
    addFavorite("hpandit", "Dr. Dinesh Singal", "5bd1d566119292f74712548bbb968e9d8");
    addFavorite("icohen", "Dr. Ralph Besho", "5bd1d56611167f74712548bbb968e9d8");
    addFavorite("dsires", "Dr. John Doe", "5bd1d56611167f74712548bbb968e9d8");
    addFavorite("jduran", "Dr. Miin Mathew", "5bd1d56611167f74712548bbb968e9d8"); 

    //var newKey = firebase.database().ref().child('favorites').push().key;

    //favorites.userName = "hpandit";
    //favorites.doctorName = "New Doctor";
    //favorites.DoctorUID = "SomeUID";
    //var updates = {};
    //updates['/favorites/' + newKey + '/'] = favorites;
    //database.ref().update(updates);

    $("#dataContainer").empty();
    displayUsers();
    displayFavorites();
}

function displayUsers()
{

    var ref = firebase.database().ref("/users");
    ref.on("value", function(snapshot) {
      
      var users = [];
      users = snapshotToArray(snapshot);
      $("#dataContainer").append("Displaying Users" + "<br>");
      for (i=0; i<users.length; i++)
      {
        $("#dataContainer").append(users[i].userFirstName);
        $("#dataContainer").append("<br>");
      }
      }, function (error) {
        console.log("Error: " + error.code);
    });
}

function displayFavorites()
{
    var ref = firebase.database().ref("/favorites");

    ref.on("value", function(snapshot) {
      
      var favorites = [];
      favorites = snapshotToArray(snapshot);
      $("#dataContainer").append("Displaying User Favorites" + "<br>");
      for (i=0; i<favorites.length; i++)
      {
        $("#dataContainer").append(favorites[i].userName + "(" + favorites[i].doctorName + ")");
        $("#dataContainer").append("<br>");
      }
      }, function (error) {
        console.log("Error: " + error.code);
    });
}

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });

  return returnArr;
};

$("#initializeDatabase").on("click", function(event)
{
  $("#dataContainer").empty();
  displayUsers();
  displayFavorites();
})

$("#populateDatabase").on("click", function(event)
{
  initialzeData();
})