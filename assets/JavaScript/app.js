// Document Ready Function that will start on page load up

$(document).ready(function(){

    // Array of tv shows to initially be loaded on to the page

    var shows = ["Game of Thrones", "Big Mouth", "South Park", "New Girl", "Bob's Burgers"]
    GifDisplay = ""
    console.log(shows)
    console.log(GifDisplay);


    // Loading the buttons from the existing array

    function loadButtons(){
        // deletes existing tv show buttons before adding new tv show buttons

        $('#showButtons').empty();

        //loops through var shows array

        for (var i=0; i < shows.length; i++){
            // creates buttons for the shows that are in the array
            var arrButton = $("<button>");

            // adding a class to arr button
            arrButton.addClass('tvShows');

            // add a data attribute with the value of shows at index[i]
            arrButton.attr('data-info', shows[i]);

            // creates the text from the data info of the array
            arrButton.text(shows[i]);

            // adding the button to the html div showButtons
            $("#showButtons").append(arrButton);
        
        
        } // focus solely on the user input for the button
        // u = ("#user-input").focus();
    }
    loadButtons();

    // Click Button Listeners for the submit button and the preloaded buttons

    $("#addtvShow").on("click", function(){

        // to make sure the form isn't trying to submit itself

        event.preventDefault();

        // This line will grab the text the user inputs from the submit box
        var show = $("#userInput").val().trim();

        // This line will push the user input into the shows array
        shows.push(show);
        // debugging to ensure that the new show input is going into the shows array
        console.log(shows);


        // calls our loadButtons function which loads up the initial array

        loadButtons();
    });

    // Display the GIFS!!!!!!!!!!!!

    $(document).on("click", "button", function(){
        // doesn't allow duplicates to go into the array
        $("#Gif-Display").empty();

        var p = $(this).attr('data-info');
        console.log('data-info');
        
        // this is the key word that refers to the button that was clicked

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        p + "&api_key=dc6zaTOxFJmzC&limit=15";

        // debugging that the api key is being registered
        console.log(queryURL);

        // standard ajax call to get request

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        // data comes back from the API
        .done(function(response){
            
            // debugging for response
            console.log(response);

            // create a results variable to store in an array
            var results = response.data;

            // loop through every result item inside of it 

            for (var i = 0; i < results.length; i++){
                var gifDiv = $("<div class = 'item'>");

                // stores results.item.rating
                var rating = results[i].rating;

                // creates an html element to be displayed
                var t = $('<p>').text("Rating: " + rating);

                // creates an image element for html to be displayed

                var gifImage = $('<img>');

                // provide the image tag a source attribute of a property pulled of the result item array

                gifImage.attr('src', results[i].images.fixed_height_still.url)
                .attr('data-still', results[i].images.fixed_height_still.url)
                .attr('data-animate', results[i].images.fixed_height.url)
                .attr('data-state', "still")
                .addClass("showImage");

                // displays the rating and image

                gifDiv.append(t).append(gifImage);

                $('#Gif-Display').prepend(gifDiv);
            }
        });
    });

    // Keeps the Gifs Still or Animates them 

    $(document).on("click", ".showImage", function(){
        var state = $(this).data('state');

        // if and else statement for if the user clicks the image to animate and clicks it again to stop the animation

        if (state === "still"){
            console.log("still works you genius!");

            // animate the image
            $(this).attr('src', $(this).data('animate')).data('state', 'animate');
        } else {
            // set image still

            $(this).attr('src', $(this).data('still')).data('state', 'still');
        }
    })
});