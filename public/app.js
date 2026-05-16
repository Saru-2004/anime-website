let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];
const animeContainer = document.getElementById("animeContainer");

const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("searchInput");

// Load top anime on start
getTopAnime();


// ======================
// TOP ANIME
// ======================

async function getTopAnime(){

  animeContainer.innerHTML = "Loading...";

  const response = await fetch(
    "https://api.jikan.moe/v4/top/anime"
  );

  const data = await response.json();

  showAnime(data.data);

}


// ======================
// SEARCH ANIME
// ======================

async function searchAnime(){

  const query = searchInput.value;

  if(query === ""){
    return;
  }

  animeContainer.innerHTML = "Searching...";

  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${query}`
  );

  const data = await response.json();

  showAnime(data.data);

}
async function getRandomRecommendation(){

  animeContainer.innerHTML = "Finding anime for you...";

  const genre = genreSelect.value;
  const type = typeSelect.value;

  let url =
    `https://api.jikan.moe/v4/anime?`;

  if(genre){
    url += `genres=${genre}&`;
  }

  if(type){
    url += `type=${type}&`;
  }

  const response = await fetch(url);

  const data = await response.json();

  const animeList = data.data;

  if(!animeList || animeList.length === 0){

    animeContainer.innerHTML =
      "No anime found";

    return;
  }

  const randomAnime = animeList[
    Math.floor(Math.random() * animeList.length)
  ];

  showAnime([randomAnime]);
}

// ======================
// SHOW ANIME
// ======================

function showAnime(animeList){

  animeContainer.innerHTML = "";

  animeList.forEach(anime => {

    const card = document.createElement("div");

    card.classList.add("card");
card.innerHTML = `
  <a href="anime.html?id=${anime.mal_id}">
    <img src="${anime.images.jpg.image_url}">
  </a>

  <div class="card-content">

    <h2>${anime.title}</h2>

    <p>
      ${anime.synopsis
        ? anime.synopsis.substring(0,120)
        : "No synopsis"}
    </p>

    <button
      class="favBtn"
      onclick="addFavorite(${anime.mal_id})">

      ❤️ Add to Favorites

    </button>

    <button
      class="trailerBtn"
      onclick="watchTrailer('${anime.trailer?.embed_url || ""}')">

      🎥 Watch Trailer

    </button>

  </div>
`;

    animeContainer.appendChild(card);

  });

}


// ======================
// BUTTON EVENT
// ======================

searchBtn.addEventListener(
  "click",
  searchAnime
);
async function addFavorite(id){

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );

  const data = await res.json();

  const anime = data.data;

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  let exists =
    favorites.find(a => a.mal_id === anime.mal_id);

  if(!exists){

    favorites.push(anime);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    alert("Added to favorites ❤️");

  } else {

    alert("Already in favorites");

  }
}
async function addFavorite(id){

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );

  const data = await res.json();

  const anime = data.data;

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  let exists =
    favorites.find(a => a.mal_id === anime.mal_id);

  if(!exists){

    favorites.push(anime);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    alert("Added to favorites ❤️");

  } else {

    alert("Already in favorites");

  }
}
const recommendBtn =
  document.getElementById("recommendBtn");

const genreSelect =
  document.getElementById("genreSelect");

const typeSelect =
  document.getElementById("typeSelect");
  recommendBtn.addEventListener(
  "click",
  getRandomRecommendation
);
recommendBtn.addEventListener(
  "click",
  getRandomRecommendation
);
const trailerModal =
  document.getElementById("trailerModal");

const trailerFrame =
  document.getElementById("trailerFrame");

const closeModal =
  document.getElementById("closeModal");


// OPEN TRAILER
function watchTrailer(url){

  if(!url){

    alert("No trailer available");

    return;
  }

  trailerModal.style.display = "flex";

  trailerFrame.src = url;
}


// CLOSE MODAL
closeModal.addEventListener(
  "click",
  () => {

    trailerModal.style.display = "none";

    trailerFrame.src = "";
  }
);
const themeToggle =
  document.getElementById("themeToggle");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
  themeToggle.textContent = "🌙 Dark Mode";
}

// Toggle theme
themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀ Light Mode";
  }

});