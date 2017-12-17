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

// Executable code--------------------------------------------------------------------------------------
var form = $("#");

var formDisplay = $("<div>");
      formDisplay.addClass("input-field col s12");
      var form = $("<textarea>")
      form.addClass("materialize-textarea")
      formDisplay.attr("id", "formDisplay" );
      $("#formdisplay").append(formDisplay);

 // 
 //          <textarea id="textarea1" class="materialize-textarea"></textarea>
 //          <label for="textarea1">Textarea</label>
 //        </div>




$ ("")
// =================================================
// Click events--------------------------------------------------------------------------------------------


// on.("click") function associated with the Search Button
$("#search").on("click", function(event) {
  
  event.preventDefault();

  var form = $("#formdisplay");
  console.log(form);

  
  // Empties the region associated with the recipes
  $("#recipedisplay").empty();

  // Grabbing text the user typed into the search input
  searchTerm = $("#search-term").val().trim();
  var searchURL = queryURLBase + searchTerm;

  
  runQuery(numResults, searchURL);
});

// This button clears the top recipes section
$("#clear-all").on("click", function() {
  
  $("#recipedisplay").empty();
});
