  $(document).ready(function(){

    // on page load table is hidden
    $("#ingredient-table").hide();

    // on page load form is hidden
    $("#textarea1").hide()

  });

// FIREBASE CONFIG===================================================================
var config = {
    apiKey: "AIzaSyD8Ov99hsKZO0NbPCd1fVBlX3EuWKLX0tI",
    authDomain: "project-one-f8be2.firebaseapp.com",
    databaseURL: "https://project-one-f8be2.firebaseio.com",
    projectId: "project-one-f8be2",
    storageBucket: "",
    messagingSenderId: "426004539514"
  };
firebase.initializeApp(config);  
var database = firebase.database();
//====================================================================================


// GLOBAL VARIABLES===================================================================  

//Array that we will push ingredients into on click Submit Button 
var ingredients_array = [];

//Stores recipe ID from first AJAX call to spoonacular API 
var recipeId=[];

var queryURL;  
//=====================================================================================


// GET STARTED BUTTON CLICK EVENT========================================================================

$("#getStarted").on("click", function(event) {
  
  event.preventDefault();



//hide getStarted button
  $("#getStarted").hide();

//show form
  $("#textarea1").show();

//show recently searched table from firebase
  $("#ingredient-table").show();

//dynamically create form display
  var form = $("<form>");
  form.addClass("col s12");
  
  var divtwo = $("<div>");
  divtwo.addClass("input-field col s12");
  divtwo.attr("id", "ingredients");
  
  var textarea = $("<textarea>");
  textarea.attr("id", "textarea1");
  textarea.addClass("materialize-textarea inputarea");
  textarea.attr("placeholder", "   ex. carrots celery onion");
  
  var label = $("<label>");
  label.addClass("active");
  label.attr("for", "textarea1");
  label.attr("id", "label");
  label.text("Enter your ingredients ");

//append form to page
  divtwo.append(label);
  divtwo.append(textarea);
  form.append(divtwo);
  $("#form-display").append(form);

//dynamically create search buttons
  var anchor = $("<a>");
  anchor.addClass("btn-large waves-effect waves-light orange");
  anchor.attr("id", "search");
  anchor.text("Search Recipes");

  var mapButton = $("<a>");
  mapButton.addClass("btn-large waves-effect waves-light blue");
  mapButton.attr("id", "mapsearch");
  mapButton.text("Find Nearest Grocery Stores");
  
//append button to page
  $("#button-display").append(anchor);
  $("#button-display").append("<br><br>");
  $("#button-display").append(mapButton);
      
  
  
//SEARCH FOR RECIPE ON CLICK==(Still inside of get started on click event)====================================
  
  $("#search").on("click", function(event){
      event.preventDefault();

  //form disappears
  $("#textarea1").empty();
  $("#card-display").empty();
  $("#ingredient-table").hide();
      
  //store value of input in variable 
  var ingredients = $("#textarea1").val().trim();

  // local object to put ingredients in
  var newIngredient = {
      name: ingredients
   };
  // send ingredients to database
  database.ref().push(newIngredient);
      
  //ingredients_array.push(ingredients);
  ingredients_array = ingredients.split(" ");
  console.log("Ingredients array = " + ingredients_array);

  //add User Input Validation Here
   var x=ingredients_array.length;
    if (x<2){
      var message = 'Please enter more than one ingredient!';
    $('#alertModal').find('.modal-content p').text(message);
    $('#alertModal').show('modal');
    }
   
  
  
  var combined_string = ingredients_array.join(',');
  //console.log(combined_string);


    queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + combined_string + "limitLicense=false&number=5&ranking=1";
      console.log(queryURL);
      
      //call function to send API request 
      sendRequest();
  
    
  // Clear form
  $("#textarea1").val("");
  
  })
//END OF SEARCH RECIPES ON CLICK EVENT============================================================================
  
//MAP SEARCH ON CLICK EVENT=================================================================================
  
  $("#mapsearch").on("click", function(event){
      event.preventDefault();
      window.open("googleAddressInput.html", target="_blank");

  })

// END OF MAP SEARCH ON CLICK EVENT==============================================================================

})

// END OF GET STARTED ON CLICK EVENT============================================================================

database.ref().on("child_added", function(childSnapshot) {
    //logs the snapshot of the new child added to firebase 
    //console.log(childSnapshot.val());

    var ingredients = childSnapshot.val().name;
    //console.log(ingredients);

    //append ingredients value into ingredient table recent searches
    $("#ingredient-table > tbody").append("<tr><td>" + ingredients + "</td></tr>");

})

  
// SPOONACULAR FUNCTION CALL=======================================================================

function sendRequest (){

//intial request to grab recipe ID 
$.ajax({
  url: queryURL, 
  method: "GET", 
  beforeSend: function(xhr){  
    xhr.setRequestHeader('X-Mashape-Key', '0NlfRZkMP2mshjWL30gtKXh3l6fYp16R7Z4jsnxYY5nUKHDcPA');
    xhr.setRequestHeader('Accept', 'application/json')
  }
})
.done(function(response) {
  //console.log(response);
  for (var i=0; i< response.length; i++){
    
    recipeId.push(response[i].id);
    console.log(recipeId);
    

    // dynamically create materialize cards that hold the recipe ID 
    var card = $("<div>");
    card.addClass("card col s12 m2 waves-effect waves-block waves-light hoverable recipecard");
    card.attr("id", response[i].id);

    var cardImage = $("<div>");
    cardImage.addClass("card-image ");
    
    var image = $("<img>");
    image.attr("src", response[i].image);
    image.addClass("images");

    var cardTitle = $("<span>");
    cardTitle.addClass("card-title");
    cardTitle.attr("id", "recipetitle");
    cardTitle.text(response[i].title);
    cardTitle.append("<br>");
    cardTitle.append("Missing: " + response[i].missedIngredientCount);
    cardTitle.append("Uses: " + response[i].usedIngredientCount);
    
    //nesting elements 
    cardImage.append(image);
    card.append(cardTitle);
    card.append(cardImage);

    //append dynamic card into card-display 
    $("#card-display").append(card);
    //for (var key in response[i]){console.log(key + '->' + response[i][key]);}
  }

})


$(document).on('click', '.card', function(){
  var itemID = $(this).attr("id");
  //console.log("user clicked on item " + itemID);

  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +itemID + "/information?includeNutrition=false"; 
  //console.log(queryURL);
  
  //request to spoonacular using recipe ID 
  $.ajax({
    url: queryURL, 
    method: "GET", 
    beforeSend: function(xhr){  
      xhr.setRequestHeader('X-Mashape-Key', '0NlfRZkMP2mshjWL30gtKXh3l6fYp16R7Z4jsnxYY5nUKHDcPA');
      xhr.setRequestHeader('Accept', 'application/json')
  }
})
  .done(function(response) {
    //console.log(response.sourceUrl);
    window.open(response.sourceUrl);
  })

});

}
//END SPOONACULAR FUNCTION CALL========================================================================