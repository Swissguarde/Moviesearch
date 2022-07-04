const search = document.getElementById("search");
const btn = document.getElementById("btn");
const main = document.querySelector(".grid");
const result = document.getElementById("result");

btn.addEventListener("click", getMovies);

function getMovies() {
  const searchTerm = search.value;
  displayMovies(searchTerm);
  search.value = "";
}

async function displayMovies(searchTerm) {
  const url = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=d45d1d24`;
  const response = await fetch(`${url}`);
  const data = await response.json();
  console.log(data);
  if (data.Response === "True") showMovies(data.Search);
  if (data.Response === "False") {
    result.innerHTML = `<p class="text-center">${data.Error}</p>`;
  }
}

function showMovies(movies) {
  let output = "";
  movies.forEach((movie) => {
    const { Title, Year, imdbID, Poster, Type } = movie;
    output += `
    <article data-id="${imdbID}" class="article">
          <img
            src="${Poster}"
            alt="Sample photo"
          />
          <div class="text">
            <h3>${Title}</h3>
            <p>
              Date released: ${Year}
            </p>
            <p>Type: ${Type}</p>
            <button class="btn btn-dark" onclick="getID()">More</button>
          </div>
        </article>  
        `;
    main.innerHTML = output;
  });
}

function getID() {
  const searchListMovies = main.querySelectorAll(".article");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", () => {
      main.innerHTML = "";
      console.log(movie.dataset.id);
      getMovie(movie.dataset.id);
    });
  });
}
function getMovie(id) {
  result.classList.add("result");
  const url = `http://www.omdbapi.com/?i=${id}&page=1&apikey=d45d1d24`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const {
        Title,
        Year,
        imdbID,
        Poster,
        Type,
        Plot,
        Actors,
        Rated,
        Released,
        Genre,
        Writer,
        Language,
        Awards,
      } = data;
      result.innerHTML = `
        <div class="row mt-3">
          <div class="col-md-4">
            <img src="${Poster}" alt="${Title}" />
          </div>
          <div class="col-md-8">
            <h3 class = "movie-title">${Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${Year}</li>
            <li class = "rated">Ratings: ${Rated}</li>
            <li class = "released">Released: ${Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${Genre}</p>
        <p class = "writer"><b>Writer:</b> ${Writer}</p>
        <p class = "actors"><b>Actors: </b>${Actors}</p>
        <p class = "plot"><b>Plot:</b> ${Plot}</p>
        <p class = "language"><b>Language:</b> ${Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${Awards}</p>
          </div>
        </div>

      `;
    });
}
