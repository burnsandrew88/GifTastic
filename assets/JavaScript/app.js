// Document Ready Function that will start on page load up

$(document).ready(function(){

    // Array of tv shows to initially be loaded on to the page

    var shows = ["Game of Thrones", "Big Mouth", "South Park", "New Girl", "Bob's Burgers"]
    GifDisplay = ""


    // Loading the new buttons

    function loadButtons(){
        // deletes existing tv show buttons before adding new tv show buttons

        $('#showButtons').empty();

        //loops through the array of var shows

        for (var i=0; i < shows.length; i++){
            var s = $("<button>");

            // adding 
        }
    }
}