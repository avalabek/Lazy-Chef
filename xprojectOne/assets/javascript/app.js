// Initialize Firebase

//TO DO make sure link to firebase is in html 
  var config = {
    apiKey: "AIzaSyD8Ov99hsKZO0NbPCd1fVBlX3EuWKLX0tI",
    authDomain: "project-one-f8be2.firebaseapp.com",
    databaseURL: "https://project-one-f8be2.firebaseio.com",
    projectId: "project-one-f8be2",
    storageBucket: "",
    messagingSenderId: "426004539514"
  };
  firebase.initializeApp(config);



// Variables--------------------------------------------------------------------------------------------



// TO DO: verify API authentication key is correct

var authKey = "G0n0upk4remshBs4vzEZ8H9BLQxIp1KmJBpjsnoZl75ZcpPsSo";

// TO DO: API search query The searchTerm will be appended to this when
// the user hits the search button verify with spoonacular
var queryURLBase = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients"

// variables will hold the results we get from the user's inputs via HTML
var searchTerm = [];

// Executable code------------------------------------------------------------------------------------------

function runQuery(queryURL) {

 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // Logging the URL so we have access to it for troubleshooting
    
    console.log(queryURL);
    
    // Log the response to console
    console.log(response);
    

   
}

// Click events--------------------------------------------------------------------------------------------


// on.("click") function associated with the Search Button
$("#").on("click", function(event) {
  
  event.preventDefault();

  var form = $("#");
  console.log(form);

  
  // Empties the region associated with the recipes
  $("#").empty();

  // Grabbing text the user typed into the search input
  searchTerm = $("#").val().trim();
  var searchURL = queryURLBase + searchTerm;

  
  runQuery(searchURL);
});

// Make a button to clear the top recipes section
$("#").on("click", function() {
  
  $("#").empty();//same html section as line 65
});