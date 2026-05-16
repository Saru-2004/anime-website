const animeDetails =
  document.getElementById("animeDetails");


// Get anime id from URL
const params =
  new URLSearchParams(window.location.search);

const id = params.get("id");


// Fetch anime details
async function getAnimeDetails(){

  animeDetails.innerHTML = "Loading...";

  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );

  const data = await response.json();

  const anime = data.data;

  showAnime(anime);

}


function showAnime(anime){

  animeDetails.innerHTML = `

    <div class="details-container">

      <img
        src="${anime.images.jpg.large_image_url}"
      >

      <div class="details-content">

        <h1>${anime.title}</h1>

        <p>
          ${anime.synopsis}
        </p>

        <h3>⭐ Score: ${anime.score}</h3>

        <h3>🎬 Episodes: ${anime.episodes}</h3>

        <h3>
          📺 Status: ${anime.status}
        </h3>

      </div>

    </div>

  `;
}


getAnimeDetails();