document.addEventListener("DOMContentLoaded", loadMovies);

function showAddMovieForm() {
    document.getElementById("add-movie-form").classList.remove("hidden");
}

function hideAddMovieForm() {
    document.getElementById("add-movie-form").classList.add("hidden");
}

function addMovie() {
    let title = document.getElementById("movie-title").value.trim();
    let genre = document.getElementById("movie-genre").value.trim();
    let year = document.getElementById("movie-year").value.trim();

    if (!title || !genre || !year) {
        alert("Please fill all fields!");
        return;
    }

    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push({ title, genre, year });

    localStorage.setItem("movies", JSON.stringify(movies));
    loadMovies();  // Refresh the list
    hideAddMovieForm();  // Hide form after adding
}

function loadMovies() {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    let moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = "";  // Clear previous list

    movies.forEach((movie, index) => {
        let row = `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>${movie.year}</td>
                <td>
                    <button onclick="deleteMovie(${index})">🗑️ Delete</button>
                </td>
            </tr>
        `;
        moviesList.innerHTML += row;
    });
}

function deleteMovie(index) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    loadMovies();  // Refresh the list
}
