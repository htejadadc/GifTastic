var topics = ["Surfing", "Free-Diving", "Spear-Fishing", "Rugby"];
    
function displayGiphy() {

  var topic = $(this).attr("entry-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
 
  $.ajax({
      url: queryURL,
      method: "GET"
  })
  .done(function(response) {        
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var topicImage = $("<img>");
      topicImage.attr("src", results[i].images.fixed_height.url);
      gifDiv.prepend(p);
      gifDiv.prepend(topicImage);
      $("#giphy-view").prepend(gifDiv);
    }
  });
};

function buttonsDisplay() {

  $("#buttons-display").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("topic");
    a.attr("entry-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-display").append(a);
  }
};

$("#add-topic").on("click", function(event) {
  event.preventDefault();        
  var topic = $("#topics-input").val().trim();        
  topics.push(topic);       
  buttonsDisplay();
  $("#topics-input").val('');
});

$(document).on("click", ".topic", displayGiphy);

buttonsDisplay();