// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all of movies in memory for sorting / repainting
let moviesList = [];

$(function() {
  // when you click the delete button, remove the closest parent tr

  $("#new-movie-form").on("submit", function(evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();
// obtianing values for rating and titles 
    let movieData = { title, rating, currentId };
    //creating data to later opend
    const HTMLtoAppend = createMovieDataHTML(movieData);
    //appending to the html by passing in the data to the function CreateMovie DataHTML

    currentId++
    //moving the id up one to later delete by id 
    moviesList.push(movieData);
// pushing the movie data to movie list 
    $("#movie-table-body").append(HTMLtoAppend);
    //appending the html to append data to the movie table body 
    $("#new-movie-form").trigger("reset");

  });

  // when the delete button is clicked, remove the closest parent tr and remove from the array of movies

  $("tbody").on("click", ".btn.btn-danger", function(evt) {
    // find the index where this movie is
    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))
    
    // remove it from the array of movies
    moviesList.splice(indexToRemoveAt, 1)

    // remove it from the DOM
    $(evt.target)
      .closest("tr")
      .remove();
    
  });

  // when an arrow is clicked, 
  $(".fas").on("click", function(evt) {
  

    // loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }
  });
});


/* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */

function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
  // this data creturns a string of html but we have taken the data which was passed in and then created a tr and td and button to go along with it... 
}

//note you spent a few hours on this and then had to look at the solution code provided and broke it down to the basics